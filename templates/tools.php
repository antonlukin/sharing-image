<?php
/**
 * Sharing Image tools settings tab.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>

<div class="sharing-image-tools">
	<h2><?php esc_html_e( 'Tools', 'sharing-image' ); ?></h2>

	<div class="sharing-image-tools-description">
		<p>
			<?php esc_html_e( 'Use this tools page to import and export templates.', 'sharing-image' ); ?>
			<?php esc_html_e( 'Please note that importing new templates does not delete existing ones.', 'sharing-image' ); ?>
			<?php esc_html_e( 'You can also clone the template to reuse it with new settings.', 'sharing-image' ); ?>
		</p>
	</div>
</div>
