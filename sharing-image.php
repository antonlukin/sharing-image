<?php
/**
 * Plugin Name:       Sharing Image
 * Description:       Create sharing image for Facebook, VK.com, Telegram and other social networks
 * Version:           2.0.6
 * Requires at least: 5.3
 * Requires PHP:      5.5
 * Plugin URI:        https://wpset.org/sharing-image/
 * Author:            Anton Lukin
 * Author URI:        https://wpset.org/
 * Text Domain:       sharing-image
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

/**
 * If this file is called directly, abort.
 */
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Plugin version.
 */
define( 'SHARING_IMAGE_VERSION', '2.0.6' );

/**
 * Main plugin file.
 */
define( 'SHARING_IMAGE_FILE', __FILE__ );

/**
 * Shortcut constant to the path of this file.
 */
define( 'SHARING_IMAGE_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Plugin dir url.
 */
define( 'SHARING_IMAGE_URL', plugin_dir_url( __FILE__ ) );

if ( ! function_exists( 'sharing_image_plugin' ) ) {
	/**
	 * Run main plugin function.
	 */
	function sharing_image_plugin() {
		require_once SHARING_IMAGE_DIR . 'vendor/autoload.php';

		$classes = array(
			'Sharing_Image\Meta',
			'Sharing_Image\Settings',
			'Sharing_Image\Widget',
		);

		/**
		 * Filters list of automatically initialized classes.
		 *
		 * @param array $classes List of classes.
		 */
		$classes = apply_filters( 'sharing_image_plugin_classes', $classes );

		foreach ( $classes as $class ) {
			( new $class() )->init();
		}

		include SHARING_IMAGE_DIR . 'functions.php';
	}
}

add_action( 'plugins_loaded', 'sharing_image_plugin' );
