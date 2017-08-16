<div class="wrap" id="social-image-options">
	<?php settings_errors(); ?>

	<h1 class="wp-heading-inline">
		<ul class="social-image__breadcrumbs">
			<li><?php _e('Social Image Settings', 'social-image') ?></li>
			<li><a href="#catalog"><?php _e('Schemes', 'social-image') ?></a></li>
			<li>Primary</li>
		</ul>
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

	<div class="social-image__adjust social-image--hide">
		<div class="social-image__preview">
			<figure class="social-image__preview-figure">
				<img class="social-image__preview-image" src="https://unsplash.it/512/256" />

				<span class="social-image__preview-caption"><?php _e('Audo-updated social image preview', 'social-image') ?></span>
			</figure>
		</div>

		<form class="social-image__form" method="post" action="options.php">
 			<h2><?php _e('Basic settings', 'social-image') ?></h2>

			<table class="form-table">
			<tr>
				<th scope="row"><?php _e('Image size', 'social-image') ?></th>
				<td class="social-image__form-stretch">
					<p>
						<label for="social-image-form-width"><?php _e('Width', 'social-image') ?></label>
						<input name="social-image-form-width" type="number" step="1" min="0" id="social-image-form-width" value="" class="small-text">
					</p>

					<p>
						<label for="social-image-form-height"><?php _e('Height', 'social-image') ?></label>
						<input name="social-image-form-height" type="number" step="1" min="0" id="social-image-form-height" value="" class="small-text">
					</p>

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

			<hr>

 			<h2><?php _e('Logo settings', 'social-image') ?></h2>

			<table class="form-table">
			<tr>
				<th scope="row"><?php _e('Type', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<select name="social-image-logo-type" id="social-image-logo-type">
						<option value="image" selected="selected"><?php _e('Image', 'social-image') ?></option>
 						<option value="text"><?php _e('Text', 'social-image') ?></option>
					</select>
				</td>
			</tr>

			<tr>
				<th scope="row"><?php _e('Position', 'social-image') ?></th>
				<td class="social-image__form-stretch">
					<p>
						<label for="social-image-logo-top"><?php _e('Top', 'social-image') ?></label>
						<input name="social-image-logo-top" type="number" step="1" min="0" id="social-image-logo-top" value="" class="small-text">
					</p>

					<p>
						<label for="social-image-logo-left"><?php _e('Left', 'social-image') ?></label>
						<input name="social-image-logo-left" type="number" step="1" min="0" id="social-image-logo-left" value="" class="small-text">
					</p>
				</td>
			</tr>

 			<tr>
				<th scope="row"><?php _e('Path to save', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<input id="upload_image_button" type="button" class="button" value="<?php _e('Upload logo', 'social-image'); ?>" />
					<input type="hidden" name="image_attachment_id" id="image_attachment_id" value="">
				</td>
			</tr>
			</table>

			<hr>

			<h2><?php _e('Caption settings', 'social-image') ?></h2>

			<table class="form-table">
			<tr>
				<th scope="row"><?php _e('Type', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<select name="social-image-logo-type" id="social-image-logo-type">
						<option value="image" selected="selected"><?php _e('Image', 'social-image') ?></option>
 						<option value="text"><?php _e('Text', 'social-image') ?></option>
					</select>
				</td>
			</tr>

			<tr>
				<th scope="row"><?php _e('Position', 'social-image') ?></th>
				<td class="social-image__form-stretch">
					<p>
						<label for="social-image-logo-top"><?php _e('Top', 'social-image') ?></label>
						<input name="social-image-logo-top" type="number" step="1" min="0" id="social-image-logo-top" value="" class="small-text">
					</p>

					<p>
						<label for="social-image-logo-left"><?php _e('Left', 'social-image') ?></label>
						<input name="social-image-logo-left" type="number" step="1" min="0" id="social-image-logo-left" value="" class="small-text">
					</p>
				</td>
			</tr>

 			<tr>
				<th scope="row"><?php _e('Path to save', 'social-image') ?></th>
				<td class="social-image__form-regular">
					<input id="upload_image_button" type="button" class="button" value="<?php _e('Upload logo', 'social-image'); ?>" />
					<input type="hidden" name="image_attachment_id" id="image_attachment_id" value="">
				</td>
			</tr>
			</table>

			<?php submit_button() ?>
		</form>

	 	<div class="clear"></div>

	</div>
</div>
