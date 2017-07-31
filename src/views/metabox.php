<div id="meta-image-generate" class="meta-image-generate" data-ajaxurl='<?php echo admin_url('admin-ajax.php') ?>' data-post="<?php echo get_the_ID() ?>">
 	<?php
		$preview = get_post_meta(get_the_ID(), 'meta-image', true);
		$options = get_post_meta(get_the_ID(), 'meta-image-options', true);

		$options = unserialize($options);

		if(!is_array($options))
			$options = ['brightness' => -30, 'contrast' => -30, 'text' => ''];

		if(empty($options['text']))
			$options['text'] = get_the_title();
	?> 

	<button class="meta-image-library button">Выбрать из библиотеки</button>

	<p class="meta-image-fullsize">
		<img class="meta-image-preview" src="<?php echo $preview; ?>" />
		<span class="meta-image-search dashicons-before dashicons-search"></span>
	</p>

	<p>
		<textarea class="meta-image-text"><?php echo $options['text'] ?></textarea>
	</p>


	<div class="meta-image-options">
		<div class="meta-image-option">
			<label class="meta-image-label" for="meta-image-brightness">Яркость</label>
			<input class="meta-image-brightness meta-image-input" id="meta-image-brightness" value="<?php echo $options['brightness'] ?>" />
		</div>

		<div class="meta-image-option">
			<label class="meta-image-label" for="meta-image-contrast">Контрастность</label> 
			<input class="meta-image-contrast meta-image-input" id="meta-image-contrast" value="<?php echo $options['contrast'] ?>" />
		</div> 
	</div>
	
	
	<div class="meta-image-manage">
		<button class="meta-image-run button">Сгенерировать</button>

		<a class="meta-image-delete" href="#delete">Удалить</a>
		<span class="spinner"></span>

		<div class="clear"></div>
	</div>
</div>

