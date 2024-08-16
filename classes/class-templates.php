<?php
/**
 * Handle templates settings page.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Templates class.
 *
 * @class Templates
 */
class Templates {

	/**
	 * Sharing Image templates options name.
	 *
	 * @var string
	 */
	const OPTION_TEMPLATES = 'sharing_image_data';

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'handle_requests' ) );
	}

	/**
	 * Handle tools requests from admin-side.
	 */
	public static function handle_requests() {
		add_action( 'admin_post_sharing_image_save_editor', array( __CLASS__, 'save_editor' ) );
		add_action( 'admin_post_sharing_image_delete_template', array( __CLASS__, 'delete_template' ) );

		add_action( 'wp_ajax_sharing_image_show_preview', array( __CLASS__, 'show_preview' ) );
		add_action( 'wp_ajax_sharing_image_save_preview', array( __CLASS__, 'save_preview' ) );
	}

	/**
	 * Save template editor fields.
	 */
	public static function save_editor() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = admin_url( 'options-general.php?page=' . Settings::SETTINGS_SLUG );

		if ( ! isset( $_POST['sharing_image_index'] ) ) {
			Settings::redirect_with_message( $redirect, 2 );
		}

		$index = sanitize_key( wp_unslash( $_POST['sharing_image_index'] ) );

		if ( ! self::is_valid_unique_index( $index ) ) {
			Settings::redirect_with_message( $redirect, 2 );
		}

		if ( ! isset( $_POST['sharing_image_editor'] ) ) {
			Settings::redirect_with_message( $redirect, 2 );
		}

		$templates = self::get_templates();

		// Skip 2nd+ templates if the Premium is not active.
		if ( ! Premium::is_premium_features() && ! empty( $templates ) && empty( $templates[ $index ] ) ) {
			Settings::redirect_with_message( $redirect, 8 );
		}

		$redirect = add_query_arg( array( 'template' => $index ), $redirect );

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = self::sanitize_editor( wp_unslash( $_POST['sharing_image_editor'] ) );

		self::update_templates( $index, $editor );

		// Redirect with success message.
		Settings::redirect_with_message( $redirect, 1 );
	}

	/**
	 * Action to delete template from editor page.
	 */
	public static function delete_template() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = admin_url( 'options-general.php?page=' . Settings::SETTINGS_SLUG );

		if ( ! isset( $_REQUEST['template'] ) ) {
			Settings::redirect_with_message( $redirect, 4 );
		}

		$index = sanitize_key( $_REQUEST['template'] );

		if ( ! self::update_templates( $index ) ) {
			Settings::redirect_with_message( $redirect, 4 );
		}

		Settings::redirect_with_message( $redirect, 3 );
	}

	/**
	 * Show generated template from AJAX request.
	 */
	public static function show_preview() {
		$check = check_ajax_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Please reload the page and try again.', 'sharing-image' ), 403 );
		}

		if ( ! isset( $_POST['sharing_image_index'] ) ) {
			wp_send_json_error( __( 'Poster index is undefined.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( wp_unslash( $_POST['sharing_image_index'] ) );

		if ( ! isset( $_POST['sharing_image_editor'] ) ) {
			wp_send_json_error( __( 'Editor settings are not configured.', 'sharing-image' ), 400 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = self::sanitize_editor( wp_unslash( $_POST['sharing_image_editor'] ) );

		// Prepare template editor.
		$editor = Generator::prepare_template( $editor, null, $index );

		if ( ! Generator::check_required( $editor ) ) {
			wp_send_json_error( __( 'Incorrect template settings.', 'sharing-image' ), 400 );
		}

		// Generate image and show it immediately.
		$poster = Generator::create_poster( $editor );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		exit; // It's ok to exit here. Just cause we show an image above.
	}

	/**
	 * Save generated template from AJAX request.
	 */
	public static function save_preview() {
		$check = check_ajax_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Please reload the page and try again.', 'sharing-image' ), 403 );
		}

		if ( ! isset( $_POST['sharing_image_index'] ) ) {
			wp_send_json_error( __( 'Poster index is undefined.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( wp_unslash( $_POST['sharing_image_index'] ) );

		if ( ! isset( $_POST['sharing_image_editor'] ) ) {
			wp_send_json_error( __( 'Editor settings are not configured.', 'sharing-image' ), 400 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = self::sanitize_editor( wp_unslash( $_POST['sharing_image_editor'] ) );

		// Prepare template editor.
		$editor = Generator::prepare_template( $editor, null, $index );

		if ( ! Generator::check_required( $editor ) ) {
			wp_send_json_error( __( 'Incorrect template settings.', 'sharing-image' ), 400 );
		}

		list( $path, $url ) = Generator::get_upload_file();

		// Generate image and save it.
		$poster = Generator::create_poster( $editor, $path );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		wp_send_json_success( $url );
	}

	/**
	 * Get templates list from options.
	 *
	 * @return array List of templates.
	 */
	public static function get_templates() {
		$templates = get_option( self::OPTION_TEMPLATES, null );

		if ( empty( $templates ) ) {
			$templates = array();
		}

		if ( ! Premium::is_premium_features() ) {
			$templates = array_slice( $templates, 0, 1 );
		}

		/**
		 * Filters list of templates.
		 *
		 * @param array $templates List of templates.
		 */
		return apply_filters( 'sharing_image_get_templates', $templates );
	}

	/**
	 * Get templates count.
	 *
	 * @return int Last index of templates list.
	 */
	public static function get_templates_count() {
		return count( self::get_templates() );
	}

	/**
	 * Check if template with given index exists.
	 *
	 * @param string $index Template index.
	 *
	 * @return bool Whether template exists.
	 */
	public static function has_template( $index ) {
		if ( empty( $index ) ) {
			return false;
		}

		$templates = self::get_templates();

		if ( array_key_exists( $index, $templates ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Check unique template index.
	 *
	 * @param string $index Unique template index to check.
	 *
	 * @return bool  Whether unique template index is correct.
	 */
	public static function is_valid_unique_index( $index ) {
		$valid = preg_match( '~^[a-z0-9]{8}$~', $index );

		/**
		 * Filter whether given unique index matching rule.
		 *
		 * @param bool   $valid Valid flag.
		 * @param string $index Template index.
		 */
		return apply_filters( 'sharing_image_valid_unique_index', $valid, $index );
	}

	/**
	 * Update templates by index.
	 *
	 * @param string     $index  Template index to create or update.
	 * @param array|null $editor New template data. Use null to delete template.
	 *
	 * @return bool True if the value was updated, false otherwise.
	 */
	public static function update_templates( $index, $editor = null ) {
		// Method get_templates() is not used to save old templates during Premium switching.
		$templates = get_option( self::OPTION_TEMPLATES, null );

		if ( empty( $templates ) ) {
			$templates = array();
		}

		$templates[ $index ] = $editor;

		if ( is_null( $editor ) ) {
			unset( $templates[ $index ] );
		}

		/**
		 * Filters list of templates before update in database.
		 *
		 * @param array $templates List of reindexed templates.
		 */
		$templates = apply_filters( 'sharing_image_update_templates', $templates );

		return update_option( self::OPTION_TEMPLATES, $templates );
	}

	/**
	 * Generate random string for layer key.
	 *
	 * @param int    $len Optional. Desiner string length.
	 * @param string $key Optional. Prefix for key.
	 */
	public static function generate_layer_key( $len = 12, $key = '' ) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		for ( $i = 0; $i < $len; $i++ ) {
			$key = $key . $characters[ random_int( 0, strlen( $characters ) - 1 ) ];
		}

		return $key;
	}

	/**
	 * Create unique template index.
	 *
	 * @return string New template index.
	 */
	public static function create_unique_index() {
		$templates = self::get_templates();

		// Generate random index.
		$index = substr( bin2hex( openssl_random_pseudo_bytes( 20 ) ), -8 );

		/**
		 * Filter template unique index.
		 *
		 * @param array $index     Generated template index.
		 * @param array $templates List of templates.
		 */
		$index = apply_filters( 'sharing_image_unique_index', $index, $templates );

		if ( array_key_exists( $index, $templates ) ) {
			return self::create_unique_index();
		}

		return $index;
	}

	/**
	 * Sanitize editor template settings.
	 *
	 * @param array $editor Template editor settings.
	 *
	 * @return array
	 */
	public static function sanitize_editor( $editor ) {
		$sanitized = array();

		if ( ! empty( $editor['debug'] ) ) {
			$sanitized['debug'] = 'debug';
		}

		if ( ! empty( $editor['preview'] ) ) {
			$sanitized['preview'] = sanitize_text_field( $editor['preview'] );
		}

		if ( ! empty( $editor['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $editor['title'] );
		}

		$sanitized['fill'] = '#000000';

		if ( ! empty( $editor['fill'] ) ) {
			$sanitized['fill'] = sanitize_hex_color( $editor['fill'] );
		}

		$sanitized['width'] = 1200;

		if ( ! empty( $editor['width'] ) ) {
			$sanitized['width'] = absint( $editor['width'] );
		}

		$sanitized['height'] = 630;

		if ( ! empty( $editor['height'] ) ) {
			$sanitized['height'] = absint( $editor['height'] );
		}

		if ( isset( $editor['layers'] ) && is_array( $editor['layers'] ) ) {
			$layers = array();

			foreach ( $editor['layers'] as $key => $layer ) {
				if ( empty( $layer['type'] ) ) {
					continue;
				}

				switch ( $layer['type'] ) {
					case 'text':
						$layers[ $key ] = self::sanitize_text_layer( $layer );
						break;

					case 'image':
						$layers[ $key ] = self::sanitize_image_layer( $layer );
						break;

					case 'filter':
						$layers[ $key ] = self::sanitize_filter_layer( $layer );
						break;

					case 'rectangle':
						$layers[ $key ] = self::sanitize_rectangle_layer( $layer );
						break;
				}
			}

			$sanitized['layers'] = $layers;
		}

		/**
		 * Filters template editor sanitized fields.
		 *
		 * @param array $sanitized List of sanitized editor fields.
		 * @param array $editor    List of editor fields before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_editor', $sanitized, $editor );
	}

	/**
	 * Sanitize template editor text layer.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return array Sanitized layer settings.
	 */
	private static function sanitize_text_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['collapsed'] ) ) {
			$sanitized['collapsed'] = 1;
		}

		if ( ! empty( $layer['dynamic'] ) ) {
			$sanitized['dynamic'] = 'dynamic';
		}

		if ( isset( $layer['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $layer['title'] );
		}

		if ( isset( $layer['content'] ) ) {
			$sanitized['content'] = sanitize_textarea_field( $layer['content'] );
		}

		if ( isset( $layer['sample'] ) ) {
			$sanitized['sample'] = sanitize_textarea_field( $layer['sample'] );
		}

		if ( isset( $layer['separator'] ) ) {
			$sanitized['separator'] = preg_replace( '#[^\s,]#', '', $layer['separator'] );
		}

		$sanitized['preset'] = 'none';

		if ( isset( $layer['preset'] ) ) {
			$preset = array( 'title', 'excerpt', 'categories', 'tags' );

			if ( in_array( $layer['preset'], $preset, true ) ) {
				$sanitized['preset'] = $layer['preset'];
			}
		}

		$sanitized['color'] = '#ffffff';

		if ( ! empty( $layer['color'] ) ) {
			$sanitized['color'] = sanitize_hex_color( $layer['color'] );
		}

		$sanitized['horizontal'] = 'left';

		if ( isset( $layer['horizontal'] ) ) {
			$horizontal = array( 'center', 'right' );

			if ( in_array( $layer['horizontal'], $horizontal, true ) ) {
				$sanitized['horizontal'] = $layer['horizontal'];
			}
		}

		$sanitized['vertical'] = 'top';

		if ( isset( $layer['vertical'] ) ) {
			$vertical = array( 'center', 'bottom' );

			if ( in_array( $layer['vertical'], $vertical, true ) ) {
				$sanitized['vertical'] = $layer['vertical'];
			}
		}

		if ( isset( $layer['fontsize'] ) ) {
			$sanitized['fontsize'] = absint( $layer['fontsize'] );
		}

		if ( isset( $layer['lineheight'] ) ) {
			$sanitized['lineheight'] = (float) $layer['lineheight'];
		}

		if ( isset( $layer['fontname'] ) ) {
			$sanitized['fontname'] = sanitize_text_field( $layer['fontname'] );
		}

		if ( ! empty( $layer['fontfile'] ) ) {
			$sanitized['fontfile'] = absint( $layer['fontfile'] );
		}

		$sanitized['opacity'] = 0;

		if ( isset( $layer['opacity'] ) ) {
			$opacity = absint( $layer['opacity'] );

			if ( $opacity <= 100 ) {
				$sanitized['opacity'] = $opacity;
			}
		}

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( ! isset( $layer[ $size ] ) || '' === $layer[ $size ] ) {
				continue;
			}

			$sanitized[ $size ] = intval( $layer[ $size ] );
		}

		$sanitized['boundary'] = self::sanitize_boundary( $layer );

		return $sanitized;
	}

	/**
	 * Sanitize template editor image layer.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return array Sanitized image layer settings.
	 */
	private static function sanitize_image_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['collapsed'] ) ) {
			$sanitized['collapsed'] = 1;
		}

		if ( isset( $layer['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $layer['title'] );
		}

		if ( ! empty( $layer['dynamic'] ) ) {
			$sanitized['dynamic'] = 'dynamic';
		}

		if ( ! empty( $layer['attachment'] ) ) {
			$sanitized['attachment'] = absint( $layer['attachment'] );
		}

		$sanitized['opacity'] = 0;

		if ( isset( $layer['opacity'] ) ) {
			$opacity = absint( $layer['opacity'] );

			if ( $opacity <= 100 ) {
				$sanitized['opacity'] = $opacity;
			}
		}

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( ! isset( $layer[ $size ] ) || '' === $layer[ $size ] ) {
				continue;
			}

			$sanitized[ $size ] = intval( $layer[ $size ] );
		}

		$sanitized['preset'] = 'none';

		if ( isset( $layer['preset'] ) ) {
			$preset = array( 'featured' ); // Possible update later.

			if ( in_array( $layer['preset'], $preset, true ) ) {
				$sanitized['preset'] = $layer['preset'];
			}
		}

		$sanitized['resize'] = 'center';

		if ( isset( $layer['resize'] ) ) {
			$resize = array( 'center', 'top', 'bottom', 'ignore', 'crop' );

			if ( in_array( $layer['resize'], $resize, true ) ) {
				$sanitized['resize'] = $layer['resize'];
			}
		}

		$sanitized['boundary'] = self::sanitize_boundary( $layer );

		return $sanitized;
	}

	/**
	 * Sanitize template editor filter layer.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return array Sanitized filter layer settings.
	 */
	private static function sanitize_filter_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['collapsed'] ) ) {
			$sanitized['collapsed'] = 1;
		}
		
		if ( isset( $layer['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $layer['title'] );
		}

		if ( ! empty( $layer['grayscale'] ) ) {
			$sanitized['grayscale'] = 'grayscale';
		}

		if ( ! empty( $layer['blur'] ) ) {
			$sanitized['blur'] = 'blur';
		}

		$sanitized['brightness'] = 0;

		if ( isset( $layer['brightness'] ) ) {
			$brightness = (int) $layer['brightness'];

			if ( $brightness >= -100 && $brightness <= 100 ) {
				$sanitized['brightness'] = $brightness;
			}
		}

		$sanitized['contrast'] = 0;

		if ( isset( $layer['contrast'] ) ) {
			$contrast = (int) $layer['contrast'];

			if ( $contrast >= -100 && $contrast <= 100 ) {
				$sanitized['contrast'] = $contrast;
			}
		}

		$sanitized['blackout'] = 0;

		if ( isset( $layer['blackout'] ) ) {
			$blackout = (int) $layer['blackout'];

			if ( $blackout >= 0 && $blackout <= 100 ) {
				$sanitized['blackout'] = $blackout;
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize template editor rectagle layer.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return array Sanitized rectangle layer settings.
	 */
	private static function sanitize_rectangle_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['collapsed'] ) ) {
			$sanitized['collapsed'] = 1;
		}

		if ( isset( $layer['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $layer['title'] );
		}
		
		if ( ! empty( $layer['outline'] ) ) {
			$sanitized['outline'] = 'outline';
		}

		$sanitized['color'] = '#ffffff';

		if ( ! empty( $layer['color'] ) ) {
			$sanitized['color'] = sanitize_hex_color( $layer['color'] );
		}

		$sanitized['opacity'] = 0;

		if ( isset( $layer['opacity'] ) ) {
			$opacity = absint( $layer['opacity'] );

			if ( $opacity <= 100 ) {
				$sanitized['opacity'] = $opacity;
			}
		}

		$sanitized['thickness'] = 0;

		if ( isset( $layer['thickness'] ) ) {
			$thickness = (int) $layer['thickness'];

			if ( $thickness >= 0 && $thickness <= 50 ) {
				$sanitized['thickness'] = $thickness;
			}
		}

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( ! isset( $layer[ $size ] ) || '' === $layer[ $size ] ) {
				continue;
			}

			$sanitized[ $size ] = intval( $layer[ $size ] );
		}

		$sanitized['boundary'] = self::sanitize_boundary( $layer );

		return $sanitized;
	}

	/**
	 * Sanitize boundary layer setting.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return string Boundary setting.
	 */
	private static function sanitize_boundary( $layer ) {
		$boundary = 'absolute';

		if ( isset( $layer['boundary'] ) ) {
			$valid = array( 'absolute', 'vertically', 'horizontally', 'both' );

			if ( in_array( $layer['boundary'], $valid, true ) ) {
				$boundary = $layer['boundary'];
			}
		}

		return $boundary;
	}
}
