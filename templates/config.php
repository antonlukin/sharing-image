<?php
/**
 * Sharing Image config settings tab.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>

<div class="sharing-image-config">
	<h2><?php esc_html_e( 'Configuration', 'sharing-image' ); ?></h2>

	<div class="sharing-image-config-description">
		<p>
			<?php
			printf(
				// translators: Link to website.
				esc_html__( 'Read the detailed instructions for configuring the plugin on the plugin %s.', 'sharing-image' ),
				sprintf(
					'<a href="%s" target="_blank" rel="noopener">%s</a>',
					esc_attr( 'https://notset.org/sharing-image/' ),
					esc_html__( 'website', 'sharing-image' )
				),
			);
			?>

			<?php esc_html_e( 'If you are in doubt about the purpose of the settings, leave the default values.', 'sharing-image' ); ?>

			<?php
			printf(
				// translators: Link to support forum.
				esc_html__( 'Ask your question on the %s if you have any difficulties.', 'sharing-image' ),
				sprintf(
					'<a href="%s" target="_blank" rel="noopener">%s</a>',
					esc_attr( 'https://wordpress.org/support/plugin/sharing-image/' ),
					esc_html__( 'support forum', 'sharing-image' )
				),
			);
			?>

			<?php esc_html_e( 'We will try to help you as soon as possible.', 'sharing-image' ); ?>
		</p>
	</div>
</div>
