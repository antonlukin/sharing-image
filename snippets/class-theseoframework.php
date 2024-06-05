<?php
/**
 * The SEO Framework Snippet class.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image\Snippets;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * The SEO Framework Snippet class.
 *
 * @class RankMath
 */
class TheSEOFramework {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'The SEO Framework',
			'link'  => 'https://wordpress.org/plugins/autodescription/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'THE_SEO_FRAMEWORK_VERSION' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		add_filter( 'the_seo_framework_meta_render_data', array( __CLASS__, 'update_render_data' ) );
	}

	/**
	 * Update rendered meta tags.
	 *
	 * @param array $tags List of rendered tags.
	 */
	public static function update_render_data( $tags ) {
		$post_id = the_seo_framework()->query()->get_the_real_id();

		$sharing_image = sharing_image_poster_src( $post_id );

		if ( empty( $sharing_image ) ) {
			return $tags;
		}

		foreach ( $tags as &$tag ) {
			if ( empty( $tag['attributes'] ) ) {
				continue;
			}

			$attributes = $tag['attributes'];

			if ( isset( $attributes['property'] ) && 'og:image' === $attributes['property'] ) {
				$tag['attributes']['content'] = $sharing_image[0];
			}

			if ( isset( $attributes['property'] ) && 'og:image:width' === $attributes['property'] ) {
				$tag['attributes']['content'] = $sharing_image[1];
			}

			if ( isset( $attributes['property'] ) && 'og:image:height' === $attributes['property'] ) {
				$tag['attributes']['content'] = $sharing_image[2];
			}

			if ( isset( $attributes['name'] ) && 'twitter:image' === $attributes['name'] ) {
				$tag['attributes']['content'] = $sharing_image[0];
			}
		}

		return $tags;
	}
}
