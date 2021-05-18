<?php
/**
 * Sharing Image widget template.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>

<div class="sharing-image-widget">
	<div class="hide-if-js">
		<p><?php esc_html_e( 'This widget requires JavaScript. Enable it in your browser settings, please.', 'sharing-image' ); ?></p>
	</div>
</div>
