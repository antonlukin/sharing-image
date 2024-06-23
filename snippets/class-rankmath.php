<?php
/**
 * RankMath Snippet class.
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
 * @class RankMath
 */
class RankMath {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'Rank Math SEO',
			'link'  => 'https://wordpress.org/plugins/seo-by-rank-math/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'RANK_MATH_VERSION' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		foreach ( array( 'facebook', 'twitter' ) as $network ) {
			add_filter( "rank_math/opengraph/{$network}/image_array", array( __CLASS__, 'update_image_array' ) );
		}

		add_filter( 'sharing_image_show_header', '__return_false' );
	}

	/**
	 * Update image array.
	 *
	 * @param array $attachment Image array data.
	 */
	public static function update_image_array( $attachment ) {
		$poster = sharing_image_poster_src();

		if ( empty( $poster ) ) {
			return $attachment;
		}

		if ( empty( $attachment ) ) {
			$attachment = array();
		}

		$attachment['id']     = 0;
		$attachment['url']    = $poster[0];
		$attachment['width']  = $poster[1];
		$attachment['height'] = $poster[2];

		return $attachment;
	}
}
