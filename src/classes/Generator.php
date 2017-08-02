<?php

namespace MetaImage;

use Intervention\Image\ImageManager;

class Generator {
	function __construct() {
		add_action('wp_ajax_meta_image_generate', [$this, 'generate']);
		add_action('wp_ajax_meta_image_library', [$this, 'library']);  
 		add_action('wp_ajax_meta_image_delete', [$this, 'delete']); 
	}

	private function _save($image, $p) {
		try {
			$upload = wp_upload_dir();

			if(!is_dir($upload['basedir'] . '/meta-image/'))
				mkdir($upload['basedir'] . '/meta-image/');

			$file = "/meta-image/{$p['post']}-" . time() . '.jpg';

			$dir = $upload['basedir'] . $file;
			$url = $upload['baseurl'] . $file;

			$image->save($dir);                     

			$options = [
				'text' => $p['text'],
				'contrast' => $p['contrast'],
				'brightness' => $p['brightness']
			];

			update_post_meta($p['post'], 'meta-image', $url);
 			update_post_meta($p['post'], 'meta-image-options', serialize($options));

			wp_send_json_success($url);
		}

		catch(Exception $e) {
			wp_send_json_error(__('Image save error', 'meta-image')); 
		}
	}

	private function _text($image, $params) {
		extract($params);

		$image->text($text, $posx, $posy, function ($font) use ($file, $size, $color) {
			$font->file($file);
			$font->size($size);
			$font->color($color);
		});    

		return $image;
	}

	private function _image($p) {
		$im = new ImageManager(array('driver' => 'gd'));  

		$thumbnail = get_attached_file(get_post_thumbnail_id($p['post']));

		if(empty($thumbnail))
 			wp_send_json_error(__('Post thumbnail not found', 'meta-image')); 
		
 		try {
			$image = $im->make($thumbnail);

			$image->resize(1024, null, function ($constraint) {
                $constraint->aspectRatio();
            });

			$image->crop(1024, 512);   
			$image->contrast($p['contrast']);
			$image->brightness($p['brightness']);  

			$logo = [
				"text" => "knife.media",
				"posx" => 45,
				"posy" => 70,
				"file" => plugin_dir_path(__DIR__) . "fonts/gerbera.ttf",
				"size" => 29,
				"color" => "#ffffff"
			];

			$image = $this->_text($image, $logo);

			$text = [
				"text" => wordwrap($p['text'], 1024 / 20),
				"posx" => 45,
				"posy" => 165,
				"file" => plugin_dir_path(__DIR__) . "fonts/garamond-medium.ttf",
				"size" => 67,
				"color" => "#ffffff"
			];

			$image = $this->_text($image, $text);
		}
		catch(Exception $e) {
			wp_send_json_error(__('Image process error', 'meta-image'));
		}

		return $image;
	}

	public function generate() {
		$p = [
			'post' => intval($_POST['post']),
			'text' => html_entity_decode($_POST['text']),
			'contrast' => intval($_POST['contrast']),
			'brightness' => intval($_POST['brightness'])
		];


		$image = $this->_image($p);

        return $this->_save($image, $p);
	}

	public function delete() {
		$post = intval($_POST['post']);

		if(delete_post_meta($post, 'meta-image'))
			wp_send_json_success('');

		wp_send_json_error(__('Cannot delete meta', 'meta-image'));
	}

	public function library() {
		$p = [
			'post' => intval($_POST['post']),
			'url' => $_POST['url']
		];

		if(update_post_meta($p['post'], 'meta-image', $p['url']))
			wp_send_json_success($p['url']);

		wp_send_json_error(__('Cannot update meta', 'meta-image'));
	}
}
