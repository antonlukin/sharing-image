<div id="meta-image-generate" class="meta-image-generate" data-ajaxurl='<?php echo admin_url('admin-ajax.php') ?>' data-post="<?php echo get_the_ID() ?>">
 	<?php
		$preview = get_post_meta(get_the_ID(), 'meta-image', true);
		$text = get_post_meta(get_the_ID(), 'meta-image-text', true);

		if(empty($text))
			$text = get_the_title();
	?> 

	<img class="meta-image-preview" src="<?php echo $preview; ?>" />

	<p>
		<textarea class="meta-image-text"><?php echo $text; ?></textarea>
	</p>
	
	<button class="meta-image-run button">Сгенерировать</button>
	<span class="spinner"></span>

	<div class="clear"></div>
</div>

