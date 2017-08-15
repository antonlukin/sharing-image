<?php

namespace SocialImage;

class Options {
	function __construct() {
		add_action('admin_menu', [$this, 'add_menu']);
	}

	public function add_menu() {
		add_options_page(__('Social Image options', 'social-image'), __('Social Image', 'social-image'), 'manage_options', 'social-image', [$this, 'show_page']);
	}

	public function show_page() {
 		include(plugin_dir_path(__DIR__) . "views/options.php");
	}
}
