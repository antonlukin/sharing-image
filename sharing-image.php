<?php
/**
 * Plugin Name:       Sharing Image
 * Description:       Create social sharing image for Facebook, VK.com, Telegram and other social networks
 * Version:           1.0
 * Requires at least: 5.0
 * Requires PHP:      5.5
 * Plugin URI:        https://github.com/antonlukin/sharing-image
 * Author:            Anton Lukin
 * Author URI:        https://lukin.me
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
define( 'SHARING_IMAGE_VERSION', '0.1.0' );

/**
 * Plugin admin menu slug.
 */
define( 'SHARING_IMAGE_SLUG', 'sharing-image' );

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

/**
 * Run plugin function.
 */
function sharing_image_plugin() {
	require_once SHARING_IMAGE_DIR . 'vendor/autoload.php';

	$classes = array( 'Sharing_Image\Widget', 'Sharing_Image\Settings' );

	foreach ( $classes as $class ) {
		( new $class() )->init();
	}
}

add_action( 'plugins_loaded', 'sharing_image_plugin' );
