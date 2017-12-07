<?php
/**
 *
 * @link              https://lukin.me/meta-image
 * @since             1.0
 *
 * @wordpress-plugin
 * Plugin Name:       Social Image
 * Description:       Create social sharing image for Facebook, VK.com, Telegram and other social networks
 * Version:           1.0
 * Plugin URI:        https://github.com/antonlukin/social-image
 * Author:            Anton Lukin
 * Author URI:        https://lukin.me
 * Text Domain:       social-image
 */

if (!defined('WPINC')) {
	die;
}

require_once(__DIR__ . '/vendor/autoload.php');

add_action('init', function() {
	load_plugin_textdomain('social-image', false, basename(__DIR__) . '/lang');

	new SocialImage\Core;
});
