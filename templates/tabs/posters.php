<?php
/**
 * Sharing Image catalog settings tab
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>

<div class="sharing-image-posters">
	<?php
	settings_fields( self::GROUP_POSTERS );
	?>
</div>
