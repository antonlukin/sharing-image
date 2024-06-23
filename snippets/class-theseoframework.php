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
		add_filter( 'the_seo_framework_meta_render_data', array( __CLASS__, 'update_render_data' ), 11 );
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

		foreach ( $tags as $key => &$tag ) {
			if ( empty( $tag['attributes'] ) ) {
				continue;
			}

			$attributes = $tag['attributes'];

			if ( isset( $attributes['property'] ) && 'og:image' === $attributes['property'] ) {
				unset( $tags[ $key ] );
			}

			if ( isset( $attributes['property'] ) && 'og:image:width' === $attributes['property'] ) {
				unset( $tags[ $key ] );
			}

			if ( isset( $attributes['property'] ) && 'og:image:height' === $attributes['property'] ) {
				unset( $tags[ $key ] );
			}

			if ( isset( $attributes['name'] ) && 'twitter:image' === $attributes['name'] ) {
				unset( $tags[ $key ] );
			}
		}

		return $tags;
	}
}
