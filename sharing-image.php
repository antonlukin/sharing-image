<?php
/**
 * Plugin Name:       Sharing Image
 * Description:       Create social sharing image for Facebook, VK.com, Telegram and other social networks
 * Version:           1.0
 * Plugin URI:        https://github.com/antonlukin/sharing-image
 * Author:            Anton Lukin
 * Author URI:        https://lukin.me
 * Text Domain:       sharing-image
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

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
define( 'SHARING_IMAGE_DIR', dirname( __FILE__ ) );

/**
 * Plugin dir url.
 */
define( 'SHARING_IMAGE_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

/**
 * Init plugin on plugin load.
 */
require_once constant( 'SHARING_IMAGE_DIR' ) . '/vendor/autoload.php';

global $sharing_image_plugin;
$sharing_image_plugin = new Core();



add_action( 'init', function() {
	wp_register_script(
		'plugin-sidebar-js',
		plugins_url( 'temp/plugin-sidebar.js', __FILE__ ),
		array( 'wp-plugins', 'wp-edit-post', 'wp-element' )
	);
} );

add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script( 'plugin-sidebar-js' );
} );