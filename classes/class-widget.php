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
	const WIDGET_META = '_sharing_image';

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
		// Init taxonomy term widget.
		add_action( 'admin_init', array( $this, 'init_taxonomy_widget' ) );

		// Init post metabox widget.
		add_action( 'admin_init', array( $this, 'init_metabox_widget' ) );

		// Handle metabox AJAX requests.
		add_action( 'admin_init', array( $this, 'handle_ajax_requests' ) );
	}

	/**
	 * Init metabox on post editing page.
	 */
	public function init_metabox_widget() {
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
		add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_metabox_assets' ) );
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
			esc_html__( 'Sharing Image', 'sharing image' ),
			array( $this, 'display_widget' ),
			$this->get_metabox_post_types(),
			'side'
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
		$meta = get_post_meta( $post->ID, self::WIDGET_META, true );

		$this->enqueue_scripts( $this->create_script_object( $meta, 'metabox' ) );
		$this->enqueue_styles();
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
		$meta = get_term_meta( $term_id, self::WIDGET_META, true );

		$this->enqueue_scripts( $this->create_script_object( $meta, 'taxonomy' ) );
		$this->enqueue_styles();
	}

	/**
	 * Save metabox fields.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 */
	public static function save_metabox( $post_id, $post ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( ! isset( $_POST['sharing_image_nonce'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		if ( ! wp_verify_nonce( $_POST['sharing_image_nonce'], basename( __FILE__ ) ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( ! isset( $_POST['sharing_image_picker'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$meta = $this->sanitize_picker( wp_unslash( $_POST['sharing_image_picker'] ) );

		/**
		 * Filters post meta on update.
		 *
		 * @param string $picker  Picker data.
		 * @param string $post_id Post ID.
		 */
		$meta = apply_filters( 'sharing_image_update_post_meta', $meta, $post_id );

		// Update post meta.
		update_post_meta( $post_id, self::WIDGET_META, $meta );
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
		 * @param string $picker  Picker data.
		 * @param string $term_id Term ID.
		 */
		$meta = apply_filters( 'sharing_image_update_term_meta', $meta, $term_id );

		update_term_meta( $term_id, self::WIDGET_META, $meta );
	}

	/**
	 * Display widget.
	 */
	public function display_widget() {
		include_once SHARING_IMAGE_DIR . '/templates/widget.php';

		/**
		 * Fires on widget template including.
		 */
		do_action( 'sharing_image_widget' );
	}

	/**
	 * Handle widget AJAX requests.
	 */
	public function handle_ajax_requests() {
		$actions = array(
			'generate' => 'generate_poster',
		);

		foreach ( $actions as $key => $method ) {
			$action = 'sharing_image_' . $key;

			if ( method_exists( $this, $method ) ) {
				add_action( 'wp_ajax_' . $action, array( $this, $method ) );
			}
		}
	}

	/**
	 * Generate poster by AJAX request.
	 */
	public function generate_poster() {
		$check = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Reload the page and retry.', 'sharing-image' ), 403 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$picker = $this->sanitize_picker( wp_unslash( $_POST['sharing_image_picker'] ) );

		// Compose new poster.
		$poster = ( new Generator() )->compose( $picker );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		wp_send_json_success( $poster );
	}

	/**
	 * Enqueue widget styles.
	 */
	private function enqueue_styles() {
		wp_enqueue_style(
			'sharing-image-widget',
			SHARING_IMAGE_URL . 'assets/styles/widget.css',
			array(),
			SHARING_IMAGE_VERSION,
			'all'
		);
	}

	/**
	 * Enqueue widget scripts.
	 *
	 * @param array $object Widget data object.
	 */
	private function enqueue_scripts( $object ) {
		wp_enqueue_media();

		wp_enqueue_script(
			'sharing-image-widget',
			SHARING_IMAGE_URL . 'assets/scripts/widget.js',
			array( 'wp-i18n', 'wp-polyfill-formdata' ),
			SHARING_IMAGE_VERSION,
			true
		);

		wp_set_script_translations( 'sharing-image-settings', 'sharing-image' );

		// Add widget script object.
		wp_localize_script( 'sharing-image-widget', 'sharingImageWidget', $object );
	}

	/**
	 * Sanitize picker widget data before saving.
	 *
	 * @param array $picker Widget POST data.
	 * @return array
	 */
	private function sanitize_picker( $picker ) {
		$sanitized = array();

		if ( isset( $picker['poster'] ) ) {
			$sanitized['poster'] = sanitize_text_field( $picker['poster'] );
		}

		if ( isset( $picker['width'] ) ) {
			$sanitized['width'] = absint( $picker['width'] );
		}

		if ( isset( $picker['height'] ) ) {
			$sanitized['height'] = absint( $picker['height'] );
		}

		$template = 0;

		if ( isset( $picker['template'] ) ) {
			$template = absint( $picker['template'] );

			if ( count( $this->settings->get_templates() ) <= $template ) {
				$template = 0;
			}
		}

		$sanitized['template'] = $template;

		if ( isset( $picker['fieldset'] ) ) {
			$fieldset = $picker['fieldset'];

			foreach ( $fieldset as $key => $fields ) {
				$sanitized['fieldset'][ $key ] = $this->sanitize_fieldset( $fields );
			}
		}

		/**
		 * Filters widget picker sanitized fields.
		 *
		 * @param array $sanitized List of sanitized picker fields.
		 * @param array $picker    List of picker fields before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_picker', $sanitized, $picker );
	}

	/**
	 * Sanitize picker widget fieldset list.
	 *
	 * @param array $fields Fieldset widget list.
	 * @return array
	 */
	public function sanitize_fieldset( $fields ) {
		$sanitized = array();

		if ( ! empty( $fields['captions'] ) && is_array( $fields['captions'] ) ) {
			$sanitized['captions'] = array_map( 'sanitize_textarea_field', $fields['captions'] );
		}

		if ( ! empty( $fields['attachment'] ) ) {
			$sanitized['attachment'] = absint( $fields['attachment'] );
		}

		return $sanitized;
	}

	/**
	 * Create script object to inject with widget.
	 *
	 * @param array  $meta    Term or Post meta data.
	 * @param string $context Widget context. For example: metabox or taxonomy.
	 * @return array
	 */
	private function create_script_object( $meta, $context ) {
		$object = array(
			'meta'      => $meta,
			'nonce'     => wp_create_nonce( basename( __FILE__ ) ),
			'context'   => $context,

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
	 * @return array
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
	 * Get an array of taxonomeis where the widget is displayed.
	 *
	 * @return array
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
}
