<?php
/**
 * Plugin Name:       Sharing Image
 * Description:       Create sharing image for Facebook, VK.com, Telegram and other social networks
 * Version:           3.4
 * Requires at least: 5.3
 * Requires PHP:      5.6
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
define( 'SHARING_IMAGE_VERSION', '3.4' );

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
			'Sharing_Image\Settings',
			'Sharing_Image\Templates',
			'Sharing_Image\Config',
			'Sharing_Image\Premium',
			'Sharing_Image\Tools',
			'Sharing_Image\Demo',
			'Sharing_Image\Snippets',
			'Sharing_Image\Meta',
			'Sharing_Image\Widget',
			'Sharing_Image\Migrations',
		);

		/**
		 * Filters list of automatically initialized classes.
		 *
		 * @param array $classes List of classes.
		 */
		$classes = apply_filters( 'sharing_image_plugin_classes', $classes );

		foreach ( $classes as $class ) {
			$class::init();
		}

		include SHARING_IMAGE_DIR . 'functions.php';

		if ( file_exists( SHARING_IMAGE_DIR . 'premium.php' ) ) {
			include SHARING_IMAGE_DIR . 'premium.php';
		}
	}
}

add_action( 'plugins_loaded', 'sharing_image_plugin' );
