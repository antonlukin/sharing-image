<?php

namespace SocialImage;

class Core {
	function __construct() {
		// Init Image Generator class
		new Generator;

		// Init Options page and handler
		new Options;

		// Init Metabox widget and handler
		new MetaBox;

		// Load language
		load_plugin_textdomain('social-image', false, basename(__DIR__) . '/lang');

		// Add plugin's scripts and styles to admin pages
		add_action('admin_enqueue_scripts', [$this, 'add_assets']);
	}

	public function add_assets($hook) {
		$options = [
			'choose' => __('Choose image for social sharing', 'social-image')
		];

		wp_enqueue_script('social-image', plugins_url("assets/social-image.js", dirname(__DIR__)), ['jquery'], '0.2');
 		wp_enqueue_style('social-image', plugins_url("assets/social-image.css", dirname(__DIR__)), [], '0.2');

		wp_localize_script('social-image', 'social_image_options', $options);
	}
}
