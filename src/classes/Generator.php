<?php

namespace MetaImage;

use Intervention\Image\ImageManager;

class Generator {
	function __construct() {
		add_action('wp_ajax_meta_image_generate', [$this, 'generate']);
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

			update_post_meta($p['post'], 'meta-image', $url);
			update_post_meta($p['post'], 'meta-image-text', $p['text']);

			wp_send_json_success($url);
		}

		catch(Exception $e) {
			wp_send_json_error('Image save error'); 
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

		$thumb = get_attached_file(get_post_thumbnail_id($p['post']));
		
 		try {
			$image = $im->make($thumb);
			$image->resize(1024, 512);   
			$image->contrast(-30);
			$image->brightness(-30);  

			$logo = [
				"text" => "knife.media",
				"posx" => 40,
				"posy" => 75,
				"file" => plugin_dir_path(__DIR__) . "fonts/gerbera.ttf",
				"size" => 30,
				"color" => "#ffffff"
			];

			$image = $this->_text($image, $logo);

			$text = [
				"text" => wordwrap($p['text'], 1024 / 20),
				"posx" => 40,
				"posy" => 200,
				"file" => plugin_dir_path(__DIR__) . "fonts/garamond-medium.ttf",
				"size" => 60,
				"color" => "#ffffff"
			];

			$image = $this->_text($image, $text);
		}
		catch(Exception $e) {
			wp_send_json_error('Image process error');
		}

		return $image;
	}

	public function generate() {
		$p = [
			'post' => intval($_POST['post']),
			'text' => html_entity_decode($_POST['text'])
		];

		$image = $this->_image($p);

        return $this->_save($image, $p);
	}
}
