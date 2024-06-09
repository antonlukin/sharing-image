<?php
/**
 * SEOPress Snippet class.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image\Snippets;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Snippet class.
 *
 * @class SEOPress
 */
class SEOPress {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'SEO Press',
			'link'  => 'https://wordpress.org/plugins/wp-seopress/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'SEOPRESS_VERSION' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		add_filter( 'seopress_social_og_thumb', '__return_empty_string', 11 );
		add_filter( 'seopress_social_twitter_card_thumb', '__return_empty_string', 11 );
		add_filter( 'sharing_image_show_header', '__return_true' );
	}
}
