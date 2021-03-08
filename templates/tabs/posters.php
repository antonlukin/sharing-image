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

<form class="sharing-image-posters" action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="post">
	<?php
	settings_fields( self::GROUP_POSTERS );
	$this->print_posters_form();
	?>
</form>
