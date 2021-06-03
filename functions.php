<?php
/**
 * Templates plugin functions
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! function_exists( 'sharing_image_poster' ) ) {
	/**
	 * Public function to get Sharing Image poster url.
	 *
	 * @param int $object_id Optional. Post ID or Taxonomy term ID.
	 */
	function sharing_image_poster( $object_id = null ) {
		return ( new Sharing_Image\Meta() )->get_poster( $object_id );
	}
}


if ( ! function_exists( 'sharing_image_poster_src' ) ) {
	/**
	 * Public function to get Sharing Image poster data.
	 * Return image url, width and height.
	 *
	 * @param int $object_id Optional. Post ID or Taxonomy term ID.
	 */
	function sharing_image_poster_src( $object_id = null ) {
		return ( new Sharing_Image\Meta() )->get_poster_src( $object_id );
	}
}
