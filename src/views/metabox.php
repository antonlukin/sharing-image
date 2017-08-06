<div id="social-image-metabox" data-ajaxurl='<?php echo admin_url('admin-ajax.php') ?>' data-post="<?php echo get_the_ID() ?>">
	<?php
		$preview = get_post_meta(get_the_ID(), 'social-image', true);
		$options = get_post_meta(get_the_ID(), 'social-image-options', true);

		$options = unserialize($options);

		if(!is_array($options))
			$options = ['brightness' => -30, 'contrast' => -30, 'text' => ''];

		if(empty($options['text']))
			$options['text'] = get_the_title();

		$thumbnail = get_attached_file(get_post_thumbnail_id(get_the_ID()));
	?>

	<div class="social-image__showcase">
		<div class="social-image__showcase-error" id="social-image-error"></div>

		<button class="button" id="social-image-library"><?php _e('Choose from library', 'social-image') ?></button>

		<p class="social-image__showcase-preview" id="social-image-preview">
			<img class="social-image__showcase-image" id="social-image-src" src="<?php echo $preview; ?>" />

			<span class="social-image__showcase-icon dashicons-before dashicons-search"></span>
		</p>
	</div>

	<?php if(empty($thumbnail)) : ?>

	<p class="social-image__howto howto">
		<?php echo __('To generate social image, you must first add post thumbnail and update the post', 'social-image') ?>
	</p>

	<?php else: ?>


	<div class="social-image__options">
		<p class="social-image__options-text">
			<textarea id="social-image-text"><?php echo $options['text'] ?></textarea>
		</p>

		<div class="social-image__options-setting">
			<label for="social-image-brightness"><?php _e('Brightness', 'social-image') ?></label>
			<input id="social-image-brightness" value="<?php echo $options['brightness'] ?>" />
		</div>

		<div class="social-image__options-setting">
			<label for="social-image-contrast"><?php _e('Contrast', 'social-image') ?></label>
			<input id="social-image-contrast" value="<?php echo $options['contrast'] ?>" />
		</div>
	</div>


	<div class="social-image__manage">
		<button class="social-image__manage-run button" id="social-image-run"><?php _e('Generate', 'social-image') ?></button>

		<a class="social-image__manage-delete<?= empty($preview) ? '' : ' is-active' ?>" id="social-image-delete" href="#delete"><?php _e('Delete', 'social-image') ?></a>
		<span class="spinner"></span>

		<div class="clear"></div>
	</div>
	<?php endif; ?>
</div>

