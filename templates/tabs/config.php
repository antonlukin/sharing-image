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

<div class="sharing-image-config">
	<?php
	do_settings_sections( self::GROUP_CONFIG );
	settings_fields( self::GROUP_CONFIG );
	submit_button();
	?>
</div>
