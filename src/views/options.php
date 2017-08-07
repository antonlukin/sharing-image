<div class="wrap" id="social-image-options">
	<h1 class="wp-heading-inline">
		<?php _e('Social Image Settings', 'social-image') ?>
		<span class="title-count theme-count">0</span>
	</h1>

	<a href="#add-scheme" class="page-title-action" role="button"><?php _e('Add new scheme', 'social-image') ?></a>

	<hr class="wp-header-end">

	<div class="social-image__catalog">
		<div class="social-image__item">
			<img class="social-image__item-image" src="https://unsplash.it/400/200" alt="" />

			<h3 class="social-image__item-title">Primary</h3>
			<button class="button button-primary"><?php _e('Customize', 'social-image') ?></button>
		</div>

 		<div class="social-image__item">
			<img class="social-image__item-image" src="https://unsplash.it/400/200" alt="" />

			<h3 class="social-image__item-title">Sol fucking long title for test</h3>
			<button class="button button-primary"><?php _e('Customize', 'social-image') ?></button>
		</div>

		<a class="social-image__item social-image__item--new" href="#add-scheme" role="button">
			<h3 class="social-image__item-holder">
				<span class="dashicons dashicons-plus"></span>

				<?php _e('Add new scheme', 'social-image') ?>
			</h3>
		</a>
	</div>
<?php /*
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
 */ ?>
</div>
