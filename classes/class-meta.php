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
		$poster = $this->get_poster_src();

		if ( false === $poster ) {
			return;
		}

		list( $image, $width, $height ) = $poster;

		printf(
			'<meta property="og:image" content="%s">' . "\n",
			esc_url( $image )
		);

		printf(
			'<meta property="og:image:width" content="%s">' . "\n",
			esc_attr( $width )
		);

		printf(
			'<meta property="og:image:height" content="%s">' . "\n",
			esc_attr( $height )
		);
	}

	/**
	 * Common method to get Sharing Image poster.
	 *
	 * @param int $object_id Optional. Post ID or Taxonomy term ID.
	 * @return string
	 */
	public function get_poster( $object_id = null ) {
		$poster = $this->get_poster_src( $object_id );

		if ( ! isset( $poster[0] ) ) {
			return null;
		}

		return $poster[0];
	}

	/**
	 * Common method to get Sharing Image poster url, width and height.
	 *
	 * @param int $object_id Optional. Post ID or Taxonomy term ID.
	 * @return array|false
	 */
	public function get_poster_src( $object_id = null ) {
		$poster = $this->get_widget_poster_src( $object_id );

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
	 * @param int $object_id Optional. Post ID or Taxonomy term ID.
	 * @return array|false
	 */
	public function get_widget_poster_src( $object_id = null ) {
		$meta = array();

		if ( is_singular() ) {
			$meta = $this->get_singular_poster_meta( $object_id );
		}

		if ( is_category() || is_tag() || is_tax() ) {
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
	 * @return array|false
	 */
	private function get_singular_poster_meta( $post_id = null ) {
		$post = get_post( $post_id );

		// Get post meta using Widget meta name const.
		$meta = get_post_meta( $post->ID, Widget::WIDGET_META, true );

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
	 * @return array
	 */
	private function get_taxonomy_poster_meta( $term_id = null ) {
		if ( ! $this->settings->is_premium_features() ) {
			return false;
		}

		if ( null === $term_id ) {
			$term_id = get_queried_object_id();
		}

		// Get term meta using Widget meta name const.
		$meta = get_term_meta( $term_id, Widget::WIDGET_META, true );

		/**
		 * Filters taxonomy template poster data.
		 *
		 * @param array $meta    Term poster image meta.
		 * @param int   $post_id Term ID.
		 */
		return apply_filters( 'sharing_image_taxonomy_poster_meta', $meta, $term_id );
	}
}
