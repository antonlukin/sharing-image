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
	 * Sharing Image templates options name.
	 *
	 * @var string
	 */
	const OPTION_TEMPLATES = 'sharing_image_templates';

	/**
	 * Sharing Image config options name.
	 *
	 * @var string
	 */
	const OPTION_CONFIG = 'sharing_image_config';

	/**
	 * Sharing Image license options name.
	 *
	 * @var string
	 */
	const OPTION_LICENSE = 'sharing_image_license';

	/**
	 * Plugin admin menu slug.
	 *
	 * @var string
	 */
	const SETTINGS_SLUG = 'sharing-image';

	/**
	 * Remote licenses API url.
	 *
	 * @var string
	 */
	const REMOTE_LICENSES = 'https://wpset.org/sharing-image/verify/';

	/**
	 * Premium verification event name.
	 *
	 * @var string
	 */
	const EVENT_PREMIUM = 'sharing_image_event_premium';

	/**
	 * List of settings tabs.
	 *
	 * @var array
	 */
	private $tabs = array();

	/**
	 * Settings constructor.
	 */
	public function __construct() {
		$this->init_tabs();
	}

	/**
	 * Init class actions and filters.
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'load-settings_page_' . self::SETTINGS_SLUG, array( $this, 'create_demo_template' ) );

		// Handle settings POST requests.
		add_action( 'admin_init', array( $this, 'handle_post_requests' ) );

		// Handle settings AJAX requests.
		add_action( 'admin_init', array( $this, 'handle_ajax_requests' ) );

		// Allow uploading custom fonts for templates editor.
		add_action( 'admin_init', array( $this, 'allow_custom_fonts' ) );

		// Add settings link to plugins list.
		add_filter( 'plugin_action_links', array( $this, 'add_settings_link' ), 10, 2 );

		// Update admin title for different tabs.
		add_action( 'admin_title', array( $this, 'update_settings_title' ) );

		// Schedule Premium license verification.
		add_action( self::EVENT_PREMIUM, array( $this, 'launch_verification_event' ), 10, 1 );
	}

	/**
	 * Create demo template after plugin activation.
	 */
	public function create_demo_template() {
		$config = $this->get_config();

		// phpcs:ignore WordPress.Security.NonceVerification
		if ( ! empty( $config['initialized'] ) && ! isset( $_REQUEST['demo-template'] ) ) {
			return;
		}

		if ( ! file_exists( SHARING_IMAGE_DIR . 'demo/templates.json' ) ) {
			return;
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions
		$templates = file_get_contents( SHARING_IMAGE_DIR . 'demo/templates.json' );
		$templates = json_decode( $templates, true );

		if ( empty( $templates ) ) {
			return;
		}

		foreach ( $templates as $template ) {
			$this->update_templates( null, $this->sanitize_editor( $template ) );
		}

		$this->update_config( $config );
	}

	/**
	 * Add plugin settings page in WordPress menu.
	 */
	public function add_menu() {
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
			array( $this, 'display_settings' )
		);

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Handle settings POST requests.
	 */
	public function handle_post_requests() {
		$actions = array(
			'config' => 'save_settings_config',
			'editor' => 'save_settings_template',
			'delete' => 'delete_template',
			'export' => 'export_templates',
			'import' => 'import_templates',
			'clone'  => 'clone_template',
		);

		foreach ( $actions as $key => $method ) {
			$action = 'sharing_image_' . $key;

			if ( method_exists( $this, $method ) ) {
				add_action( 'admin_post_' . $action, array( $this, $method ) );
			}
		}
	}

	/**
	 * Handle settings AJAX requests.
	 */
	public function handle_ajax_requests() {
		$actions = array(
			'show'   => 'show_template_preview',
			'save'   => 'save_template_preview',
			'verify' => 'verify_premium_key',
			'revoke' => 'revoke_premium_access',
		);

		foreach ( $actions as $key => $method ) {
			$action = 'sharing_image_' . $key;

			if ( method_exists( $this, $method ) ) {
				add_action( 'wp_ajax_' . $action, array( $this, $method ) );
			}
		}
	}

	/**
	 * Allow uploading custom fonts for templates editor.
	 * This function may affect the security of the site.
	 * Disable font uploading if you are not going to use it.
	 */
	public function allow_custom_fonts() {
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
		add_filter( 'wp_check_filetype_and_ext', array( $this, 'fix_fonts_mime_type' ), 10, 3 );

		// Add new .ttf and .otf font mime types.
		add_filter( 'upload_mimes', array( $this, 'add_fonts_mime_type' ) );
	}

	/**
	 * Add settings link to plugins list.
	 *
	 * @param array  $actions     An array of plugin action links.
	 * @param string $plugin_file Path to the plugin file relative to the plugins directory.

	 * @return array Array of settings actions.
	 */
	public function add_settings_link( $actions, $plugin_file ) {
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
	 * Save settings config fields.
	 */
	public function save_settings_config() {
		check_admin_referer( basename( __FILE__ ), 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = $this->get_tab_link( 'config' );

		if ( ! isset( $_POST['sharing_image_config'] ) ) {
			$this->redirect_with_message( $redirect, 5 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$config = $this->sanitize_config( wp_unslash( $_POST['sharing_image_config'] ) );

		$this->update_config( $config );

		// Redirect with success message.
		$this->redirect_with_message( $redirect, 1 );
	}

	/**
	 * Save template editor fields.
	 */
	public function save_settings_template() {
		check_admin_referer( basename( __FILE__ ), 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG );

		if ( ! isset( $_POST['sharing_image_index'] ) ) {
			$this->redirect_with_message( $redirect, 2 );
		}

		$index = sanitize_key( wp_unslash( $_POST['sharing_image_index'] ) );

		if ( ! $this->is_valid_unique_index( $index ) ) {
			$this->redirect_with_message( $redirect, 2 );
		}

		if ( ! isset( $_POST['sharing_image_editor'] ) ) {
			$this->redirect_with_message( $redirect, 2 );
		}

		$templates = $this->get_templates();

		// Skip 2nd+ templates if the Premium is not active.
		if ( ! $this->is_premium_features() && empty( $templates[ $index ] ) ) {
			$this->redirect_with_message( $redirect, 8 );
		}

		$redirect = add_query_arg( array( 'template' => $index ), $redirect );

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = $this->sanitize_editor( wp_unslash( $_POST['sharing_image_editor'] ) );

		$this->update_templates( $index, $editor );

		// Redirect with success message.
		$this->redirect_with_message( $redirect, 1 );
	}

	/**
	 * Action to delete template from editor page.
	 */
	public function delete_template() {
		check_admin_referer( basename( __FILE__ ), 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG );

		if ( ! isset( $_REQUEST['template'] ) ) {
			$this->redirect_with_message( $redirect, 4 );
		}

		$index = sanitize_key( $_REQUEST['template'] );

		if ( ! $this->update_templates( $index ) ) {
			$this->redirect_with_message( $redirect, 4 );
		}

		$this->redirect_with_message( $redirect, 3 );
	}

	/**
	 * Action to export templates.
	 */
	public function export_templates() {
		check_admin_referer( basename( __FILE__ ), 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$templates = $this->get_templates();

		// Remove site-dependent posters.
		foreach ( $templates as &$template ) {
			unset( $template['preview'] );
		}

		$filename = 'sharing-image-export-' . time() . '.json';

		status_header( 200 );

		header( 'Content-Description: File Transfer' );
		header( "Content-Disposition: attachment; filename={$filename}" );
		header( 'Content-Type: application/json; charset=utf-8' );

		echo wp_json_encode( $templates, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT );
		exit;
	}

	/**
	 * Action to import templates.
	 */
	public function import_templates() {
		check_admin_referer( basename( __FILE__ ), 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		if ( ! current_user_can( 'upload_files' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to upload files.', 'sharing-image' ) );
		}

		$redirect = $this->get_tab_link( 'tools' );

		if ( empty( $_FILES['sharing_image_import']['tmp_name'] ) ) {
			$this->redirect_with_message( $redirect, 6 );
		}

		if ( ! empty( $_FILES['sharing_image_import']['error'] ) ) {
			$this->redirect_with_message( $redirect, 6 );
		}

		$file = sanitize_text_field( $_FILES['sharing_image_import']['tmp_name'] );

		// phpcs:ignore WordPress.WP.AlternativeFunctions
		$templates = file_get_contents( $file );
		$templates = json_decode( $templates, true );

		// Check if empty.
		if ( empty( $templates ) || ! is_array( $templates ) ) {
			$this->redirect_with_message( $redirect, 7 );
		}

		foreach ( $templates as $index => $template ) {
			$this->update_templates( $index, $this->sanitize_editor( $template ) );
		}

		$this->redirect_with_message( $redirect, 9 );
	}

	/**
	 * Action to clone template.
	 */
	public function clone_template() {
		check_admin_referer( basename( __FILE__ ), 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = $this->get_tab_link( 'tools' );

		if ( ! isset( $_REQUEST['sharing_image_clone'] ) ) {
			$this->redirect_with_message( $redirect, 10 );
		}

		$index = sanitize_key( $_REQUEST['sharing_image_clone'] );

		// Get all templates to find by index.
		$templates = $this->get_templates();

		if ( ! isset( $templates[ $index ] ) ) {
			$this->redirect_with_message( $redirect, 10 );
		}

		$template = $templates[ $index ];

		// Remove poster if exists.
		unset( $template['preview'] );

		if ( empty( $template['title'] ) ) {
			$template['title'] = esc_html__( 'Untitled', 'sharing-image' );
		}

		$prefix = esc_html__( 'Copy: ' );

		if ( strpos( $template['title'], $prefix ) !== 0 ) {
			$template['title'] = $prefix . $template['title'];
		}

		if ( ! $this->update_templates( uniqid(), $template ) ) {
			$this->redirect_with_message( $redirect, 10 );
		}

		$this->redirect_with_message( $redirect, 11 );
	}

	/**
	 * Show generated template from AJAX request.
	 */
	public function show_template_preview() {
		$check = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Reload the page and retry.', 'sharing-image' ), 403 );
		}

		if ( ! isset( $_POST['sharing_image_index'] ) ) {
			wp_send_json_error( __( 'Poster index undefined.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( wp_unslash( $_POST['sharing_image_index'] ) );

		if ( ! isset( $_POST['sharing_image_editor'] ) ) {
			wp_send_json_error( __( 'Editor settings are not set.', 'sharing-image' ), 400 );
		}

		$generator = new Generator();

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = $this->sanitize_editor( wp_unslash( $_POST['sharing_image_editor'] ) );

		// Prepare template editor.
		$editor = $generator->prepare_template( $editor, null, $index );

		if ( ! $generator->check_required( $editor ) ) {
			wp_send_json_error( __( 'Wrong template settings.', 'sharing-image' ), 400 );
		}

		// Generate image and show it immediately.
		$poster = $generator->create_poster( $editor );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		exit; // It's ok to exit here. Just cause we show an image above.
	}

	/**
	 * Show generated template from AJAX request.
	 */
	public function save_template_preview() {
		$check = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Reload the page and retry.', 'sharing-image' ), 403 );
		}

		if ( ! isset( $_POST['sharing_image_index'] ) ) {
			wp_send_json_error( __( 'Poster index undefined.', 'sharing-image' ), 400 );
		}

		$index = sanitize_key( wp_unslash( $_POST['sharing_image_index'] ) );

		if ( ! isset( $_POST['sharing_image_editor'] ) ) {
			wp_send_json_error( __( 'Editor settings are not set.', 'sharing-image' ), 400 );
		}

		$generator = new Generator();

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = $this->sanitize_editor( wp_unslash( $_POST['sharing_image_editor'] ) );

		// Prepare template editor.
		$editor = $generator->prepare_template( $editor, null, $index );

		if ( ! $generator->check_required( $editor ) ) {
			wp_send_json_error( __( 'Wrong template settings.', 'sharing-image' ), 400 );
		}

		list( $path, $url ) = $generator->get_upload_file();

		// Generate image and save it.
		$poster = $generator->create_poster( $editor, $path );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		wp_send_json_success( $url );
	}

	/**
	 * Verify Premium key from AJAX request.
	 */
	public function verify_premium_key() {
		$check = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Reload the page and retry.', 'sharing-image' ), 403 );
		}

		if ( empty( $_POST['sharing_image_key'] ) ) {
			wp_send_json_error( __( 'Premium key undefined.', 'sharing-image' ), 400 );
		}

		$key = sanitize_text_field( wp_unslash( $_POST['sharing_image_key'] ) );

		$args = array(
			'body' => array(
				'key'    => $key,
				'domain' => wp_parse_url( site_url(), PHP_URL_HOST ),
			),
		);

		$response = wp_remote_post( self::REMOTE_LICENSES, $args );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( __( 'Remote request error: ', 'sharing-image' ) . $response->get_error_message(), 400 );
		}

		$answer = json_decode( $response['body'], true );

		if ( ! isset( $answer['success'] ) ) {
			wp_send_json_error( __( 'Invalid response received from the verification server.', 'sharing-image' ), 400 );
		}

		// Remove license verification event.
		wp_unschedule_hook( self::EVENT_PREMIUM );

		if ( true === $answer['success'] ) {
			$license = $this->update_license( true, $key );

			// Schedule license verification twice daily.
			$this->schedule_verification( array( $key ) );

			wp_send_json_success( $license );
		}

		$error = array(
			'success' => false,
			'data'    => __( 'Verification failed.', 'sharing-image' ),
		);

		if ( isset( $answer['result'] ) ) {
			$error['code'] = $answer['result'];
		}

		$this->update_license( false, $key );

		wp_send_json( $error, 403 );
	}

	/**
	 * Revoke Premium access from AJAX request.
	 */
	public function revoke_premium_access() {
		$check = check_ajax_referer( basename( __FILE__ ), 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Reload the page and retry.', 'sharing-image' ), 403 );
		}

		// Remove license verification event.
		wp_unschedule_hook( self::EVENT_PREMIUM );

		// Disable Premium license.
		$license = $this->update_license( false );

		wp_send_json_success( $license );
	}

	/**
	 * Show plugin settings.
	 */
	public function display_settings() {
		if ( ! $this->is_settings_screen() ) {
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
	public function fix_fonts_mime_type( $types, $file, $filename ) {
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
	public function add_fonts_mime_type( $types ) {
		$types['ttf'] = 'font/ttf';
		$types['otf'] = 'font/otf';

		return $types;
	}

	/**
	 * Enqueue settings styles.
	 */
	public function enqueue_styles() {
		if ( ! $this->is_settings_screen() ) {
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
	public function enqueue_scripts() {
		if ( ! $this->is_settings_screen() ) {
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

		$object = $this->create_script_object();

		// Add settings script object.
		wp_localize_script( 'sharing-image-settings', 'sharingImageSettings', $object );
	}

	/**
	 * Get templates list from options.
	 *
	 * @return array List of templates.
	 */
	public function get_templates() {
		$templates = get_option( self::OPTION_TEMPLATES, null );

		if ( empty( $templates ) ) {
			$templates = array();
		}

		if ( ! $this->is_premium_features() ) {
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
	public function get_templates_count() {
		return count( $this->get_templates() );
	}

	/**
	 * Update templates by index.
	 *
	 * @param string     $index  Template index to create or update.
	 * @param array|null $editor New template data. Use null to delete template.
	 *
	 * @return bool True if the value was updated, false otherwise.
	 */
	public function update_templates( $index, $editor = null ) {
		// Method get_templates() is not used to save old templates during Premium switching.
		$templates = get_option( self::OPTION_TEMPLATES, null );

		if ( empty( $templates ) ) {
			$templates = array();
		}

		$templates[ $index ] = $editor;

		if ( null === $editor ) {
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
	 * Get plugin config settings.
	 *
	 * @return array List of plugin config settings.
	 */
	public function get_config() {
		$config = get_option( self::OPTION_CONFIG, array() );

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
	 * @param array $config License settings config data.
	 */
	public function update_config( $config ) {
		// Set this option every time on config save.
		$config['initialized'] = 1;

		/**
		 * Filters config options before their update in database.
		 *
		 * @param array $config Settings config data.
		 */
		$config = apply_filters( 'sharing_image_update_config', $config );

		update_option( self::OPTION_CONFIG, $config );
	}

	/**
	 * Get plugin license settings.
	 *
	 * @return array List of plugin license settings.
	 */
	public function get_license() {
		$license = get_option( self::OPTION_LICENSE, array() );

		/**
		 * Check if the plugin in development mode.
		 *
		 * @param bool Current development state. Disabled by default.
		 */
		$develop = apply_filters( 'sharing_image_develop', false );

		if ( $develop ) {
			$license['develop'] = true;
		}

		/**
		 * Filters license settings.
		 *
		 * @param array List of plugin license settings.
		 */
		return apply_filters( 'sharing_image_get_license', $license );
	}

	/**
	 * Set license options.
	 *
	 * @param bool   $premium Premium status.
	 * @param string $key     License key.
	 * @param string $error   Verification error code.

	 * @return array License options.
	 */
	public function update_license( $premium, $key = '', $error = '' ) {
		$license = get_option( self::OPTION_LICENSE, array() );

		$license['premium'] = $premium;

		if ( ! empty( $key ) ) {
			$license['key'] = $key;
		}

		unset( $license['error'] );

		if ( ! empty( $error ) ) {
			$license['error'] = $error;
		}

		// Save updated license settings in database.
		update_option( self::OPTION_LICENSE, $license );

		return $license;
	}

	/**
	 * Get directory to uploaded posters.
	 *
	 * @return array Path and url to upload directory.
	 */
	public function get_upload_dir() {
		$config = $this->get_config();

		if ( ! isset( $config['uploads'] ) ) {
			$config['uploads'] = 'default';
		}

		// Create custom upload directory.
		if ( isset( $config['storage'] ) && 'custom' === $config['uploads'] ) {
			return $this->create_upload_dir( $config['storage'] );
		}

		$uploads = wp_upload_dir();

		/**
		 * Filters upload directory.
		 *
		 * @param array $dir Path and url to upload directory.
		 */
		return apply_filters( 'sharing_image_upload_dir', array( $uploads['path'], $uploads['url'] ) );
	}

	/**
	 * Get generated image file format.
	 *
	 * @param string $format Optional. Default image format.

	 * @return string Image file format.
	 */
	public function get_file_format( $format = 'jpg' ) {
		$config = $this->get_config();

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
	public function get_quality( $quality = 90 ) {
		$config = $this->get_config();

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
	public function get_default_poster_src() {
		$config = $this->get_config();

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
	 * Update settings page title.
	 *
	 * @param string $title Plugin settings page title.
	 *
	 * @return string Plugin settings title
	 */
	public function update_settings_title( $title ) {
		if ( ! $this->is_settings_screen() ) {
			return $title;
		}

		$tab = $this->get_current_tab();

		if ( null === $tab ) {
			return $title;
		}

		if ( empty( $this->tabs[ $tab ]['label'] ) ) {
			return $title;
		}

		$label = esc_html( $this->tabs[ $tab ]['label'] );

		return sprintf( '%s &ndash; %s', $label, $title );
	}

	/**
	 * Launch scheduled license verification event.
	 * Do not disable Premium if the verification server does not respond.
	 *
	 * @param string $key License key.
	 */
	public function launch_verification_event( $key ) {
		$args = array(
			'body' => array(
				'key'    => $key,
				'domain' => wp_parse_url( site_url(), PHP_URL_HOST ),
			),
		);

		$response = wp_remote_post( self::REMOTE_LICENSES, $args );

		if ( is_wp_error( $response ) ) {
			return;
		}

		$answer = json_decode( $response['body'], true );

		if ( ! isset( $answer['success'] ) ) {
			return;
		}

		if ( true === $answer['success'] ) {
			return $this->update_license( true, $key );
		}

		if ( ! isset( $answer['result'] ) ) {
			return $this->update_license( false, $key );
		}

		$this->update_license( false, $key, $answer['result'] );
	}

	/**
	 * Check if Premium features availible.
	 *
	 * @return bool Whether premium featured enabled.
	 */
	public function is_premium_features() {
		$license = $this->get_license();

		if ( ! empty( $license['premium'] ) || ! empty( $license['develop'] ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Schedule license verification.
	 *
	 * @param array $args List of event arguments. License key by default.
	 */
	public function schedule_verification( $args = array() ) {
		if ( wp_next_scheduled( self::EVENT_PREMIUM, $args ) ) {
			return;
		}

		wp_schedule_event( time() + DAY_IN_SECONDS / 2, 'twicedaily', self::EVENT_PREMIUM, $args );
	}

	/**
	 * Create script object to inject with settings.
	 *
	 * @return array Filtered script settings object.
	 */
	private function create_script_object() {
		$uploads = wp_get_upload_dir();

		// Get uploads directory path from WordPress root.
		$basedir = str_replace( ABSPATH, '', $uploads['basedir'] );

		$object = array(
			'nonce'      => wp_create_nonce( basename( __FILE__ ) ),
			'links'      => array(
				'uploads' => esc_url( admin_url( 'upload.php' ) ),
				'action'  => esc_url( admin_url( 'admin-post.php' ) ),
				'premium' => esc_url_raw( $this->get_tab_link( 'premium' ) ),
				'storage' => path_join( $basedir, 'sharing-image' ),
			),
			'index'      => $this->create_unique_index(),
			'templates'  => $this->get_templates(),
			'config'     => $this->get_config(),
			'license'    => $this->get_license(),
			'fonts'      => $this->get_fonts(),
			'taxonomies' => $this->get_preset_taxonomies(),
		);

		/**
		 * Filters settings script object.
		 *
		 * @param array $object Array of settings script object.
		 */
		return apply_filters( 'sharing_image_settings_object', $object );
	}

	/**
	 * Sanitize editor template settings.
	 *
	 * @param array $editor Template editor settings.
	 *
	 * @return array
	 */
	private function sanitize_editor( $editor ) {
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

		if ( ! empty( $editor['attachment'] ) ) {
			$sanitized['attachment'] = absint( $editor['attachment'] );
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

			foreach ( $editor['layers'] as $index => $layer ) {
				if ( empty( $layer['type'] ) ) {
					continue;
				}

				switch ( $layer['type'] ) {
					case 'text':
						$layers[ $index ] = $this->sanitize_text_layer( $layer );
						break;

					case 'image':
						$layers[ $index ] = $this->sanitize_image_layer( $layer );
						break;

					case 'filter':
						$layers[ $index ] = $this->sanitize_filter_layer( $layer );
						break;

					case 'rectangle':
						$layers[ $index ] = $this->sanitize_rectangle_layer( $layer );
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
	private function sanitize_text_layer( $layer ) {
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

		$sanitized['preset'] = 'none';

		if ( isset( $layer['preset'] ) ) {
			$preset = array( 'title', 'excerpt', 'taxonomy' );

			if ( in_array( $layer['preset'], $preset, true ) ) {
				$sanitized['preset'] = $layer['preset'];
			}
		}

		if ( isset( $layer['taxonomy'] ) ) {
			$sanitized['taxonomy'] = sanitize_key( $layer['taxonomy'] );
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

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( ! isset( $layer[ $size ] ) || '' === $layer[ $size ] ) {
				continue;
			}

			$sanitized[ $size ] = absint( $layer[ $size ] );
		}

		$sanitized['boundary'] = $this->sanitize_boundary( $layer );

		return $sanitized;
	}

	/**
	 * Sanitize template editor image layer.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return array Sanitized image layer settings.
	 */
	private function sanitize_image_layer( $layer ) {
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

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( ! isset( $layer[ $size ] ) || '' === $layer[ $size ] ) {
				continue;
			}

			$sanitized[ $size ] = absint( $layer[ $size ] );
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

		$sanitized['boundary'] = $this->sanitize_boundary( $layer );

		return $sanitized;
	}

	/**
	 * Sanitize template editor filter layer.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return array Sanitized filter layer settings.
	 */
	private function sanitize_filter_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['collapsed'] ) ) {
			$sanitized['collapsed'] = 1;
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
	private function sanitize_rectangle_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['collapsed'] ) ) {
			$sanitized['collapsed'] = 1;
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
			$opacity = (float) $layer['opacity'];

			if ( $opacity >= 0 && $opacity <= 100 ) {
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

			$sanitized[ $size ] = absint( $layer[ $size ] );
		}

		$sanitized['boundary'] = $this->sanitize_boundary( $layer );

		return $sanitized;
	}

	/**
	 * Sanitize config settings.
	 *
	 * @param array $config Config settings.
	 *
	 * @return array Sanitized config settings.
	 */
	private function sanitize_config( $config ) {
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

		if ( isset( $config['storage'] ) ) {
			$sanitized['storage'] = sanitize_text_field( $config['storage'] );
		}

		if ( isset( $config['suspend'] ) ) {
			$sanitized['suspend'] = 'suspend';
		}

		if ( isset( $config['attachment'] ) ) {
			$sanitized['attachment'] = 'attachment';
		}

		$sanitized['autogenerate'] = 'manual';

		if ( isset( $config['autogenerate'] ) ) {
			$sanitized['autogenerate'] = sanitize_key( $config['autogenerate'] );
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
	 * Sanitize boundary layer setting.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return string Boundary setting.
	 */
	private function sanitize_boundary( $layer ) {
		$boundary = 'absolute';

		if ( isset( $layer['boundary'] ) ) {
			$valid = array( 'absolute', 'vertically', 'horizontally', 'both' );

			if ( in_array( $layer['boundary'], $valid, true ) ) {
				$boundary = $layer['boundary'];
			}
		}

		return $boundary;
	}

	/**
	 * Show settings tab template.
	 */
	private function show_settings_section() {
		$tab = $this->get_current_tab();

		if ( null === $tab ) {
			return;
		}

		include_once SHARING_IMAGE_DIR . "templates/{$tab}.php";
	}

	/**
	 * Show settings messages and errors after post actions.
	 */
	private function show_settings_message() {
		// phpcs:ignore WordPress.Security.NonceVerification
		$message = isset( $_GET['message'] ) ? absint( $_GET['message'] ) : 0;

		switch ( $message ) {
			case 1:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Settings successfully updated.', 'sharing-image' ), 'updated' );
				break;

			case 2:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Failed to save template settings.', 'sharing-image' ) );
				break;

			case 3:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Template successfully deleted.', 'sharing-image' ), 'updated' );
				break;

			case 4:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Failed to delete template.', 'sharing-image' ) );
				break;

			case 5:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Failed to save configuration settings.', 'sharing-image' ) );
				break;

			case 6:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Error uploading file. Please try again.', 'sharing-image' ) );
				break;

			case 7:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Imported file is empty.', 'sharing-image' ) );
				break;

			case 8:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'The maximum allowed limit of templates has been reached. Please upgrade to Premium.', 'sharing-image' ) );
				break;

			case 9:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Templates successfully imported.', 'sharing-image' ), 'updated' );
				break;

			case 10:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Failed to clone template.', 'sharing-image' ) );
				break;

			case 11:
				add_settings_error( 'sharing-image', 'sharing-image', __( 'Template successfully cloned.', 'sharing-image' ), 'updated' );
				break;
		}

		settings_errors( 'sharing-image' );
	}

	/**
	 * Set list of settings page tabs.
	 */
	private function init_tabs() {
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
		$this->tabs = apply_filters( 'sharing_image_settings_tabs', $tabs );
	}

	/**
	 * Print menu on settings page.
	 */
	private function show_settings_menu() {
		$current = $this->get_current_tab();

		foreach ( $this->tabs as $tab => $args ) {
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
	private function get_fonts() {
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
	private function get_preset_taxonomies() {
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
	private function get_tab_link( $tab ) {
		if ( empty( $this->tabs[ $tab ]['link'] ) ) {
			return admin_url( 'options-general.php?page=' . self::SETTINGS_SLUG );
		}

		return $this->tabs[ $tab ]['link'];
	}

	/**
	 * Get current tab.
	 *
	 * @return string|null Current tab name.
	 */
	private function get_current_tab() {
		// phpcs:disable WordPress.Security.NonceVerification
		if ( ! empty( $_GET['tab'] ) ) {
			$tab = sanitize_file_name( wp_unslash( $_GET['tab'] ) );

			if ( array_key_exists( $tab, $this->tabs ) ) {
				return $tab;
			}
		}
		// phpcs:enable WordPress.Security.NonceVerification

		return null;
	}

	/**
	 * Create upload directory and return its path and url
	 *
	 * @param string $storage Relative directory path.
	 *
	 * @return array Path and url to upload directory.
	 */
	private function create_upload_dir( $storage ) {
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

	/**
	 * Add message id to the back link and redirect
	 *
	 * @param string $redirect Redirect link.
	 * @param int    $message  Settings error message id.
	 */
	private function redirect_with_message( $redirect, $message ) {
		$redirect = add_query_arg( array( 'message' => $message ), $redirect );

		wp_safe_redirect( $redirect );
		exit;
	}

	/**
	 * Create unique template index.
	 *
	 * @return string New template index.
	 */
	private function create_unique_index() {
		$templates = $this->get_templates();

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
			return $this->create_unique_index();
		}

		return $index;
	}

	/**
	 * Check unique template index.
	 *
	 * @param string $index Unique template index to check.
	 *
	 * @return bool  Whether unique template index is correct.
	 */
	private function is_valid_unique_index( $index ) {
		$valid = preg_match( '~^[a-z0-9]{8}$~', $index );

		/**
		 * Filter wheter given unique index matching rule.
		 *
		 * @param bool   $valid Valid flag.
		 * @param string $index Template index.
		 */
		return apply_filters( 'sharing_image_valid_unique_index', $valid, $index );
	}

	/**
	 * Is current admin screen the plugin options screen.
	 *
	 * @return bool Whether the settings screen of this plugin is displayed or not.
	 */
	private function is_settings_screen() {
		$current_screen = get_current_screen();

		if ( $current_screen && self::SCREEN_ID === $current_screen->id ) {
			return true;
		}

		return false;
	}
}
