<?php
/**
 * Handle tools tab on settings page and provide static methods.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Tools class.
 *
 * @class Tools
 */
class Tools {
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
	 * Handle tools requests from admin-side.
	 */
	public static function handle_requests() {
		add_action( 'admin_post_sharing_image_save_config', array( __CLASS__, 'save_config_tab' ) );
		add_action( 'admin_post_sharing_image_export_templates', array( __CLASS__, 'export_templates' ) );
		add_action( 'admin_post_sharing_image_import_templates', array( __CLASS__, 'import_templates' ) );
		add_action( 'admin_post_sharing_image_clone_template', array( __CLASS__, 'clone_template' ) );
		add_action( 'admin_post_sharing_image_clear_templates', array( __CLASS__, 'clear_templates' ) );
	}

	/**
	 * Action to export templates.
	 */
	public static function export_templates() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to manage options for this site.', 'sharing-image' ) );
		}

		$templates = Templates::get_templates();

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
	public static function import_templates() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to manage options for this site.', 'sharing-image' ) );
		}

		if ( ! current_user_can( 'upload_files' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to upload files.', 'sharing-image' ) );
		}

		$redirect = Settings::get_tab_link( 'tools' );

		if ( empty( $_FILES['sharing_image_file']['tmp_name'] ) ) {
			Settings::redirect_with_message( $redirect, 6 );
		}

		if ( ! empty( $_FILES['sharing_image_file']['error'] ) ) {
			Settings::redirect_with_message( $redirect, 6 );
		}

		$file = sanitize_text_field( $_FILES['sharing_image_file']['tmp_name'] );

		// phpcs:ignore WordPress.WP.AlternativeFunctions
		$templates = file_get_contents( $file );
		$templates = json_decode( $templates, true );

		// Check if empty.
		if ( empty( $templates ) || ! is_array( $templates ) ) {
			Settings::redirect_with_message( $redirect, 7 );
		}

		foreach ( $templates as $index => $template ) {
			Templates::update_templates( $index, Templates::sanitize_editor( $template ) );
		}

		Settings::redirect_with_message( $redirect, 9 );
	}

	/**
	 * Action to clone template.
	 */
	public static function clone_template() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = Settings::get_tab_link( 'tools' );

		if ( ! isset( $_REQUEST['sharing_image_source'] ) ) {
			Settings::redirect_with_message( $redirect, 10 );
		}

		$index = sanitize_key( $_REQUEST['sharing_image_source'] );

		// Get all templates to find by index.
		$templates = Templates::get_templates();

		if ( ! isset( $templates[ $index ] ) ) {
			Settings::redirect_with_message( $redirect, 10 );
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

		if ( ! Templates::update_templates( Templates::create_unique_index(), $template ) ) {
			Settings::redirect_with_message( $redirect, 10 );
		}

		Settings::redirect_with_message( $redirect, 11 );
	}

	/**
	 * Action to clear templates data.
	 */
	public static function clear_templates() {
		check_admin_referer( Settings::SETTINGS_NONCE, 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you do not have permission to manage options for this site.', 'sharing-image' ) );
		}

		$redirect = Settings::get_tab_link( 'tools' );

		delete_metadata( 'post', null, Widget::META_SOURCE, '', true );
		delete_metadata( 'post', null, Widget::META_FIELDSET, '', true );

		delete_metadata( 'term', null, Widget::META_SOURCE, '', true );
		delete_metadata( 'term', null, Widget::META_FIELDSET, '', true );

		Settings::redirect_with_message( $redirect, 12 );
	}
}
