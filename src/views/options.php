<div class="wrap" id="social-image-options">
	<?php settings_errors(); ?>

	<div class="social-image__catalog" style="display: none;">
		<h1 class="wp-heading-inline">
			<?php _e('Social Image Settings', 'social-image') ?>
			<span class="title-count theme-count">0</span>
		</h1>

		<a href="#add-scheme" class="page-title-action" role="button"><?php _e('Add new scheme', 'social-image') ?></a>

		<hr class="wp-header-end">

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

	<div class="social-image__adjust">
 		<h1 class="wp-heading-inline">
			<ul class="social-image__breadcrumbs">
				<li><a href="#catalog"><?php _e('Schemes', 'social-image') ?></a></li>
				<li>Primary</li>
			</ul>
		</h1>

		<a href="#add-scheme" class="page-title-action" role="button"><?php _e('Add new scheme', 'social-image') ?></a>

		<hr class="wp-header-end">

		<div class="social-image__preview">
			<img class="social-image__preview-image" src="https://unsplash.it/512/256" />

			<span class="social-image__preview-caption"><?php _e('Audo-updated social image preview', 'social-image') ?></span>
		</div>

		<form class="social-image__form" method="post" action="options.php">
 			<h2><?php _e('Basic settings', 'social-image') ?></h2>

			<table class="form-table">
			<tr>
				<th scope="row"><?php _e('Image size', 'social-image') ?></th>
				<td class="social-image__form-stretch">
					<label for="social-image-form-width"><?php _e('Width', 'social-image') ?></label>
					<input name="social-image-form-width" type="number" step="1" min="0" id="social-image-form-width" value="" class="small-text">

 					<label for="social-image-form-height"><?php _e('Height', 'social-image') ?></label>
					<input name="social-image-form-height" type="number" step="1" min="0" id="social-image-form-height" value="" class="small-text">

					<p class="description"><?php _e('In pixels. Recommended: 1024x512') ?></p>
				</td>
			</tr>

 			<tr>
				<th scope="row"><?php _e('Cover source', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<select name="social-image-form-cover" id="social-image-form-cover">
						<option value="thumbnail" selected="selected"><?php _e('Post thumbnail', 'social-image') ?></option>
 						<option value="color"><?php _e('Single color', 'social-image') ?></option>
 						<option value="pattern"><?php _e('Pattern', 'social-image') ?></option>
					</select>
				</td>
			</tr>

			<tr>
				<th scope="row"><?php _e('File extension', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<select name="social-image-form-extension" id="social-image-form-extension">
						<option value="jpg" selected="selected">.jpg</option>
 						<option value="png">.png</option>
 						<option value="gif">.gif</option>
					</select>
				</td>
			</tr>

 			<tr>
				<th scope="row"><?php _e('Path to save', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<input type="text" value="wp-content/uploads/social-image/">
					<p class="description"><?php _e('Directory must be writeable') ?></p>
				</td>
			</tr>

			</table>

			<?php submit_button() ?>
		</form>

	</div>

	<div class="clear"></div>
<?php /*
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
