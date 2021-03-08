<?php
/**
 * Sharing Image general settings tab
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>

<form class="sharing-image-config" action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="post">
	<?php
	do_settings_sections( self::GROUP_CONFIG );
	settings_fields( self::GROUP_CONFIG );
	submit_button();
	?>
</form>
