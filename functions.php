<?php
/**
 * Templates plugin functions.
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
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.
	 */
	function sharing_image_poster( $object_id = null, $object_type = null ) {
		return ( new Sharing_Image\Meta() )->get_poster( $object_id, $object_type );
	}
}

if ( ! function_exists( 'sharing_image_poster_src' ) ) {
	/**
	 * Public function to get Sharing Image poster data.
	 * Return image url, width and height.
	 *
	 * @param int    $object_id   Optional. Post ID or Taxonomy term ID.
	 * @param string $object_type Optional. Requested meta type, can be singular or taxonomy.
	 *                            Default is determined by the type of the template in which it is called.
	 */
	function sharing_image_poster_src( $object_id = null, $object_type = null ) {
		return ( new Sharing_Image\Meta() )->get_poster_src( $object_id, $object_type );
	}
}
