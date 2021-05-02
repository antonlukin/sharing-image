<?php
/**
 * Metabox class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Metabox class
 *
 * @class Metabox
 */
class Metabox {
	/**
	 * Metabox ID.
	 *
	 * @var string
	 */
	const METABOX_ID = 'sharing-image-metabox';

	/**
	 * Post meta key to store poster image.
	 *
	 * @var string
	 */
	const META_POSTER = '_sharing_image';

	/**
	 * Post meta key to store plugin custom metabox options.
	 *
	 * @var string
	 */
	const META_CUSTOM = '_sharing_image_custom';

	/**
	 * The instance of settings class.
	 *
	 * @var instance
	 */
	private $settings;

	/**
	 * Metabox constructor.
	 */
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_metabox' ) );
		add_action( 'save_post', array( $this, 'save_metabox' ), 10, 2 );

		// Handle metabox AJAX requests.
		add_action( 'admin_init', array( $this, 'handle_ajax_requests' ) );

		$this->settings = new Settings();
	}

	/**
	 * Add metabox to post editing page.
	 */
	public function add_metabox() {
		/**
		 * Easy way to hide metabox.
		 *
		 * @param bool $hide_metabox Set true to hide metabox.
		 */
		$hide_metabox = apply_filters( 'sharing_image_hide_metabox', false );

		if ( $hide_metabox ) {
			return;
		}

		add_meta_box(
			self::METABOX_ID,
			esc_html__( 'Sharing Image', 'sharing image' ),
			array( $this, 'display_metabox' ),
			$this->get_post_types(),
			'side'
		);

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
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
		$picker = $this->sanitize_picker( wp_unslash( $_POST['sharing_image_picker'] ) );

		// Update poster meta.
		$this->update_poster( $picker, $post_id );

		// Update metabox custom.
		$this->update_custom( $picker, $post_id );
	}

	/**
	 * Display metabox.
	 */
	public function display_metabox() {
		printf(
			'<p class="hide-if-js">%s</p>',
			esc_html__( 'This metabox requires JavaScript. Enable it in your browser settings, please.', 'sharing-image' )
		);

		/**
		 * Fires on metabox template including.
		 */
		do_action( 'sharing_image_metabox' );
	}

	/**
	 * Handle metabox AJAX requests.
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
		$verify = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $verify ) {
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
	 * Enqueue metabox styles.
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_styles( $hook_suffix ) {
		if ( ! in_array( $hook_suffix, array( 'post.php', 'post-new.php' ), true ) ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->post_type, $this->get_post_types(), true ) ) {
			return;
		}

		wp_enqueue_style(
			'sharing-image-metabox',
			SHARING_IMAGE_URL . '/assets/styles/metabox.css',
			array(),
			SHARING_IMAGE_VERSION,
			'all'
		);
	}

	/**
	 * Enqueue metabox scripts.
	 *
	 * @param string $hook_suffix The current admin page.
	 */
	public function enqueue_scripts( $hook_suffix ) {
		if ( ! in_array( $hook_suffix, array( 'post.php', 'post-new.php' ), true ) ) {
			return;
		}

		$screen = get_current_screen();

		if ( ! in_array( $screen->post_type, $this->get_post_types(), true ) ) {
			return;
		}

		$post = get_post();

		wp_enqueue_media();

		wp_enqueue_script(
			'sharing-image-metabox',
			SHARING_IMAGE_URL . '/assets/scripts/metabox.js',
			array( 'wp-i18n' ),
			SHARING_IMAGE_VERSION,
			true
		);

		wp_set_script_translations( 'sharing-image-settings', 'sharing-image' );

		// Add metabox script object.
		wp_localize_script( 'sharing-image-metabox', 'sharingImageMetabox', $this->create_script_object( $post->ID ) );
	}

	/**
	 * Get poster for current Post ID.
	 *
	 * @param int $post_id Current Post ID.
	 * @return string
	 */
	public function get_poster( $post_id ) {
		$poster = get_post_meta( $post_id, self::META_POSTER, true );

		/**
		 * Filters poster url.
		 *
		 * @param string $poster  Poster url
		 * @param string $post_id Post ID.
		 */
		return apply_filters( 'sharing_image_get_poster', $poster, $post_id );
	}

	/**
	 * Update post meta options.
	 *
	 * @param array $picker Metabox POST data.
	 * @param int   $post_id Current Post ID.
	 */
	public function update_poster( $picker, $post_id ) {
		if ( ! isset( $picker['poster'] ) ) {
			return;
		}

		/**
		 * Filters metabox poster on post update.
		 *
		 * @param string $poster  Poster url.
		 * @param string $post_id Post ID.
		 */
		$poster = apply_filters( 'sharing_image_update_poster', $picker['poster'], $post_id );

		update_post_meta( $post_id, self::META_POSTER, $poster );
	}

	/**
	 * Get metabox post meta custom.
	 *
	 * @param int $post_id Current Post ID.
	 * @return array
	 */
	public function get_custom( $post_id ) {
		$custom = get_post_meta( $post_id, self::META_CUSTOM, true );

		/**
		 * Filters post meta custom.
		 *
		 * @param string $custom  List of custom meta.
		 * @param string $post_id Post ID.
		 */
		return apply_filters( 'sharing_image_get_custom', $custom, $post_id );
	}

	/**
	 * Update post meta options.
	 *
	 * @param array $picker Metabox POST data.
	 * @param int   $post_id Current Post ID.
	 */
	public function update_custom( $picker, $post_id ) {
		if ( isset( $picker['poster'] ) ) {
			unset( $picker['poster'] );
		}

		/**
		 * Filters metabox custom on post update.
		 *
		 * @param array $custom  List of custom meta.
		 * @param array $post_id Curret Post ID.
		 */
		$custom = apply_filters( 'sharing_image_update_custom', $picker, $post_id );

		update_post_meta( $post_id, self::META_CUSTOM, $custom );
	}

	/**
	 * Sanitize picker metabox data before saving.
	 *
	 * @param array $picker Metabox POST data.
	 * @return array
	 */
	private function sanitize_picker( $picker ) {
		$sanitized = array();

		if ( isset( $picker['poster'] ) ) {
			$sanitized['poster'] = sanitize_text_field( $picker['poster'] );
		}

		if ( isset( $picker['template'] ) ) {
			$template = absint( $picker['template'] );

			if ( count( $this->settings->get_templates() ) <= $template ) {
				$template = 0;
			}

			$sanitized['template'] = $template;
		}

		if ( isset( $picker['fieldset'] ) ) {
			$fieldset = $picker['fieldset'];

			foreach ( $fieldset as $key => $fields ) {
				$sanitized['fieldset'][ $key ] = $this->sanitize_fieldset( $fields );
			}
		}

		/**
		 * Filters metabox picker sanitized fields.
		 *
		 * @param array $sanitized List of sanitized picker fields.
		 * @param array $picker    List of picker fields before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_picker', $sanitized, $picker );
	}

	/**
	 * Sanitize picker metabox fieldset list.
	 *
	 * @param array $fields Fieldset metabox list.
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
	 * Create script object to inject with metabox.
	 *
	 * @param int $post_id Current post ID.
	 * @return array
	 */
	private function create_script_object( $post_id ) {
		$object = array(
			'nonce'     => wp_create_nonce( basename( __FILE__ ) ),

			'links'     => array(
				'uploads' => esc_url( admin_url( 'upload.php' ) ),
			),

			'poster'    => $this->get_poster( $post_id ),
			'custom'    => $this->get_custom( $post_id ),
			'templates' => $this->settings->get_templates(),
		);

		/**
		 * Filter metabox script object.
		 *
		 * @param array $object  Array of metabox script object.
		 * @param int   $post_id Current post ID.
		 */
		return apply_filters( 'sharing_image_metabox_object', $object, $post_id );
	}

	/**
	 * Get an array of post types where the metabox is displayed.
	 *
	 * @return array
	 */
	private function get_post_types() {
		$post_types = get_post_types(
			array(
				'public' => true,
			)
		);

		unset( $post_types['attachment'] );

		/**
		 * Filter metabox post types.
		 *
		 * @param array $post_types Array of post types for which the metabox is displayed.
		 */
		return apply_filters( 'sharing_image_post_types', array_values( $post_types ) );
	}
}
