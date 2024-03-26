<?php
/**
 * Widget class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Widget class
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
	 * The instance of Settings class.
	 *
	 * @var instance
	 */
	private $settings;

	/**
	 * Widget constructor.
	 */
	public function __construct() {
		$this->settings = new Settings();
	}

	/**
	 * Init class actions and filters.
	 */
	public function init() {
		add_action( 'init', array( $this, 'init_taxonomy_widget' ) );
		add_action( 'init', array( $this, 'init_post_widget' ) );
		add_action( 'init', array( $this, 'init_post_sidebar' ) );

		// Generate poster handlers.
		add_action( 'wp_ajax_sharing_image_generate', array( $this, 'handle_ajax_generator' ) );
		add_action( 'rest_api_init', array( $this, 'add_generate_endpoint' ) );

		// Try to autogenerate poster if it is needed.
		add_action( 'wp_insert_post', array( $this, 'autogenerate_poster' ) );
	}

	/**
	 * Init widget on post editing page.
	 */
	public function init_post_widget() {
		/**
		 * Easy way to hide metabox.
		 *
		 * @param bool $hide_metabox Set true to hide metabox.
		 */
		$hide_metabox = apply_filters( 'sharing_image_hide_metabox', false );

		if ( $hide_metabox ) {
			return;
		}

		add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );

		// Handle actions on post save.
		add_action( 'save_post', array( $this, 'save_metabox' ), 10 );

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_metabox_assets' ) );
	}

	/**
	 * Init post sidebar for gutenberg enabled dashboard.
	 */
	public function init_post_sidebar() {
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
				'sanitize_callback' => array( $this, 'sanitize_source' ),
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
				'sanitize_callback' => array( $this, 'sanitize_fieldset' ),
			)
		);

		// Add required assets and objects.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_sidebar_assets' ) );
	}

	/**
	 * Init widget on taxonomy term editing page.
	 */
	public function init_taxonomy_widget() {
		// Skip if the Premium is not active.
		if ( ! $this->settings->is_premium_features() ) {
			return;
		}

		$taxonomies = $this->get_widget_taxonomies();

		foreach ( $taxonomies as $taxonomy ) {
			// Display taxonomy term widget.
			add_action( $taxonomy . '_edit_form', array( $this, 'display_widget' ), 10, 2 );

			// Save taxonomy term meta.
			add_action( 'edited_' . $taxonomy, array( $this, 'save_taxonomy' ) );

			// Enqueue term assets.
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_taxonomy_assets' ) );
		}
	}

	/**
	 * Add metabox to post editing page.
	 */
	public function add_metabox() {
		add_meta_box(
			'sharing-image-metabox',
			esc_html__( 'Sharing Image', 'sharing-image' ),
			array( $this, 'display_widget' ),
			$this->get_metabox_post_types(),
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
	public function enqueue_metabox_assets( $hook_suffix ) {
		if ( ! in_array( $hook_suffix, array( 'post.php', 'post-new.php' ), true ) ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->post_type, $this->get_metabox_post_types(), true ) ) {
			return;
		}

		$post = get_post();

		// Get post meta for current post ID.
		$meta = get_post_meta( $post->ID, self::META_SOURCE, true );

		$this->enqueue_scripts( $this->create_script_object( $meta, 'post', $post->ID ) );
	}

	/**
	 * Add widget scripts and styles to admin page.
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_taxonomy_assets( $hook_suffix ) {
		if ( 'term.php' !== $hook_suffix ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->taxonomy, $this->get_widget_taxonomies(), true ) ) {
			return;
		}

		// phpcs:disable WordPress.Security.NonceVerification
		if ( ! isset( $_REQUEST['tag_ID'] ) ) {
			return;
		}

		$term_id = absint( $_REQUEST['tag_ID'] );
		// phpcs:enable WordPress.Security.NonceVerification

		// Get term meta for current term ID.
		$meta = get_term_meta( $term_id, self::META_SOURCE, true );

		$this->enqueue_scripts( $this->create_script_object( $meta, 'term', $term_id ) );
	}

	/**
	 * Add Gutenberg block scripts and sryles.
	 */
	public function enqueue_sidebar_assets() {
		$asset = require SHARING_IMAGE_DIR . 'assets/sidebar/index.asset.php';

		wp_enqueue_script(
			'sharing-image-sidebar',
			plugins_url( 'assets/sidebar/index.js', SHARING_IMAGE_FILE ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// Translations availible only for WP 5.0+.
		wp_set_script_translations( 'sharing-image-sidebar', 'sharing-image' );

		$data = array(
			'meta'      => array(
				'source'   => self::META_SOURCE,
				'fieldset' => self::META_FIELDSET,
			),
			'templates' => $this->settings->get_templates(),
		);

		// Add widget script object.
		wp_localize_script( 'sharing-image-sidebar', 'sharingImageSidebar', $data );
	}

	/**
	 * Save metabox data.
	 *
	 * @param int $post_id Post ID.
	 */
	public function save_metabox( $post_id ) {
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
		if ( ! wp_verify_nonce( $_POST['sharing_image_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		if ( ! isset( $_POST['sharing_image_picker'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$meta = $this->sanitize_picker( wp_unslash( $_POST['sharing_image_picker'] ) );

		/**
		 * Filters updated post meta.
		 *
		 * @param string $meta    Updated post meta.
		 * @param string $post_id Post ID.
		 */
		$meta = apply_filters( 'sharing_image_update_post_meta', $meta, $post_id );

		// Update post meta.
		update_post_meta( $post_id, self::META_SOURCE, $meta );
	}

	/**
	 * Save taxonomy fields.
	 *
	 * @param int $term_id Term ID.
	 */
	public function save_taxonomy( $term_id ) {
		if ( ! isset( $_POST['sharing_image_nonce'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		if ( ! wp_verify_nonce( $_POST['sharing_image_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_term', $term_id ) ) {
			return;
		}

		if ( ! isset( $_POST['sharing_image_picker'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$meta = $this->sanitize_picker( wp_unslash( $_POST['sharing_image_picker'] ) );

		/**
		 * Filters term meta on update.
		 *
		 * @param string $meta    Updated term meta.
		 * @param string $term_id Term ID.
		 */
		$meta = apply_filters( 'sharing_image_update_term_meta', $meta, $term_id );

		update_term_meta( $term_id, self::META_SOURCE, $meta );
	}

	/**
	 * Display widget.
	 */
	public function display_widget() {
		include_once SHARING_IMAGE_DIR . 'templates/widget.php';

		/**
		 * Fires on widget template including.
		 */
		do_action( 'sharing_image_widget' );
	}

	/**
	 * TODO:
	 */
	public function add_generate_endpoint() {
		register_rest_route(
			'sharing-image/v1',
			'/poster/(?P<id>\d+)',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_rest_generator' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * TODO:
	 */
	public function handle_rest_generator( $request ) {
		$post_id = $request->get_param( 'id' );

		if ( empty( $post_id ) ) {
			wp_send_json_error( __( 'Empty post data.', 'sharing-image' ), 400 );
		}

		$params = $request->get_json_params();

		if ( ! isset( $params['template'] ) ) {
			wp_send_json_error( __( 'Wrong request parameters.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( $params['template'] );

		if ( empty( $params['fieldset'] ) ) {
			$params['fieldset'] = array();
		}

		$fieldset = array_map( 'sanitize_textarea_field', $params['fieldset'] );

		$this->generate_poster( $fieldset, $index, $post_id, 'post' );
	}

	/**
	 * TODO: replace here
	 */
	public function handle_ajax_generator() {
		$check = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Reload the page and retry.', 'sharing-image' ), 403 );
		}

		$screen_id = 0;

		if ( ! empty( $_POST['sharing_image_screen'] ) ) {
			$screen_id = absint( wp_unslash( $_POST['sharing_image_screen'] ) );
		}

		$context = 'post';

		if ( ! empty( $_POST['sharing_image_context'] ) ) {
			$context = sanitize_key( wp_unslash( $_POST['sharing_image_context'] ) );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$picker = $this->sanitize_picker( wp_unslash( $_POST['sharing_image_picker'] ) );

		if ( ! isset( $picker['template'] ) ) {
			wp_send_json_error( esc_html__( 'Template id cannot be empty', 'sharing-image' ), 400 );
		}

		$id = absint( $picker['template'] );

		// Get templates list from settings.
		$templates = $this->settings->get_templates();

		if ( ! isset( $templates[ $id ] ) ) {
			wp_send_json_error( esc_html__( 'Wrong template id', 'sharing-image' ), 400 );
		}

		$fieldset = array();

		if ( isset( $picker['fieldset'][ $id ] ) ) {
			$fieldset = $picker['fieldset'][ $id ];
		}

		$generator = new Generator();

		// Prepare template editor.
		$template = $generator->prepare_template( $templates[ $id ], $fieldset, null, $screen_id, $context );

		if ( ! $generator->check_required( $template ) ) {
			wp_send_json_error( esc_html__( 'Wrong template settings', 'sharing-image' ), 400 );
		}

		list( $path, $url ) = $generator->get_upload_file();

		// Generate image and save it to given path.
		$poster = $generator->create_poster( $template, $path );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		$this->save_attachment( $path, $screen_id, $context );

		$source = array(
			'poster' => $url,
			'width'  => $template['width'],
			'height' => $template['height'],
		);

		wp_send_json_success( $source );
	}

	/**
	 * Generate poster by AJAX request.
	 */
	private function generate_poster( $fieldset, $index, $screen_id, $context ) {
		$templates = $this->settings->get_templates();

		if ( ! isset( $templates[ $index ] ) ) {
			wp_send_json_error( esc_html__( 'Wrong template id', 'sharing-image' ), 400 );
		}

		$generator = new Generator();

		// Prepare template editor.
		$editor = $generator->prepare_template( $templates[ $index ], $fieldset, $index, $screen_id, $context );

		if ( ! $generator->check_required( $editor ) ) {
			wp_send_json_error( esc_html__( 'Wrong template settings', 'sharing-image' ), 400 );
		}

		list( $path, $url ) = $generator->get_upload_file();

		// Generate image and save it to given path.
		$poster = $generator->create_poster( $editor, $path );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		$this->save_attachment( $path, $screen_id, $context );

		$source = array(
			'poster' => $url,
			'width'  => $editor['width'],
			'height' => $editor['height'],
		);

		wp_send_json_success( $source );
	}

	/**
	 * Try to autogenerate poster on post insert or update.
	 *
	 * @param integer $post_id Updated post_id.
	 */
	public function autogenerate_poster( $post_id ) {
		/**
		 * Easy way disable autogeneration.
		 *
		 * @since 2.0.12
		 *
		 * @param bool $disable_autogeneration Set true to disable autogeneration.
		 * @param int  $post_id Post ID.
		 */
		$disable_autogeneration = apply_filters( 'sharing_image_disable_autogeneration', false, $post_id );

		if ( $disable_autogeneration ) {
			return;
		}

		$status = get_post_status( $post_id );

		if ( 'auto-draft' === $status ) {
			return;
		}

		$meta = get_post_meta( $post_id, self::META_SOURCE, true );

		if ( empty( $meta ) ) {
			$meta = array();
		}

		if ( ! empty( $meta['poster'] ) ) {
			return;
		}

		$config = $this->settings->get_config();

		if ( ! isset( $config['autogenerate'] ) ) {
			return;
		}

		if ( 'manual' === $config['autogenerate'] ) {
			return;
		}

		$generator = new Generator();

		// Autogenerate poster id.
		$id = absint( $config['autogenerate'] );

		// Get templates list from settings.
		$templates = $this->settings->get_templates();

		if ( ! isset( $templates[ $id ] ) ) {
			return;
		}

		$template = $templates[ $id ];

		// Compose predefined template fields.
		$fieldset = $this->compose_fields( $template, $post_id );

		// Prepare template editor.
		$template = $generator->prepare_template( $template, $fieldset, null, $post_id, 'post' );

		if ( ! $generator->check_required( $template ) ) {
			return;
		}

		list( $path, $url ) = $generator->get_upload_file();

		// Generate image and save it.
		$poster = $generator->create_poster( $template, $path );

		if ( is_wp_error( $poster ) ) {
			return;
		}

		$source = array(
			'poster' => $url,
			'width'  => $template['width'],
			'height' => $template['height'],
		);

		/**
		 * Filters autogenerated poster data.
		 *
		 * @since 2.0.11
		 *
		 * @param array|false $poster  Poster image, width and height data or false if undefined.
		 * @param integer     $post_id Post ID.
		 */
		$source = apply_filters( 'sharing_image_autogenerated_poster', $source, $post_id );

		if ( empty( $source ) ) {
			return;
		}

		$meta = wp_parse_args( $source, $meta );

		$meta['template'] = $id;

		// Update post meta with new poster link.
		update_post_meta( $post_id, self::META_SOURCE, $meta );
	}

	/**
	 * Enqueue widget scripts.
	 *
	 * @param array $data Widget data object.
	 */
	private function enqueue_scripts( $data ) {
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
	 * Sanitize widget source meta.
	 *
	 * @param array $source Source meta data.
	 * @return array Sanitized source meta fields.
	 */
	public function sanitize_source( $source ) {
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

		/**
		 * Filters fieldset meta.
		 *
		 * @since 3.0
		 * @param array $sanitized List of sanitized picker fields.
		 * @param array $picker    List of picker fields before sanitization.
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
	public function sanitize_fieldset( $fieldset ) {
		$sanitized = array();

		// Get list of templates.
		$templates = $this->settings->get_templates();

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
	 * Create script object to inject with widget.
	 *
	 * @param array  $meta      Term or Post meta data.
	 * @param string $context   Widget context. For example: metabox or taxonomy.
	 * @param int    $screen_id Post or taxonomy screen ID.
	 *
	 * @return array Filtered widget script object.
	 */
	private function create_script_object( $meta, $context, $screen_id ) {
		$object = array(
			'meta'      => $meta,
			'nonce'     => wp_create_nonce( basename( __FILE__ ) ),
			'context'   => $context,
			'screen'    => $screen_id,

			'links'     => array(
				'uploads' => esc_url( admin_url( 'upload.php' ) ),
			),

			'templates' => $this->settings->get_templates(),
		);

		/**
		 * Filter widget script object.
		 *
		 * @param array $object Array of widget script object.
		 */
		return apply_filters( 'sharing_image_widget_object', $object );
	}

	/**
	 * Get an array of post types where the metabox is displayed.
	 *
	 * @return array Array of post types.
	 */
	private function get_metabox_post_types() {
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
	 * @param array $template Templates data from settings page.
	 * @param int   $post_id  Post id.
	 *
	 * @return array List of fields.
	 */
	private function compose_fields( $template, $post_id ) {
		$layers = array();

		if ( isset( $template['layers'] ) ) {
			$layers = $template['layers'];
		}

		$fieldset = array();

		foreach ( $layers as $i => $layer ) {
			if ( empty( $layer['type'] ) || 'text' !== $layer['type'] ) {
				continue;
			}

			if ( empty( $layer['dynamic'] ) || empty( $layer['preset'] ) ) {
				continue;
			}

			if ( 'title' === $layer['preset'] ) {
				$fieldset['captions'][ $i ] = get_the_title( $post_id );
			}

			if ( 'excerpt' === $layer['preset'] ) {
				$fieldset['captions'][ $i ] = get_the_excerpt( $post_id );
			}
		}

		$thumbnail_id = get_post_thumbnail_id( $post_id );

		if ( ! empty( $thumbnail_id ) ) {
			$fieldset['attachment'] = $thumbnail_id;
		}

		return $fieldset;
	}

	/**
	 * Get an array of taxonomeis where the widget is displayed.
	 *
	 * @return array Array of taxonomies.
	 */
	private function get_widget_taxonomies() {
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
	 */
	private function save_attachment( $path, $screen_id, $context ) {
		$config = $this->settings->get_config();

		if ( ! isset( $config['attachment'] ) ) {
			return;
		}

		$name = implode( '-', array( 'sharing-image', $context, $screen_id ) );

		// Delete attachment for this screen id if exists.
		$this->delete_attachment( $name );

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
			return;
		}

		$id = wp_insert_attachment( $attachment['post'], $path, $attachment['parent_id'] );

		// Get attachment metadata.
		$metadata = wp_generate_attachment_metadata( $id, $path );

		wp_update_attachment_metadata( $id, $metadata );
	}

	/**
	 * Delete attachment by name if exists.
	 *
	 * @param string $name Name of attachment.
	 *
	 * @return bool Whether attachment deleted
	 */
	private function delete_attachment( $name ) {
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
			return;
		}

		return wp_delete_attachment( $posts[0]->ID, true );
	}
}
