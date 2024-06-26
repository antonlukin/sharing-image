<?php
/**
 * Handle config tab on settings page and provide static methods.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Config class.
 *
 * @class Config
 */
class Config {
	/**
	 * Sharing Image config options name.
	 *
	 * @var string
	 */
	const OPTION_CONFIG = 'sharing_image_config';

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'handle_requests' ) );
	}

	/**
	 * Handle config requests from admin-side.
	 */
	public static function handle_requests() {
		add_action( 'admin_post_sharing_image_save_config', array( __CLASS__, 'save_config_tab' ) );
	}

	/**
	 * Save config fields on plugin settings page.
	 */
	public static function save_config_tab() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = Settings::get_tab_link( 'config' );

		if ( ! isset( $_POST['sharing_image_config'] ) ) {
			Settings::redirect_with_message( $redirect, 5 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$config = self::sanitize_config( wp_unslash( $_POST['sharing_image_config'] ) );

		self::update_config( $config );

		// Redirect with success message.
		Settings::redirect_with_message( $redirect, 1 );
	}

	/**
	 * Get plugin config settings.
	 *
	 * @return array List of plugin config settings.
	 */
	public static function get_config() {
		$config = get_option( self::OPTION_CONFIG );

		if ( empty( $config ) ) {
			$config = array();
		}

		/**
		 * Filters settings config.
		 *
		 * @param array List of plugin config settings.
		 */
		return apply_filters( 'sharing_image_get_config', $config );
	}

	/**
	 * Update config settings.
	 *
	 * @param array $config Updated config data.
	 */
	public static function update_config( $config ) {
		/**
		 * Filters config options before their update in database.
		 *
		 * @param array $config Settings config data.
		 */
		$config = apply_filters( 'sharing_image_update_config', $config );

		update_option( self::OPTION_CONFIG, $config );
	}

	/**
	 * Get path to directory with uploaded posters.
	 *
	 * @return array Path and url to upload directory.
	 */
	public static function get_upload_dir() {
		$config = self::get_config();

		if ( ! isset( $config['uploads'] ) ) {
			$config['uploads'] = 'default';
		}

		$directory = wp_upload_dir();

		// Create default data.
		$uploads = array( $directory['path'], $directory['url'] );

		// Create custom upload directory.
		if ( isset( $config['storage'] ) && 'custom' === $config['uploads'] ) {
			$uploads = self::create_upload_dir( $config['storage'] );
		}

		/**
		 * Filters upload directory.
		 *
		 * @param array $dir Path and url to upload directory.
		 */
		return apply_filters( 'sharing_image_upload_dir', $uploads );
	}

	/**
	 * Get generated image file format.
	 *
	 * @param string $format Optional. Default image format.

	 * @return string Image file format.
	 */
	public static function get_file_format( $format = 'jpg' ) {
		$config = self::get_config();

		if ( isset( $config['format'] ) ) {
			$format = $config['format'];
		}

		/**
		 * Filters Image file format.
		 *
		 * @param string $format Image file format.
		 */
		return apply_filters( 'sharing_image_file_format', $format );
	}

	/**
	 * Get quality of generated poster.
	 *
	 * @param int $quality Optional. Default image quality.
	 *
	 * @return int Image quality.
	 */
	public static function get_quality( $quality = 90 ) {
		$config = self::get_config();

		if ( isset( $config['quality'] ) ) {
			$quality = $config['quality'];
		}

		/**
		 * Filters poster image quality.
		 *
		 * @param string $quality Image quality.
		 */
		return apply_filters( 'sharing_image_poster_quality', $quality );
	}

	/**
	 * Try to get default poster image data.
	 * Returns array with image url, width and height.
	 *
	 * @see https://developer.wordpress.org/reference/functions/wp_get_attachment_image_src/
	 *
	 * @return array|false Array of image data, or boolean false if no image is available.
	 */
	public static function get_default_poster_src() {
		$config = self::get_config();

		if ( empty( $config['default'] ) ) {
			return false;
		}

		$poster = wp_get_attachment_image_src( $config['default'], 'full' );

		if ( is_array( $poster ) ) {
			$poster = array_slice( $poster, 0, 3 );
		}

		/**
		 * Filters default poster data.
		 *
		 * @param array|false Array of image data, or boolean false if no image is available.
		 */
		return apply_filters( 'sharing_image_default_poster_src', $poster );
	}

	/**
	 * Check if Post widget is hidden.
	 *
	 * @return bool Whether Post widget is hidden.
	 */
	public static function is_hidden_post_widget() {
		$config = self::get_config();

		/**
		 * Easy way to hide Post Metabox/Gutenberg sidebar.
		 *
		 * @param bool Set true to hide metabox.
		 */
		return apply_filters( 'sharing_image_hide_metabox', isset( $config['nowidget'] ) );
	}

	/**
	 * Check if plugin snippets is active.
	 *
	 * @return bool Whether plugin snippets are enabled.
	 */
	public static function is_active_snippets() {
		$active_snippets = false;

		// Get config data.
		$config = self::get_config();

		if ( isset( $config['meta'] ) && 'snippets' === $config['meta'] ) {
			$active_snippets = true;
		}

		/**
		 * Last chance to activate plugin snippets.
		 *
		 * @since 3.0
		 *
		 * @param bool $active_snippets Set true to activate plugin snippets.
		 */
		return apply_filters( 'sharing_image_active_snippets', $active_snippets );
	}

	/**
	 * Check that header meta is forced enabled.
	 *
	 * @return bool Whether header meta is enabled.
	 */
	public static function is_custom_header_meta() {
		$show_header = true;

		// Get config data.
		$config = self::get_config();

		if ( isset( $config['meta'] ) && 'hidden' === $config['meta'] ) {
			$show_header = false;
		}

		/**
		 * Last chance to show customer header meta.
		 *
		 * @since 3.0
		 *
		 * @param bool $show_header Set true to show custom header meta.
		 */
		return apply_filters( 'sharing_image_show_header', $show_header );
	}

	/**
	 * Sanitize config settings.
	 *
	 * @param array $config Config settings.
	 *
	 * @return array Sanitized config settings.
	 */
	private static function sanitize_config( $config ) {
		$sanitized = array();

		if ( ! empty( $config['default'] ) ) {
			$sanitized['default'] = absint( $config['default'] );
		}

		$sanitized['format'] = 'jpg';

		if ( isset( $config['format'] ) ) {
			$format = $config['format'];

			if ( in_array( $format, array( 'jpg', 'png', 'gif' ), true ) ) {
				$sanitized['format'] = $config['format'];
			}
		}

		if ( isset( $config['quality'] ) ) {
			$quality = (int) $config['quality'];

			if ( $quality >= 1 && $quality <= 100 ) {
				$sanitized['quality'] = $quality;
			}
		}

		$sanitized['uploads'] = 'default';

		if ( isset( $config['uploads'] ) ) {
			$uploads = $config['uploads'];

			if ( in_array( $uploads, array( 'custom', 'default' ), true ) ) {
				$sanitized['uploads'] = $config['uploads'];
			}
		}

		$sanitized['autogenerate'] = '';

		if ( ! empty( $config['autogenerate'] ) ) {
			$sanitized['autogenerate'] = sanitize_key( $config['autogenerate'] );
		}

		if ( isset( $config['storage'] ) ) {
			$sanitized['storage'] = sanitize_text_field( $config['storage'] );
		}

		if ( isset( $config['suspend'] ) ) {
			$sanitized['suspend'] = 'suspend';
		}

		if ( isset( $config['attachment'] ) ) {
			$sanitized['attachment'] = 'attachment';
		}

		if ( isset( $config['nowidget'] ) ) {
			$sanitized['nowidget'] = 'nowidget';
		}

		if ( isset( $config['meta'] ) ) {
			$sanitized['meta'] = sanitize_text_field( $config['meta'] );
		}

		$sanitized['meta'] = 'snippets';

		if ( isset( $config['meta'] ) ) {
			$meta = $config['meta'];

			if ( in_array( $meta, array( 'hidden', 'custom' ), true ) ) {
				$sanitized['meta'] = $config['meta'];
			}
		}

		if ( ! empty( $config['demo'] ) ) {
			$sanitized['demo'] = 1;
		}

		/**
		 * Filters template editor sanitized fields.
		 *
		 * @param array $sanitized List of sanitized config fields.
		 * @param array $config    List of config fields before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_config', $sanitized, $config );
	}

	/**
	 * Create upload directory and return its path and url
	 *
	 * @param string $storage Relative directory path.
	 *
	 * @return array Path and url to upload directory.
	 */
	private static function create_upload_dir( $storage ) {
		$storage = trim( $storage, '/' );

		/**
		 * Change permissions when creating new folders.
		 *
		 * @param int $permissions New directory access permissions. By default 0755.
		 */
		$permissions = apply_filters( 'sharing_image_directory_permissions', 0755 );

		// We do not pay attention to the possible error.
		wp_mkdir_p( ABSPATH . $storage, $permissions, true );

		return array( ABSPATH . $storage, site_url( $storage ) );
	}
}
