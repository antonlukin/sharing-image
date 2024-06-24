<?php
/**
 * Settings page class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Settings page class
 *
 * @class Settings
 */
class Settings {
	/**
	 * Admin screen id.
	 *
	 * @var string
	 */
	const SCREEN_ID = 'settings_page_sharing-image';

	/**
	 * Plugin admin menu slug.
	 *
	 * @var string
	 */
	const SETTINGS_SLUG = 'sharing-image';

	/**
	 * Common nonce for settings tabs.
	 */
	const SETTINGS_NONCE = 'sharing-image-nonce';

	/**
	 * List of settings tabs.
	 *
	 * @var array
	 */
	private static $tabs = array();

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		self::init_tabs();

		add_action( 'admin_menu', array( __CLASS__, 'add_menu' ) );
		add_action( 'admin_title', array( __CLASS__, 'update_settings_title' ) );
		add_action( 'admin_init', array( __CLASS__, 'allow_custom_fonts' ) );

		add_filter( 'plugin_action_links', array( __CLASS__, 'add_settings_link' ), 10, 2 );
	}

	/**
	 * Add plugin settings page in WordPress menu.
	 */
	public static function add_menu() {
		/**
		 * Easy way to hide settings page.
		 *
		 * @param bool $hide_settings Set true to hide settings page.
		 */
		$hide_settings = apply_filters( 'sharing_image_hide_settings', false );

		if ( $hide_settings ) {
			return;
		}

		add_options_page(
			esc_html__( 'Sharing Image settings', 'sharing-image' ),
			esc_html__( 'Sharing Image', 'sharing-image' ),
			'manage_options',
			self::SETTINGS_SLUG,
			array( __CLASS__, 'display_settings' )
		);

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );
	}

	/**
	 * Allow uploading custom fonts for templates editor.
	 * This function may affect the security of the site.
	 * Disable font uploading if you are not going to use it.
	 */
	public static function allow_custom_fonts() {
		/**
		 * Easy way to disable custom font uploading.
		 *
		 * @param bool $disable_fonts Set true to disable fonts uploading.
		 */
		$disable_fonts = apply_filters( 'sharing_image_disable_custom_fonts', false );

		if ( $disable_fonts ) {
			return;
		}

		// Allow fonts uploading.
		add_filter( 'wp_check_filetype_and_ext', array( __CLASS__, 'fix_fonts_mime_type' ), 10, 3 );

		// Add new .ttf and .otf font mime types.
		add_filter( 'upload_mimes', array( __CLASS__, 'add_fonts_mime_type' ) );
	}

	/**
	 * Add settings link to plugins list.
	 *
	 * @param array  $actions     An array of plugin action links.
	 * @param string $plugin_file Path to the plugin file relative to the plugins directory.

	 * @return array Array of settings actions.
	 */
	public static function add_settings_link( $actions, $plugin_file ) {
		$actions = (array) $actions;

		if ( plugin_basename( SHARING_IMAGE_FILE ) === $plugin_file ) {
			$actions[] = sprintf(
				'<a href="%s">%s</a>',
				admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG ),
				__( 'Settings', 'sharing-image' )
			);
		}

		return $actions;
	}

	/**
	 * Show plugin settings.
	 */
	public static function display_settings() {
		if ( ! self::is_settings_screen() ) {
			return;
		}

		include_once SHARING_IMAGE_DIR . 'templates/settings.php';

		/**
		 * Fires on settings template including.
		 */
		do_action( 'sharing_image_settings' );
	}

	/**
	 * Fix .ttf and .otf files mime.
	 *
	 * @param array  $types    Values for the extension, mime type, and corrected filename.
	 * @param string $file     Full path to the file.
	 * @param string $filename The name of the file (may differ from $file due to.
	 *
	 * @return array List of file types.
	 */
	public static function fix_fonts_mime_type( $types, $file, $filename ) {
		$extension = pathinfo( $filename, PATHINFO_EXTENSION );

		if ( 'ttf' === $extension ) {
			$types['ext'] = false;

			if ( current_user_can( 'manage_options' ) ) {
				$types['ext']  = 'ttf';
				$types['type'] = 'font/ttf';
			}
		}

		if ( 'otf' === $extension ) {
			$types['ext'] = false;

			if ( current_user_can( 'manage_options' ) ) {
				$types['ext']  = 'otf';
				$types['type'] = 'font/otf';
			}
		}

		return $types;
	}

	/**
	 * Add new .ttf and .otf font mime types.
	 *
	 * @param array $types Allowed file types to upload.
	 *
	 * @return array Allowed file types to upload.
	 */
	public static function add_fonts_mime_type( $types ) {
		$types['ttf'] = 'font/ttf';
		$types['otf'] = 'font/otf';

		return $types;
	}

	/**
	 * Enqueue settings styles.
	 */
	public static function enqueue_styles() {
		if ( ! self::is_settings_screen() ) {
			return;
		}

		$asset = require SHARING_IMAGE_DIR . 'assets/settings/index.asset.php';

		wp_enqueue_media();

		wp_enqueue_style(
			'sharing-image-settings',
			plugins_url( 'assets/settings/index.css', SHARING_IMAGE_FILE ),
			array(),
			SHARING_IMAGE_VERSION,
			'all'
		);
	}

	/**
	 * Enqueue settings scripts.
	 */
	public static function enqueue_scripts() {
		if ( ! self::is_settings_screen() ) {
			return;
		}

		$asset = require SHARING_IMAGE_DIR . 'assets/widget/index.asset.php';

		wp_enqueue_script(
			'sharing-image-settings',
			plugins_url( 'assets/settings/index.js', SHARING_IMAGE_FILE ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_media();

		// Translations availible only for WP 5.0+.
		wp_set_script_translations( 'sharing-image-settings', 'sharing-image' );

		$object = self::create_script_object();

		// Add settings script object.
		wp_localize_script( 'sharing-image-settings', 'sharingImageSettings', $object );
	}

	/**
	 * Update settings page title.
	 *
	 * @param string $title Plugin settings page title.
	 *
	 * @return string Plugin settings title
	 */
	public static function update_settings_title( $title ) {
		if ( ! self::is_settings_screen() ) {
			return $title;
		}

		$tab = self::get_current_tab();

		if ( null === $tab ) {
			return $title;
		}

		if ( empty( self::$tabs[ $tab ]['label'] ) ) {
			return $title;
		}

		$label = esc_html( self::$tabs[ $tab ]['label'] );

		return sprintf( '%s &ndash; %s', $label, $title );
	}

	/**
	 * Create script object to inject with settings.
	 *
	 * @return array Filtered script settings object.
	 */
	private static function create_script_object() {
		$uploads = wp_get_upload_dir();

		// Get uploads directory path from WordPress root.
		$basedir = str_replace( ABSPATH, '', $uploads['basedir'] );

		$object = array(
			'nonce'      => wp_create_nonce( self::SETTINGS_NONCE ),
			'links'      => array(
				'uploads' => esc_url( admin_url( 'upload.php' ) ),
				'action'  => esc_url( admin_url( 'admin-post.php' ) ),
				'premium' => esc_url_raw( self::get_tab_link( 'premium' ) ),
				'storage' => path_join( $basedir, 'sharing-image' ),
			),
			'fonts'      => self::get_fonts(),
			'taxonomies' => self::get_preset_taxonomies(),
			'templates'  => Templates::get_templates(),
			'index'      => Templates::create_unique_index(),
			'snippets'   => Snippets::get_snippets(),
			'config'     => Config::get_config(),
			'license'    => Premium::get_license(),
		);

		/**
		 * Filters settings script object.
		 *
		 * @param array $object Array of settings script object.
		 */
		return apply_filters( 'sharing_image_settings_object', $object );
	}

	/**
	 * Show settings tab template.
	 */
	private static function show_settings_section() {
		$tab = self::get_current_tab();

		if ( null === $tab ) {
			return;
		}

		include_once SHARING_IMAGE_DIR . "templates/{$tab}.php";
	}

	/**
	 * Show settings messages and errors after post actions.
	 */
	private static function show_settings_message() {
		// phpcs:ignore WordPress.Security.NonceVerification
		$message = isset( $_GET['message'] ) ? absint( $_GET['message'] ) : 0;

		switch ( $message ) {
			case 1:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Settings updated successfully.', 'sharing-image' ), 'updated' );
				break;

			case 2:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Unable to save template settings.', 'sharing-image' ) );
				break;

			case 3:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Template deleted successfully.', 'sharing-image' ), 'updated' );
				break;

			case 4:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Unable to delete template.', 'sharing-image' ) );
				break;

			case 5:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Unable to save configuration settings.', 'sharing-image' ) );
				break;

			case 6:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Error uploading file. Please try again.', 'sharing-image' ) );
				break;

			case 7:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'The imported file is empty.', 'sharing-image' ) );
				break;

			case 8:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'The maximum allowed number of templates has been reached. Please upgrade to Premium.', 'sharing-image' ) );
				break;

			case 9:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Templates imported successfully.', 'sharing-image' ), 'updated' );
				break;

			case 10:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Unable to clone template.', 'sharing-image' ) );
				break;

			case 11:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Template cloned successfully.', 'sharing-image' ), 'updated' );
				break;

			case 12:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Posters removed successfully.', 'sharing-image' ), 'updated' );
				break;
		}

		settings_errors( 'sharing-image' );
	}

	/**
	 * Set list of settings page tabs.
	 */
	private static function init_tabs() {
		$tabs = array(
			'templates' => array(
				'label'   => __( 'Templates', 'sharing-image' ),
				'link'    => admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG ),
				'default' => true,
			),
			'config'    => array(
				'label' => __( 'Configuration', 'sharing-image' ),
				'link'  => admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG . '&tab=config' ),
			),
			'tools'     => array(
				'label' => __( 'Tools', 'sharing-image' ),
				'link'  => admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG . '&tab=tools' ),
			),
			'premium'   => array(
				'label' => __( 'Premium', 'sharing-image' ),
				'link'  => admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG . '&tab=premium' ),
			),
		);

		/**
		 * Filters tabs in settings page.
		 *
		 * @param array $tabs List of settings tabs.
		 */
		self::$tabs = apply_filters( 'sharing_image_settings_tabs', $tabs );
	}

	/**
	 * Print menu on settings page.
	 */
	private static function show_settings_menu() {
		$current = self::get_current_tab();

		foreach ( self::$tabs as $tab => $args ) {
			$classes = array(
				'sharing-image-tab',
			);

			if ( $current === $tab ) {
				$classes[] = 'active';
			}

			if ( null === $current && ! empty( $args['default'] ) ) {
				$classes[] = 'active';
			}

			printf(
				'<a href="%2$s" class="%1$s">%3$s</a>',
				esc_attr( implode( ' ', $classes ) ),
				esc_url( $args['link'] ),
				esc_html( $args['label'] )
			);
		}
	}

	/**
	 * Get availible fonts.
	 *
	 * @return array List of availible poster fonts.
	 */
	private static function get_fonts() {
		$fonts = array(
			'open-sans'       => 'Open Sans',
			'open-sans-light' => 'Open Sans Light',
			'open-sans-bold'  => 'Open Sans Bold',
			'merriweather'    => 'Merriweather',
			'roboto-slab'     => 'Roboto Slab',
			'ubuntu'          => 'Ubuntu',
			'rubik-bold'      => 'Rubik Bold',
			'alice'           => 'Alice',
			'lobster'         => 'Lobster',
		);

		/**
		 * Filters poster fonts.
		 *
		 * @param array List of availible poster fonts.
		 */
		return apply_filters( 'sharing_image_poster_fonts', $fonts );
	}

	/**
	 * Get available taxonomies for text layer preset.
	 *
	 * @return array List of availible preset taxonomies.
	 */
	public static function get_preset_taxonomies() {
		$objects = get_taxonomies(
			array(
				'public'  => true,
				'show_ui' => true,
			),
			'object',
		);

		$taxonomies = array();

		foreach ( $objects as $key => $object ) {
			$label = $key;

			if ( ! empty( $object->label ) ) {
				$label = $object->label;
			}

			$taxonomies[ $key ] = $label;
		}

		/**
		 * Filter taxonomies for text layer preset.
		 *
		 * @param array $taxonomies List of taxonomies.
		 */
		return apply_filters( 'sharing_image_preset_taxonomies', $taxonomies );
	}

	/**
	 * Get tab link by slug.
	 *
	 * @param string $tab Tab name.
	 *
	 * @return string|null Tab link.
	 */
	public static function get_tab_link( $tab ) {
		if ( empty( self::$tabs[ $tab ]['link'] ) ) {
			return admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG );
		}

		return self::$tabs[ $tab ]['link'];
	}

	/**
	 * Get current tab.
	 *
	 * @return string|null Current tab name.
	 */
	public static function get_current_tab() {
		// phpcs:disable WordPress.Security.NonceVerification
		if ( ! empty( $_GET['tab'] ) ) {
			$tab = sanitize_file_name( wp_unslash( $_GET['tab'] ) );

			if ( array_key_exists( $tab, self::$tabs ) ) {
				return $tab;
			}
		}
		// phpcs:enable WordPress.Security.NonceVerification

		return null;
	}

	/**
	 * Add message id to the back link and redirect
	 *
	 * @param string $redirect Redirect link.
	 * @param int    $message  Settings error message id.
	 */
	public static function redirect_with_message( $redirect, $message ) {
		$redirect = add_query_arg( array( 'message' => $message ), $redirect );

		wp_safe_redirect( $redirect );
		exit;
	}

	/**
	 * Is current admin screen the plugin options screen.
	 *
	 * @return bool Whether the settings screen of this plugin is displayed or not.
	 */
	private static function is_settings_screen() {
		$current_screen = get_current_screen();

		if ( $current_screen && self::SCREEN_ID === $current_screen->id ) {
			return true;
		}

		return false;
	}
}
