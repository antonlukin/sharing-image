<?php
/**
 * Poster generator class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

use ImageText;

/**
 * Poster generator class
 *
 * @class Generator
 */
class Generator {
	/**
	 * Generator constructor.
	 */
	public function __construct() {
		//add_action( 'init', array( $this, 'generate_poster' ) );
	}

	public function run( $options ) {
		$image = SHARING_IMAGE_DIR . '/assets/posters/1.jpg';

		$poster = new ImageText();

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$poster = $this->append_layers( $poster, $options['layers'] );

		$poster->show();
		exit;
	}

	public function save( $options ) {
		$image = SHARING_IMAGE_DIR . '/assets/posters/1.jpg';

		$poster = new ImageText();

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$poster = $this->append_layers( $poster, $options['layers'] );

		$filename = '/temp/' . time() . '.jpg';

		$poster->save( SHARING_IMAGE_DIR . $filename );

		wp_send_json_success( SHARING_IMAGE_URL . $filename );
		exit;
	}

	/**
	 * Generate poster.
	 */
	public function generate_poster() {
		if ( ! isset( $_GET['generate'] ) ) {
			return;
		}

		if ( ! class_exists( 'ImageText' ) ) {
			return;
		}

		$image = SHARING_IMAGE_DIR . '/assets/posters/1.jpg';

		$poster = new ImageText();

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$options = file_get_contents( SHARING_IMAGE_DIR . '/temp/options.json' );
		$options = json_decode( $options, false );

		$poster = $this->append_layers( $poster, $options->layers );

		$poster->show();
		exit;
	}

	/**
	 *
	 */
	private function append_layers( $poster, $layers ) {
		foreach ( $layers as $layer ) {
			if ( empty( $layer['type'] ) ) {
				continue;
			}

			switch ( $layer['type'] ) {
				case 'filter':
					break;
				case 'text':
					$poster = $this->draw_text( $poster, $layer );
					break;
				case 'image':
					$poster = $this->draw_image( $poster, $layer );
					break;
			}
		}

		return $poster;
	}

	/**
	 * Draw text layer
	 *
	 * @param ImageText $poster Instance of ImageText.
	 * @param object    $layer  Option name.
	 *
	 * @return ImageText
	 */
	private function draw_text( $poster, $options ) {
		$options['font'] = SHARING_IMAGE_DIR . '/temp/open-sans.ttf';

		if ( ! empty( $options['inscription'] ) ) {
			$poster->text( $options['inscription'], $options );
		}

		return $poster;
	}

	/**
	 * Draw image layer
	 *
	 * @param ImageText $poster Instance of ImageText.
	 * @param object    $layer  Option name.
	 *
	 * @return ImageText
	 */
	private function draw_image( $poster, $layer ) {
		return $poster;
	}
}
