<?php
/**
 * Optional file to set up settings for instant premium plugin build.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

if ( ! function_exists( 'sharing_image_instant_premium' ) ) :
	/**
	 * Update license for instant premium plugin versions
	 */
	function sharing_image_instant_premium() {
		$license = array(
			'premium' => 1,
			'instant' => 1,
		);

		return $license;
	}

	add_filter( 'sharing_image_get_license', 'sharing_image_instant_premium', 20 );
endif;
