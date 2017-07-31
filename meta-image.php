<?php
/**
 *
 * @link              https://lukin.me
 * @since             1.1
 *
 * @wordpress-plugin
 * Plugin Name:       [НОЖ] Генератор картинок для соцсетей
 * Description:       Позволяет генерировать к постам картинки которые будут расшарены в соцсетях
 * Version:           1.0
 * Author:            Anton Lukin
 * Author URI:        https://lukin.me
 */

if (!defined('WPINC')) {
	die;
}      


require_once(__DIR__ . '/vendor/autoload.php');


add_action('init', function() {
	$generator = new MetaImage\Generator;
 	$metabox = new MetaImage\MetaBox; 
});
