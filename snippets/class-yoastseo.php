<?php
/**
 * YoastSeo Snippet class.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image\Snippets;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * YoastSeo Snippet class.
 *
 * @class YoastSeo
 */
class YoastSeo {
	/**
	 * Get snippet name.
	 */
	public static function get_name() {
		$name = array(
			'title' => 'Yoast SEO',
			'link'  => 'https://wordpress.org/plugins/wordpress-seo/',
		);

		return $name;
	}

	/**
	 * Check if plugin is activated.
	 */
	public static function is_activated() {
		if ( defined( 'WPSEO_VERSION' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Init snippet filters.
	 */
	public static function init_filters() {
		add_filter( 'wpseo_frontend_presenter_classes', array( __CLASS__, 'update_presenters' ) );
		add_filter( 'sharing_image_show_header', '__return_true' );
	}

	/**
	 * Update presenters.
	 *
	 * @param array $presenters Plugin presenters.
	 *
	 * @return array
	 */
	public static function update_presenters( $presenters ) {
		$removed = array(
			'Yoast\WP\SEO\Presenters\Open_Graph\Image_Presenter',
			'Yoast\WP\SEO\Presenters\Twitter\Image_Presenter',
		);

		$updated = array();

		foreach ( $presenters as $name ) {
			if ( ! in_array( $name, $removed, true ) ) {
				$updated[] = $name;
			}
		}

		return $updated;
	}
}
