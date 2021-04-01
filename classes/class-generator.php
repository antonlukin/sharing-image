<?php
/**
 * Poster generator class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

use ImageText;
use WP_Error;

/**
 * Poster generator class
 *
 * @class Generator
 */
class Generator {
	/**
	 * Store plugin settings.
	 *
	 * @var array
	 */
	private $config = array();

	/**
	 * Generator constructor.
	 */
	public function __construct() {
		$settings = new Settings();

		$this->config = $settings->get_config();
	}

	public function show( $options, $image ) {
		$poster = new ImageText();

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$poster = $this->append_layers( $poster, $options['layers'] );

		$poster->show();
		exit;
	}

	public function save( $options, $image ) {
		$poster = new ImageText();

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$poster = $this->append_layers( $poster, $options['layers'] );

		$filename = '/temp/' . time() . '.jpg';

		$poster->save( SHARING_IMAGE_DIR . $filename );

		return SHARING_IMAGE_URL . $filename;
	}

	private function prepare_options( $options, $image ) {
		print_r( $options );
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
