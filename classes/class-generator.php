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
	 * The instance of settings class.
	 *
	 * @var instance
	 */
	private $settings;

	/**
	 * Generator constructor.
	 */
	public function __construct() {
		$this->settings = new Settings();
	}

	/**
	 * Generate image using picker data.
	 *
	 * @param array $picker Picker data from metabox.
	 */
	public function generate( $picker ) {
		$template = $picker['template'];

		$templates = $this->settings->get_templates();

		return $templates[ $template ]['preview'];
	}

	/**
	 * Show image for settings page using editor data.
	 *
	 * @param array $editor Editor data from settings page.
	 * @param int   $index  Template index.
	 */
	public function show( $editor, $index ) {
		$poster = new ImageText();

		// Get background sample image.
		$image = sprintf( SHARING_IMAGE_DIR . '/assets/images/%d.jpg', ( $index % 12 ) + 1 );

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$poster = $this->append_layers( $poster, $options['layers'] );

		$poster->show();
		exit;
	}

	public function save( $options, $index ) {
		// Get background sample image.
		$image = sprintf( SHARING_IMAGE_DIR . '/assets/images/%d.jpg', ( $index % 12 ) + 1 );

		$poster = new ImageText();

		$poster->setDimensionsFromImage( $image )->draw( $image );
		$poster->setOutput( 'jpg' );
		$poster->crop( 1200, 630, true );

		$poster = $this->append_layers( $poster, $options['layers'] );

		$filename = '/temp/' . time() . '.jpg';

		$poster->save( SHARING_IMAGE_DIR . $filename );

		return SHARING_IMAGE_URL . $filename;
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
