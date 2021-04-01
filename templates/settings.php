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
	<?php
		$this->show_settings_message();
	?>

	<div class="settings-error error hide-if-js">
		<p><?php esc_html_e( 'This page requires JavaScript. Enable it in your browser settings, please.', 'sharing-image' ); ?></p>
	</div>

	<header class="sharing-image-header">
		<h1><?php esc_html_e( 'Sharing Image', 'sharing-image' ); ?></h1>

		<nav class="sharing-image-menu">
		<?php
			$this->show_settings_menu();
		?>
		</nav>
	</header>

	<form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post">
	<?php
		$this->show_settings_section();
	?>
	</form>
</div>
