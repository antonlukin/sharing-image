<?php
/**
 * Meta class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Meta class
 *
 * @class Meta
 */
class Meta {
	/**
	 * The instance of Settings class.
	 *
	 * @var instance
	 */
	private $settings;

	/**
	 * Widget constructor.
	 */
	public function __construct() {
		$this->settings = new Settings();
	}

	/**
	 * Init class actions and filters.
	 */
	public function init() {
		add_action( 'wp_head', array( $this, 'show_header' ) );
	}

	/**
	 * Print poster image meta tags.
	 */
	public function show_header() {
		/**
		 * Easy way to hide poster meta.
		 *
		 * @param bool $hide_meta Set true to hide poster meta.
		 */
		$hide_meta = apply_filters( 'sharing_image_hide_meta', false );

		if ( $hide_meta ) {
			return;
		}

		$poster = $this->get_poster_src();

		if ( false === $poster ) {
			return;
		}

		list( $image, $width, $height ) = $poster;

		printf(
			'<meta property="og:image" content="%s">' . PHP_EOL,
			esc_url( $image )
		);

		printf(
			'<meta property="og:image:width" content="%s">' . PHP_EOL,
			esc_attr( $width )
		);

		printf(
			'<meta property="og:image:height" content="%s">' . PHP_EOL,
			esc_attr( $height )
		);

		/**
		 * Hide twitter meta tags.
		 *
		 * @since 2.0.12
		 *
		 * @param bool $hide_twitter_meta Set true to hide poster meta.
		 */
		$hide_twitter_meta = apply_filters( 'sharing_image_hide_twitter_meta', false );

		if ( $hide_twitter_meta ) {
			return;
		}

		print(
			'<meta name="twitter:card" content="summary_large_image">' . PHP_EOL
		);

		printf(
			'<meta name="twitter:image" content="%s">' . PHP_EOL,
			esc_url( $image )
		);
	}

	/**
	 * Public method to get Sharing Image poster.
	 *
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.

	 * @return string Url to poster.
	 */
	public function get_poster( $object_id = null, $object_type = null ) {
		$poster = $this->get_poster_src( $object_id, $object_type );

		if ( ! isset( $poster[0] ) ) {
			return null;
		}

		return $poster[0];
	}

	/**
	 * Public method to get Sharing Image poster url, width and height.
	 *
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.

	 * @return array|false Poster image, width and height data or false if undefined.
	 */
	public function get_poster_src( $object_id = null, $object_type = null ) {
		$poster = $this->get_widget_poster_src( $object_id, $object_type );

		if ( false === $poster ) {
			$poster = $this->settings->get_default_poster_src();
		}

		/**
		 * Filters default template image data.
		 *
		 * @param array|false $image     List of image data, or boolean false if no image is available.
		 * @param int         $object_id Post ID or Taxonomy term ID.
		 */
		return apply_filters( 'sharing_image_poster_src', $poster, $object_id );
	}

	/**
	 * Get post or term meta Sharing Image poster data.
	 *
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.

	 * @return array|false Widget poster image, width and height data or false if undefined.
	 */
	public function get_widget_poster_src( $object_id = null, $object_type = null ) {
		$meta = array();

		if ( 'singular' !== $object_type && 'taxonomy' !== $object_type ) {
			$object_type = null;
		}

		if ( is_null( $object_type ) && is_singular() ) {
			$object_type = 'singular';
		}

		if ( is_null( $object_type ) && ( is_category() || is_tag() || is_tax() ) ) {
			$object_type = 'taxonomy';
		}

		if ( 'singular' === $object_type ) {
			$meta = $this->get_singular_poster_meta( $object_id );
		}

		if ( 'taxonomy' === $object_type ) {
			$meta = $this->get_taxonomy_poster_meta( $object_id );
		}

		$poster = false;

		if ( is_array( $meta ) ) {
			$meta = wp_array_slice_assoc( $meta, array( 'poster', 'width', 'height' ) );

			if ( 3 === count( $meta ) ) {
				$poster = array_values( $meta );
			}
		}

		return $poster;
	}

	/**
	 * Get singular template poster meta.
	 *
	 * @param int $post_id Optional. Post ID.

	 * @return array|false Singular poster meta. False if undefined.
	 */
	private function get_singular_poster_meta( $post_id = null ) {
		$post = get_post( $post_id );

		if ( isset( $post->ID ) ) {
			$post_id = $post->ID;
		}

		$meta = get_post_meta( $post_id, Widget::META_SOURCE, true );

		/**
		 * Filters singular template poster data.
		 *
		 * @param array|false $meta    Singular poster meta.
		 * @param int         $post_id Post ID.
		 */
		return apply_filters( 'sharing_image_singular_poster_meta', $meta, $post_id );
	}

	/**
	 * Get taxonomy template poster data.
	 *
	 * @param int $term_id Optional. Term ID.

	 * @return array|false Taxonomy poster meta. False if undefined.
	 */
	private function get_taxonomy_poster_meta( $term_id = null ) {
		if ( ! $this->settings->is_premium_features() ) {
			return false;
		}

		if ( null === $term_id ) {
			$term_id = get_queried_object_id();
		}

		// Get term meta using Widget meta name const.
		$meta = get_term_meta( $term_id, Widget::META_SOURCE, true );

		/**
		 * Filters taxonomy template poster data.
		 *
		 * @param array $meta    Term poster image meta.
		 * @param int   $post_id Term ID.
		 */
		return apply_filters( 'sharing_image_taxonomy_poster_meta', $meta, $term_id );
	}
}
