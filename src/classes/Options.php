<?php

namespace SocialImage;

class Options {
	function __construct() {
 		add_action('admin_enqueue_scripts', [$this, 'add_assets']);
		add_action('admin_menu', [$this, 'add_menu']);
	}

	public function add_menu() {
		add_options_page(__('Social Image options', 'social-image'), __('Social Image', 'social-image'), 'manage_options', 'social-image', [$this, 'show_page']);
	}

	public function show_page() {
 		include(plugin_dir_path(__DIR__) . "views/options.php");
	}

	public function add_assets($hook) {
 		if('settings_page_social-image' !== $hook )
			return;

 		wp_enqueue_style('social-image', plugins_url("assets/social-image.css", dirname(__DIR__)), [], '0.2');
	}
}
