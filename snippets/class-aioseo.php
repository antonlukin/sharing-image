<?php
/**
 * AIOSEO Snippet class.
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
 * @class AIOSEO
 */
class AIOSEO {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'All in One SEO',
			'link'  => 'https://wordpress.org/plugins/all-in-one-seo-pack/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'AIOSEO_PHP_VERSION_DIR' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		add_filter( 'aioseo_facebook_tags', array( __CLASS__, 'update_facebook_tags' ), 11 );
		add_filter( 'aioseo_twitter_tags', array( __CLASS__, 'update_twitter_tags' ), 11 );
	}

	/**
	 * Remove Facebook image meta tags.
	 *
	 * @param array $meta List of Facebook meta.
	 */
	public static function update_facebook_tags( $meta ) {
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
	 * Remove Twitter image ,eta tags.
	 *
	 * @param array $meta List of Twitter meta.
	 */
	public static function update_twitter_tags( $meta ) {
		$poster = sharing_image_poster_src();

		if ( empty( $poster ) ) {
			return $meta;
		}

		$meta['twitter:image'] = $poster[0];

		return $meta;
	}
}
