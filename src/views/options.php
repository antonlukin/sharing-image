<div class="wrap" id="social-image-options">
	<h1><?php _e('Social Image Settings', 'social-image') ?>

	<h2><?php _e('Image preview', 'social-image') ?></h2>
	<p><?php _e('Adjust the image appearance using custom options', 'social-image') ?></p>

	<div class="social-image_wrapper">

	<form class="social-image__form" method="post" action="options.php">
		<?php settings_fields('social-image-settings') ?>
		<p>
			<strong><?php _e('Font family', 'social-image') ?></strong><br />
			<select name="social-image-font" value="<?php echo get_option('mailchimp_name'); ?>">
				<option>Open Sans</option>
				<option>Roboto</option>
				<option>Georgia</option>
			</select>
		</p>

		<?php submit_button(); ?>
	</form>

 	<figure class="social-image__preview">
		<img src="https://unsplash.it/512/256" />

		<caption class="social-image__preview-caption"><?php _e('Audo-updated social image preview', 'social-image') ?>
	</figure>
</div>
