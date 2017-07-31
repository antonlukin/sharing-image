<?php
/**
 *
 * @link              https://lukin.me/meta-image
 * @since             0.2
 *
 * @wordpress-plugin
 * Plugin Name:       Meta Image
 * Description:       Create social sharing image for Facebook, VK.com, Telegram and other social networks
 * Version:           0.2
 * Plugin URI:        https://lukin.me/meta-image	
 * Author:            Anton Lukin
 * Author URI:        https://lukin.me
 * Text Domain:       meta-image
 */

if (!defined('WPINC')) {
	die;
}      


require_once(__DIR__ . '/vendor/autoload.php');


add_action('init', function() {
	$generator = new MetaImage\Generator;
 	$metabox = new MetaImage\MetaBox; 
});
