<?php
/**
 * Create demo template on plugin init.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Demo class.
 *
 * @class Demo
 */
class Demo {
	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'load-settings_page_' . Settings::SETTINGS_SLUG, array( __CLASS__, 'create_demo_template' ) );
	}

	/**
	 * Create demo template after plugin activation.
	 */
	public static function create_demo_template() {
		$config = Config::get_config();

		// phpcs:ignore WordPress.Security.NonceVerification
		if ( ! empty( $config['demo'] ) && ! isset( $_REQUEST['demo-template'] ) ) {
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
			$index  = Templates::create_unique_index();
			$editor = Templates::sanitize_editor( $template );

			// Prepare template editor.
			$editor = Generator::prepare_template( $editor, null, $index );

			if ( ! Generator::check_required( $editor ) ) {
				continue;
			}

			list( $path, $url ) = Generator::get_upload_file();

			$poster = Generator::create_poster( $editor, $path );

			if ( ! is_wp_error( $poster ) ) {
				$editor['preview'] = $url;
			}

			Templates::update_templates( $index, $editor );
		}

		$config['demo'] = 1;

		Config::update_config( $config );
	}
}
