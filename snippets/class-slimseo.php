<?php
/**
 * SlimSEO Snippet class.
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
 * @class SlimSEO
 */
class SlimSEO {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'Slim SEO',
			'link'  => 'https://wordpress.org/plugins/slim-seo/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'SLIM_SEO_VER' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		add_filter( 'slim_seo_open_graph_tags', array( __CLASS__, 'update_open_graph_tags' ), 11 );
		add_filter( 'slim_seo_twitter_card_image', '__return_empty_string', 11 );
	}

	/**
	 * Remove default open graph tags
	 *
	 * @param array $tags List of displayed tags.
	 */
	public static function update_open_graph_tags( $tags ) {
		return array_diff( $tags, array( 'og:image', 'og:image:width', 'og:image:height' ) );
	}
}
