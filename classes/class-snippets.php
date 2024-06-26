<?php
/**
 * Handle 3rd party plugin snippets.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Snippets class.
 *
 * @class Snippets
 */
class Snippets {
	/**
	 * Store list of plugin snippets.
	 *
	 * @var array
	 */
	private static $snippets = array();

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'init_snippets' ) );
	}

	/**
	 * Init plugin snippets.
	 */
	public static function init_snippets() {
		$list = array(
			'Sharing_Image\Snippets\YoastSeo'        => SHARING_IMAGE_DIR . 'snippets/class-yoastseo.php',
			'Sharing_Image\Snippets\RankMath'        => SHARING_IMAGE_DIR . 'snippets/class-rankmath.php',
			'Sharing_Image\Snippets\TheSEOFramework' => SHARING_IMAGE_DIR . 'snippets/class-theseoframework.php',
			'Sharing_Image\Snippets\Squirrly'        => SHARING_IMAGE_DIR . 'snippets/class-squirrly.php',
			'Sharing_Image\Snippets\SEOPress'        => SHARING_IMAGE_DIR . 'snippets/class-seopress.php',
			'Sharing_Image\Snippets\SlimSEO'         => SHARING_IMAGE_DIR . 'snippets/class-slimseo.php',
			'Sharing_Image\Snippets\AIOSEO'          => SHARING_IMAGE_DIR . 'snippets/class-aioseo.php',
		);

		/**
		 * Filter 3rd party plugin snippets list.
		 *
		 * @param array $snippets A key-value array with class name key and path to the file as value.
		 */
		$list = apply_filters( 'sharing_image_snippets', $list );

		foreach ( $list as $plugin_class => $path ) {
			include_once $path;

			if ( ! class_exists( $plugin_class ) ) {
				continue;
			}

			if ( ! $plugin_class::is_activated() ) {
				continue;
			}

			if ( Config::is_active_snippets() ) {
				$plugin_class::init_filters();
			}

			self::$snippets[] = $plugin_class::get_name();
		}
	}

	/**
	 * Get list of snippets plugins names and links.
	 *
	 * @return array List of snippets.
	 */
	public static function get_snippets() {
		/**
		 * Filters list of plugin snippets names.
		 *
		 * @since 3.0
		 *
		 * @param array $names List of snippets names.
		 */
		return apply_filters( 'sharing_image_get_snippets', self::$snippets );
	}
}
