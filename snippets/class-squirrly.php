<?php
/**
 * Squirrly Snippet class.
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
 * @class Squirrly
 */
class Squirrly {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'Squirrly SEO',
			'link'  => 'https://wordpress.org/plugins/squirrly-seo/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'SQ_VERSION' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		add_filter( 'sq_open_graph', array( __CLASS__, 'update_og_meta' ), 11 );
		add_filter( 'sq_twitter_card', array( __CLASS__, 'update_twitter_meta' ), 11 );

		add_filter( 'sharing_image_show_header', '__return_false' );
	}

	/**
	 * Update og meta.
	 *
	 * @param array $meta Header meta list.
	 */
	public static function update_og_meta( $meta ) {
		$poster = sharing_image_poster_src();

		if ( empty( $poster ) ) {
			return $meta;
		}

		$meta['og:image']        = $poster[0];
		$meta['og:image:width']  = $poster[1];
		$meta['og:image:height'] = $poster[2];

		unset( $meta['og:image:type'] );
		unset( $meta['og:image:secure_url'] );

		return $meta;
	}

	/**
	 * Update twitter meta.
	 *
	 * @param array $meta Header meta list.
	 */
	public static function update_twitter_meta( $meta ) {
		$poster = sharing_image_poster_src();

		if ( empty( $poster ) ) {
			return $meta;
		}

		$meta['twitter:image'] = $poster[0];

		return $meta;
	}
}
