<?php

namespace SocialImage;

class MetaBox {
	function __construct() {
		add_action('add_meta_boxes', [$this, 'add_box']);
	}

	public function add_box() {
		add_meta_box('social-image-box', __('Social sharing image', 'social-image'), [$this, 'display_box'], null, 'side', 'low');
	}

	public function display_box() {
		include(plugin_dir_path(__DIR__) . "views/metabox.php");
	}
}
