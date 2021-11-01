<?php
/**
 * Sharing Image premim settings tab.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

?>

<div class="sharing-image-premium">
	<h2><?php esc_html_e( 'Sharing Image Premium', 'sharing-image' ); ?></h2>

	<div class="sharing-image-premium-benefits">
		<p>
			<?php esc_html_e( 'The Premium version of the plugin adds new features and helps the product develop.', 'sharing-image' ); ?>
		</p>

		<p>
			<strong><?php esc_html_e( 'For this it is worth getting a Premium:', 'sharing-image' ); ?></strong>
		</p>

		<ul>
			<li>
				<?php esc_html_e( 'Use of several templates with the ability to quickly switch between them when generating.', 'sharing-image' ); ?>
			</li>
			<li>
				<?php esc_html_e( 'Generating posters in taxonomy archives.', 'sharing-image' ); ?>
			</li>
			<li>
				<?php esc_html_e( 'Priority tech support.', 'sharing-image' ); ?>
			</li>
			<li>
				<?php esc_html_e( 'Adding new functionality at your request.', 'sharing-image' ); ?>
			</li>
		</ul>

		<p>
			<?php esc_html_e( 'To get the Premium version, you need to receive the license on the official website of the plugin.', 'sharing-image' ); ?>
			<?php esc_html_e( 'If you already have the key, activate it in the box below.', 'sharing-image' ); ?>
			<?php esc_html_e( 'Each key can be used up to 5 times on different sites.', 'sharing-image' ); ?>
		</p>

		<p>
			<a class="button button-primary" href="https://wpget.org/sharing-image/premium/" target="_blank" rel="noopener"><?php esc_html_e( 'Get Premium', 'sharing-image' ); ?></a>
		</p>
	</div>

	<div class="sharing-image-premium-gratitude">
		<p>
			<?php esc_html_e( 'You have successfully purchased Premium access to this plugin.', 'sharing-image' ); ?>
			<?php esc_html_e( 'Now you can take advantage of all the features of the plugin and priority support.', 'sharing-image' ); ?>
		</p>

		<p>
			<strong>
				<?php esc_html_e( 'Thank you for your support!', 'sharing-image' ); ?>
			</strong>
		</p>
	</div>

	<div class="sharing-image-premium-contacts">
		<p>
			<?php esc_html_e( 'Contact us if you have any problems with access or want to discuss individual conditions.', 'sharing-image' ); ?>

			<?php
			printf(
				// translators: Link to email.
				esc_html__( 'On all questions write on e-mail address: %s.', 'sharing-image' ),
				sprintf(
					'<a href="mailto:%1$s">%1$s</a>',
					esc_attr( 'support@wpget.org' )
				),
			);
			?>

			<?php esc_html_e( 'Attach the access key, if you have one.', 'sharing-image' ); ?>
			<?php esc_html_e( 'We will try to answer as soon as possible, but usually it takes no more than 3 days.', 'sharing-image' ); ?>

			<?php
			printf(
				// translators: Link to website.
				esc_html__( 'You can manage your licenses using a special %s.', 'sharing-image' ),
				sprintf(
					'<a href="%s" target="_blank" rel="noopener">%s</a>',
					esc_attr( 'https://wpget.org/sharing-image/licenses/' ),
					esc_html__( 'tool', 'sharing-image' )
				),
			);
			?>
		</p>
	</div>
</div>
