<div id="social-image-metabox" class="social-image__metabox" data-ajaxurl='<?php echo admin_url('admin-ajax.php') ?>' data-post="<?php echo get_the_ID() ?>">
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

	<div class="social-image__top">
		<div class="social-image__error"></div>

		<button class="social-image__library button"><?php _e('Choose from library', 'social-image') ?></button>

		<p class="social-image__fullsize">
			<img class="social-image__preview" src="<?php echo $preview; ?>" />
			<span class="social-image__search dashicons-before dashicons-search"></span>
		</p>
	</div>

	<?php if(empty($thumbnail)) : ?>

	<p class="social-image__empty howto">
		<?php echo __('To generate social image, you must first add post thumbnail and update the post', 'social-image') ?>
	</p>

	<?php else: ?>

	<p>
		<textarea class="social-image__text"><?php echo $options['text'] ?></textarea>
	</p>

	<div class="social-image__options">
		<div class="social-image__option">
			<label class="social-image__label" for="social-image-brightness"><?php _e('Brightness', 'social-image') ?></label>
			<input class="social-image__brightness social-image__input" id="social-image-brightness" value="<?php echo $options['brightness'] ?>" />
		</div>

		<div class="social-image__option">
			<label class="social-image__label" for="social-image-contrast"><?php _e('Contrast', 'social-image') ?></label>
			<input class="social-image__contrast social-image__input" id="social-image-contrast" value="<?php echo $options['contrast'] ?>" />
		</div>
	</div>


	<div class="social-image__manage">
		<button class="social-image__run button"><?php _e('Generate', 'social-image') ?></button>

		<a class="<?= empty($preview) ? 'social-image__delete' : 'social-image__delete is-active' ?>" href="#delete"><?php _e('Delete', 'social-image') ?></a>
		<span class="spinner"></span>

		<div class="clear"></div>
	</div>
	<?php endif; ?>
</div>

