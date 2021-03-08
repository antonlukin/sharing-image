<?php
/**
 * Sharing Image main settings template
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>
<div id="sharing-image-settings">
	<header class="sharing-image-header">
		<h1><?php esc_html_e( 'Sharing Image', 'sharing-image' ); ?></h1>

		<nav class="sharing-image-menu">
			<?php
				$this->show_settings_menu();
			?>
		</nav>
	</header>

	<div class="sharing-image-wrapper">
		<div class="sharing-image-error error hide-if-js">
			<p><?php esc_html_e( 'This page requires JavaScript. Enable it in your browser settings, please.', 'sharing-image' ); ?></p>
		</div>

		<?php
			$this->show_settings_tab();
		?>
	</div>
</div>
