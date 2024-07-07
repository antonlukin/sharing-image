<?php
/**
 * Display widgets and sidebars on post and term editors screens.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

use WP_Error;
use Exception;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Widget class.
 *
 * @class Widget
 */
class Widget {
	/**
	 * Post meta key to store poster image.
	 *
	 * @var string
	 */
	const META_SOURCE = '_sharing_image';

	/**
	 * Post meta key to store poster image fielset.
	 *
	 * @var string
	 */
	const META_FIELDSET = '_sharing_image_fieldset';

	/**
	 * Common nonce for settings tabs.
	 *
	 * @var string
	 */
	const WIDGET_NONCE = 'sharing-image-widget';

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'init_post_widget' ) );
		add_action( 'init', array( __CLASS__, 'init_post_sidebar' ) );
		add_action( 'init', array( __CLASS__, 'init_taxonomy_widget' ) );

		// Generate poster handlers.
		add_action( 'wp_ajax_sharing_image_generate', array( __CLASS__, 'handle_ajax_generator' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'add_generate_endpoint' ) );

		// Try to autogenerate poster if it is needed.
		add_action( 'wp_after_insert_post', array( __CLASS__, 'autogenerate_poster' ), 20, 2 );
	}

	/**
	 * Init post sidebar for gutenberg enabled dashboard.
	 */
	public static function init_post_sidebar() {
		if ( Config::is_hidden_post_widget() ) {
			return;
		}

		$schema = array(
			'type'       => 'object',
			'properties' => array(
				'poster'   => array(
					'type' => 'string',
				),
				'width'    => array(
					'type' => 'integer',
				),
				'height'   => array(
					'type' => 'integer',
				),
				'template' => array(
					'type' => 'string',
				),
				'mode'     => array(
					'type' => 'string',
				),
			),
		);

		register_meta(
			'post',
			self::META_SOURCE,
			array(
				'type'              => 'object',
				'show_in_rest'      => array(
					'schema' => $schema,
				),
				'single'            => true,
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => array( __CLASS__, 'sanitize_source' ),
			)
		);

		register_meta(
			'post',
			self::META_FIELDSET,
			array(
				'type'              => 'object',
				'show_in_rest'      => array(
					'schema' => array(
						'type'                 => 'object',
						'properties'           => array(),
						'additionalProperties' => array(
							'type' => array( 'string', 'integer' ),
						),
					),
				),
				'single'            => true,
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => array( __CLASS__, 'sanitize_fieldset' ),
			)
		);

		// Add required assets and objects.
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'enqueue_sidebar_assets' ) );
	}

	/**
	 * Init widget on post editing page.
	 */
	public static function init_post_widget() {
		if ( Config::is_hidden_post_widget() ) {
			return;
		}

		add_action( 'add_meta_boxes', array( __CLASS__, 'add_metabox' ) );

		// Handle actions on post save.
		add_action( 'save_post', array( __CLASS__, 'save_post_widget' ), 10 );

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_metabox_assets' ) );
	}

	/**
	 * Init widget on taxonomy term editing page.
	 */
	public static function init_taxonomy_widget() {
		// Skip if the Premium is not active.
		if ( ! Premium::is_premium_features() ) {
			return;
		}

		$taxonomies = self::get_widget_taxonomies();

		foreach ( $taxonomies as $taxonomy ) {
			// Display taxonomy term widget.
			add_action( $taxonomy . '_edit_form', array( __CLASS__, 'display_widget' ), 10, 2 );

			// Save taxonomy term meta.
			add_action( 'edited_' . $taxonomy, array( __CLASS__, 'save_taxonomy_widget' ) );

			// Enqueue term assets.
			add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_taxonomy_assets' ) );
		}
	}

	/**
	 * Add metabox to post editing page.
	 */
	public static function add_metabox() {
		add_meta_box(
			'sharing-image-metabox',
			esc_html__( 'Sharing Image', 'sharing-image' ),
			array( __CLASS__, 'display_widget' ),
			self::get_metabox_post_types(),
			'side',
			'high',
			array(
				'__back_compat_meta_box' => true,
			)
		);
	}

	/**
	 * Add metabox scripts and styles to admin page.
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public static function enqueue_metabox_assets( $hook_suffix ) {
		if ( ! in_array( $hook_suffix, array( 'post.php', 'post-new.php' ), true ) ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->post_type, self::get_metabox_post_types(), true ) ) {
			return;
		}

		$post = get_post();

		if ( use_block_editor_for_post( $post ) ) {
			return;
		}

		// Get post meta for current post ID.
		$data = self::create_script_object( 'post', $post->ID );

		$data['meta'] = array(
			'source'   => get_post_meta( $post->ID, self::META_SOURCE, true ),
			'fieldset' => get_post_meta( $post->ID, self::META_FIELDSET, true ),
		);

		/**
		 * Filter widget script object.
		 *
		 * @param array $object Array of widget script object.
		 */
		self::enqueue_widget_scripts( $data );
	}

	/**
	 * Add widget scripts and styles to admin page.
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public static function enqueue_taxonomy_assets( $hook_suffix ) {
		if ( 'term.php' !== $hook_suffix ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->taxonomy, self::get_widget_taxonomies(), true ) ) {
			return;
		}

		// phpcs:disable WordPress.Security.NonceVerification
		if ( ! isset( $_REQUEST['tag_ID'] ) ) {
			return;
		}

		$term_id = absint( $_REQUEST['tag_ID'] );
		// phpcs:enable WordPress.Security.NonceVerification

		$data = self::create_script_object( 'term', $term_id );

		$data['meta'] = array(
			'source'   => get_term_meta( $term_id, self::META_SOURCE, true ),
			'fieldset' => get_term_meta( $term_id, self::META_FIELDSET, true ),
		);

		/**
		 * Filter widget script object.
		 *
		 * @param array $object Array of widget script object.
		 */
		self::enqueue_widget_scripts( $data );
	}

	/**
	 * Add Gutenberg block scripts and sryles.
	 *
	 * @since 3.0
	 */
	public static function enqueue_sidebar_assets() {
		if ( ! is_admin() ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->post_type, self::get_metabox_post_types(), true ) ) {
			return;
		}

		$asset = require SHARING_IMAGE_DIR . 'assets/sidebar/index.asset.php';

		wp_enqueue_script(
			'sharing-image-sidebar',
			plugins_url( 'assets/sidebar/index.js', SHARING_IMAGE_FILE ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_style(
			'sharing-image-sidebar',
			plugins_url( 'assets/sidebar/index.css', SHARING_IMAGE_FILE ),
			null,
			$asset['version'],
			'all'
		);

		// Translations availible only for WP 5.0+.
		wp_set_script_translations( 'sharing-image-sidebar', 'sharing-image' );

		$data = array(
			'meta'         => array(
				'source'   => self::META_SOURCE,
				'fieldset' => self::META_FIELDSET,
			),
			'autogenerate' => Config::get_autogenerate_index(),
			'templates'    => Templates::get_templates(),
		);

		// Add widget script object.
		wp_localize_script( 'sharing-image-sidebar', 'sharingImageSidebar', $data );
	}

	/**
	 * Save metabox data.
	 *
	 * @param int $post_id Post ID.
	 */
	public static function save_post_widget( $post_id ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( ! isset( $_POST['sharing_image_nonce'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		if ( ! wp_verify_nonce( $_POST['sharing_image_nonce'], self::WIDGET_NONCE ) ) {
			return;
		}

		if ( isset( $_POST[ self::META_SOURCE ] ) ) {
			// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			$meta = self::sanitize_source( wp_unslash( $_POST[ self::META_SOURCE ] ) );

			update_post_meta( $post_id, self::META_SOURCE, $meta );
		}

		if ( isset( $_POST[ self::META_FIELDSET ] ) ) {
			// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			$meta = self::sanitize_fieldset( wp_unslash( $_POST[ self::META_FIELDSET ] ) );

			update_post_meta( $post_id, self::META_FIELDSET, $meta );
		}
	}

	/**
	 * Save taxonomy fields.
	 *
	 * @param int $term_id Term ID.
	 */
	public static function save_taxonomy_widget( $term_id ) {
		if ( ! current_user_can( 'edit_term', $term_id ) ) {
			return;
		}

		if ( ! isset( $_POST['sharing_image_nonce'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		if ( ! wp_verify_nonce( $_POST['sharing_image_nonce'], self::WIDGET_NONCE ) ) {
			return;
		}

		if ( isset( $_POST[ self::META_SOURCE ] ) ) {
			// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			$meta = self::sanitize_source( wp_unslash( $_POST[ self::META_SOURCE ] ) );

			update_term_meta( $term_id, self::META_SOURCE, $meta );
		}

		if ( isset( $_POST[ self::META_FIELDSET ] ) ) {
			// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			$meta = self::sanitize_fieldset( wp_unslash( $_POST[ self::META_FIELDSET ] ) );

			update_term_meta( $term_id, self::META_FIELDSET, $meta );
		}
	}

	/**
	 * Display widget.
	 */
	public static function display_widget() {
		include_once SHARING_IMAGE_DIR . 'templates/widget.php';

		/**
		 * Fires on widget template including.
		 */
		do_action( 'sharing_image_widget' );
	}

	/**
	 * Create new endpoint for generate button in Gutenberg sidebar.
	 */
	public static function add_generate_endpoint() {
		register_rest_route(
			'sharing-image/v1',
			'/poster/(?P<id>\d+)',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'handle_rest_generator' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Sanitize widget source meta.
	 *
	 * @param array $source Source meta data.
	 *
	 * @return array Sanitized source meta fields.
	 */
	public static function sanitize_source( $source ) {
		$sanitized = array();

		if ( isset( $source['poster'] ) ) {
			$sanitized['poster'] = sanitize_text_field( $source['poster'] );
		}

		if ( ! empty( $source['width'] ) ) {
			$sanitized['width'] = absint( $source['width'] );
		}

		if ( ! empty( $source['height'] ) ) {
			$sanitized['height'] = absint( $source['height'] );
		}

		if ( ! empty( $source['template'] ) ) {
			$sanitized['template'] = sanitize_key( $source['template'] );
		}

		if ( ! empty( $source['mode'] ) ) {
			$sanitized['mode'] = sanitize_text_field( $source['mode'] );
		}

		/**
		 * Filters fieldset meta.
		 *
		 * @since 3.0
		 *
		 * @param array $sanitized List of sanitized fields.
		 * @param array $source    List of fields before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_source', $sanitized, $source );
	}

	/**
	 * Sanitize fieldset.
	 *
	 * @param array $fieldset Fieldset list.
	 *
	 * @return array Sanitized fieldset data.
	 */
	public static function sanitize_fieldset( $fieldset ) {
		$sanitized = array();

		// Get list of templates.
		$templates = Templates::get_templates();

		foreach ( $templates as $template ) {
			if ( empty( $template['layers'] ) ) {
				continue;
			}

			foreach ( $template['layers'] as $key => $layer ) {
				if ( ! array_key_exists( $key, $fieldset ) ) {
					continue;
				}

				if ( 'text' === $layer['type'] ) {
					$sanitized[ $key ] = sanitize_textarea_field( $fieldset[ $key ] );
				}

				if ( 'image' === $layer['type'] ) {
					$sanitized[ $key ] = absint( $fieldset[ $key ] );
				}
			}
		}

		/**
		 * Filters widget fieldset meta.
		 *
		 * @since 3.0
		 *
		 * @param array $sanitized Sanitized fieldset list.
		 * @param array $fieldset  Fieldset list before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_fieldset', $sanitized, $fieldset );
	}

	/**
	 * Handle generate button in Gutenberg sidebar.
	 *
	 * @param WP_REST_Request $request Request params.
	 */
	public static function handle_rest_generator( $request ) {
		$post_id = $request->get_param( 'id' );

		if ( empty( $post_id ) ) {
			wp_send_json_error( __( 'Post data is empty.', 'sharing-image' ), 400 );
		}

		$params = $request->get_json_params();

		if ( ! isset( $params['template'] ) ) {
			wp_send_json_error( __( 'Incorrect request parameters.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( $params['template'] );

		if ( empty( $params['fieldset'] ) ) {
			$params['fieldset'] = array();
		}

		$fieldset = self::sanitize_fieldset( $params['fieldset'] );

		// Invoke poster generation.
		$result = self::generate_poster( $fieldset, $index, $post_id, 'post' );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( $result->get_error_messages(), $result->get_error_data() );
		}

		wp_send_json_success( $result );
	}

	/**
	 * Handle generate button on Classic Editor and taxonomy widget.
	 */
	public static function handle_ajax_generator() {
		$check = check_ajax_referer( self::WIDGET_NONCE, 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Please reload the page and try again.', 'sharing-image' ), 403 );
		}

		if ( empty( $_POST[ self::META_SOURCE ]['template'] ) ) {
			wp_send_json_error( __( 'Template ID cannot be empty.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( $_POST[ self::META_SOURCE ]['template'] );

		$screen_id = 0;

		if ( ! empty( $_POST['sharing_image_screen'] ) ) {
			$screen_id = absint( wp_unslash( $_POST['sharing_image_screen'] ) );
		}

		$context = 'post';

		if ( ! empty( $_POST['sharing_image_context'] ) ) {
			$context = sanitize_key( wp_unslash( $_POST['sharing_image_context'] ) );
		}

		$fieldset = array();

		if ( ! empty( $_POST[ self::META_FIELDSET ] ) ) {
			// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
			$fieldset = self::sanitize_fieldset( wp_unslash( $_POST[ self::META_FIELDSET ] ) );
		}

		// Invoke poster generation.
		$result = self::generate_poster( $fieldset, $index, $screen_id, $context );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( $result->get_error_messages(), $result->get_error_data() );
		}

		wp_send_json_success( $result );
	}

	/**
	 * Try to autogenerate poster on post insert or update.
	 *
	 * @param int    $post_id Updated post_id.
	 * @param object $post Updated post object.
	 */
	public static function autogenerate_poster( $post_id, $post ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( 'trash' === $post->post_status || 'auto-draft' === $post->post_status ) {
			return;
		}

		if ( ! in_array( $post->post_type, self::get_metabox_post_types(), true ) ) {
			return;
		}

		$meta = get_post_meta( $post_id, self::META_SOURCE, true );

		if ( ! empty( $meta['mode'] ) && 'manual' === $meta['mode'] ) {
			return;
		}

		$index = Config::get_autogenerate_index();

		if ( ! Templates::has_template( $index ) ) {
			return;
		}

		// Compose fieldset by template index.
		$fieldset = self::compose_fields( $index, $post_id );

		/**
		 * Filters fieldset before autogeneration.
		 *
		 * @since 3.0
		 *
		 * @param array  $fieldset Prepared fieldset data.
		 * @param string $index    Template index.
		 * @param int    $post_id  Post ID.
		 */
		$fieldset = apply_filters( 'sharing_image_autogenerated_fieldset', $fieldset, $index, $post_id );

		if ( empty( $fieldset ) ) {
			$fieldset = array();
		}

		// Invoke poster generation.
		$result = self::generate_poster( $fieldset, $index, $post_id, 'post', true );

		if ( is_wp_error( $result ) ) {
			return;
		}

		$result['template'] = $index;

		/**
		 * Filters autogenerated poster data.
		 *
		 * @since 2.0.11
		 *
		 * @param array|WP_Erorr $result  Poster image, width and height data or WP_Error if undefined.
		 * @param int            $post_id Post ID.
		 */
		$result = apply_filters( 'sharing_image_autogenerated_poster', $result, $post_id );

		update_post_meta( $post_id, self::META_SOURCE, $result );
		update_post_meta( $post_id, self::META_FIELDSET, $fieldset );
	}

	/**
	 * Generate poster by AJAX request.
	 * Used in widget and sidebar.
	 *
	 * @param array   $fieldset  Fieldset data from widget.
	 * @param int     $index     Template index from editor.
	 * @param int     $screen_id Post or term ID from admin screen.
	 * @param string  $context   Screen ID context field. Can be settings, post or term.
	 * @param boolean $auto      Whether auto-generated poster.
	 */
	private static function generate_poster( $fieldset, $index, $screen_id, $context, $auto = false ) {
		$templates = Templates::get_templates();

		if ( ! isset( $templates[ $index ] ) ) {
			return new WP_Error( 'generate', esc_html__( 'Incorrect template ID.', 'sharing-image' ), 400 );
		}

		// Prepare template editor.
		$editor = Generator::prepare_template( $templates[ $index ], $fieldset, $index, $screen_id, $context );

		if ( ! Generator::check_required( $editor ) ) {
			return new WP_Error( 'generate', esc_html__( 'Incorrect template settings.', 'sharing-image' ), 400 );
		}

		list( $path, $url ) = Generator::get_upload_file();

		// Generate image and save it to given path.
		$poster = Generator::create_poster( $editor, $path );

		if ( is_wp_error( $poster ) ) {
			return new WP_Error( 'generate', $poster->get_error_message(), 400 );
		}

		$attachment = self::save_attachment( $path, $screen_id, $context );

		if ( is_wp_error( $attachment ) ) {
			return new WP_Error( 'attachment', $attachment->get_error_message(), 400 );
		}

		$source = array(
			'poster' => $url,
			'width'  => $editor['width'],
			'height' => $editor['height'],
			'mode'   => 'manual',
		);

		if ( ! empty( $auto ) ) {
			$source['mode'] = 'auto';
		}

		return $source;
	}

	/**
	 * Create script object to inject with widget.
	 *
	 * @param string $context   Widget context. For example: metabox or taxonomy.
	 * @param int    $screen_id Post or taxonomy screen ID.
	 *
	 * @return array Filtered widget script object.
	 */
	private static function create_script_object( $context, $screen_id ) {
		$object = array(
			'nonce'        => wp_create_nonce( self::WIDGET_NONCE ),
			'context'      => $context,
			'screen'       => $screen_id,

			'name'         => array(
				'source'   => self::META_SOURCE,
				'fieldset' => self::META_FIELDSET,
			),
			'links'        => array(
				'uploads' => esc_url( admin_url( 'upload.php' ) ),
			),
			'templates'    => Templates::get_templates(),
			'autogenerate' => Config::get_autogenerate_index(),
		);

		/**
		 * Filter widget script object.
		 *
		 * @param array $object Array of widget script object.
		 */
		return apply_filters( 'sharing_image_widget_object', $object );
	}

	/**
	 * Enqueue widget scripts.
	 *
	 * @param array $data Widget data object.
	 */
	private static function enqueue_widget_scripts( $data ) {
		$asset = require SHARING_IMAGE_DIR . 'assets/widget/index.asset.php';

		wp_enqueue_media();

		wp_enqueue_script(
			'sharing-image-widget',
			plugins_url( 'assets/widget/index.js', SHARING_IMAGE_FILE ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_style(
			'sharing-image-widget',
			plugins_url( 'assets/widget/index.css', SHARING_IMAGE_FILE ),
			$asset['dependencies'],
			$asset['version'],
			'all'
		);

		// Translations availible only for WP 5.0+.
		wp_set_script_translations( 'sharing-image-widget', 'sharing-image' );

		// Add widget script object.
		wp_localize_script( 'sharing-image-widget', 'sharingImageWidget', $data );
	}

	/**
	 * Get an array of post types where the metabox is displayed.
	 *
	 * @return array Array of post types.
	 */
	private static function get_metabox_post_types() {
		$post_types = get_post_types(
			array(
				'public' => true,
			)
		);

		unset( $post_types['attachment'] );

		/**
		 * Filter widget post types.
		 *
		 * @param array $post_types Array of post types for which the metabox is displayed.
		 */
		return apply_filters( 'sharing_image_metabox_post_types', array_values( $post_types ) );
	}

	/**
	 * Update template with post data for preset fields.
	 *
	 * @param string $index    Template index.
	 * @param int    $post_id  Post id.
	 * @param array  $fieldset Optional. Prepared fieldset to modify.
	 *
	 * @return array List of prepared fields.
	 */
	private static function compose_fields( $index, $post_id, $fieldset = array() ) {
		$templates = Templates::get_templates();

		if ( ! isset( $templates[ $index ] ) ) {
			return $fieldset;
		}

		$template = $templates[ $index ];

		if ( ! isset( $template['layers'] ) ) {
			return $fieldset;
		}

		$layers = $template['layers'];

		foreach ( $layers as $key => $layer ) {
			$field = null;

			if ( empty( $layer['type'] ) ) {
				continue;
			}

			if ( 'text' === $layer['type'] ) {
				$field = self::compose_text_presets( $layer, $post_id );
			}

			if ( 'image' === $layer['type'] ) {
				$field = self::compose_image_presets( $layer, $post_id );
			}

			if ( ! empty( $field ) ) {
				$fieldset[ $key ] = $field;
			}
		}

		return $fieldset;
	}

	/**
	 * Compose preset fields for text layers.
	 *
	 * @param string $layer    List of layer options.
	 * @param int    $post_id  Post id.
	 *
	 * @return array|null List of prepared fieldset for text layer.
	 */
	private static function compose_text_presets( $layer, $post_id ) {
		if ( empty( $layer['preset'] ) || empty( $layer['dynamic'] ) ) {
			return null;
		}

		$separator = ', ';

		if ( ! empty( $layer['separator'] ) ) {
			$separator = $layer['separator'];
		}

		if ( 'title' === $layer['preset'] ) {
			return get_the_title( $post_id );
		}

		if ( 'excerpt' === $layer['preset'] ) {
			$post = get_post( $post_id );

			return $post->post_excerpt;
		}

		if ( 'categories' === $layer['preset'] ) {
			$categories = get_the_category( $post_id );

			if ( $categories ) {
				return implode( $separator, wp_list_pluck( $categories, 'name' ) );
			}
		}

		if ( 'tags' === $layer['preset'] ) {
			$tags = get_the_tags( $post_id );

			if ( $tags ) {
				return implode( $separator, wp_list_pluck( $tags, 'name' ) );
			}
		}

		return null;
	}

	/**
	 * Compose preset fields for image layers.
	 *
	 * @param string $layer    List of layer options.
	 * @param int    $post_id  Post id.
	 *
	 * @return array|null List of prepared fieldset for image layer.
	 */
	private static function compose_image_presets( $layer, $post_id ) {
		if ( empty( $layer['preset'] ) || empty( $layer['dynamic'] ) ) {
			return null;
		}

		if ( 'featured' === $layer['preset'] ) {
			return absint( get_post_thumbnail_id( $post_id ) );
		}

		return null;
	}

	/**
	 * Get an array of taxonomeis where the widget is displayed.
	 *
	 * @return array Array of taxonomies.
	 */
	private static function get_widget_taxonomies() {
		$taxonomies = get_taxonomies(
			array(
				'public'  => true,
				'show_ui' => true,
			)
		);

		/**
		 * Filter the taxonomies where we need to show the poster settings.
		 *
		 * @param array $taxonomies List of taxonomies to show settings.
		 */
		return apply_filters( 'sharing_image_widget_taxonomies', array_values( $taxonomies ) );
	}

	/**
	 * Save attachment to media library.
	 *
	 * @param string $path      Path to poster image.
	 * @param int    $screen_id Post or taxonomy screen ID.
	 * @param string $context   Widget context. For example: metabox or autogenerate.
	 *
	 * @return int|null Attachment ID or null;
	 */
	private static function save_attachment( $path, $screen_id, $context ) {
		$config = Config::get_config();

		if ( ! isset( $config['attachment'] ) ) {
			return null;
		}

		$id = null;

		try {
			$name = implode( '-', array( 'sharing-image', $context, $screen_id ) );

			// Try to delete current attachment if exists.
			self::delete_attachment( $name );

			$uploads = wp_upload_dir();

			// Get poster filetype.
			$filetype = wp_check_filetype( basename( $path ), null );

			$attachment = array(
				'post'      => array(
					'guid'           => $uploads['url'] . '/' . basename( $path ),
					'post_mime_type' => $filetype['type'],
					'post_name'      => $name,
					'post_title'     => $name,
					'post_content'   => '',
					'post_status'    => 'inherit',
				),
				'parent_id' => 0,
			);

			if ( 'post' === $context ) {
				$attachment['parent_id'] = $screen_id;
			}

			/**
			 * Filter attachment data before insertion.
			 *
			 * @param string $attachment Attachment data.
			 * @param string $path       Path to poster image.
			 * @param string $screen_id  Post or taxonomy screen ID.
			 * @param string $context    Widget context. For example: metabox or autogenerate.
			 */
			$attachment = apply_filters( 'sharing_image_attachment_data', $attachment, $path, $screen_id, $context );

			if ( empty( $attachment['post'] ) ) {
				return null;
			}

			if ( ! function_exists( 'wp_crop_image' ) ) {
				include ABSPATH . 'wp-admin/includes/image.php';
			}

			$id = wp_insert_attachment( $attachment['post'], $path, $attachment['parent_id'] );

			// Get attachment metadata.
			$metadata = wp_generate_attachment_metadata( $id, $path );

			wp_update_attachment_metadata( $id, $metadata );
		} catch ( Exception $e ) {
			return new WP_Error( 'attachment', $e->getMessage() );
		}

		return $id;
	}

	/**
	 * Delete attachment by name if exists.
	 *
	 * @param string $name Name of attachment.
	 *
	 * @return bool Whether attachment deleted
	 */
	private static function delete_attachment( $name ) {
		$posts = get_posts(
			array(
				'post_type'              => 'attachment',
				'post_name__in'          => array( $name ),
				'update_post_term_cache' => false,
				'update_post_meta_cache' => false,
				'posts_per_page'         => 1,
			)
		);

		if ( empty( $posts[0]->ID ) ) {
			return false;
		}

		return wp_delete_attachment( $posts[0]->ID, true );
	}
}
