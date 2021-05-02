<?php
/**
 * Poster generator class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

use Exception;
use WP_Error;
use PosterEditor\PosterEditor;

/**
 * Poster generator class
 *
 * @class Generator
 */
class Generator {
	/**
	 * The instance of Settings class.
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
	 * Compose image using picker data.
	 *
	 * @param array $picker Picker data from metabox.
	 */
	public function compose( $picker ) {
		if ( ! isset( $picker['template'] ) ) {
			return new WP_Error( 'validate', esc_html__( 'Template id cannot be empty', 'sharing-image' ) );
		}

		$id = absint( $picker['template'] );

		// Get templates list from settings.
		$templates = $this->settings->get_templates();

		if ( ! isset( $templates[ $id ] ) ) {
			return new WP_Error( 'validate', esc_html__( 'Wrong template id', 'sharing-image' ) );
		}

		$fieldset = array();

		if ( isset( $picker['fieldset'][ $id ] ) ) {
			$fieldset = $picker['fieldset'][ $id ];
		}

		$template = $this->set_picker_data( $templates[ $id ], $fieldset );

		return SHARING_IMAGE_URL . $filename;
	}

	/**
	 * Show image for settings page using template data.
	 *
	 * @param array $template Templates data from settings page.
	 * @param int   $index    Template index.
	 *
	 * @return WP_Error
	 */
	public function show( $template, $index ) {
		$image = $this->get_editor_image( $template, $index );

		// Generate image and show it immediately.
		$poster = $this->create_poster( $image, $template );

		if ( is_wp_error( $poster ) ) {
			return $poster;
		}

		exit; // It's ok to exit here. Just cause we show an image above.
	}

	/**
	 * Save image for settings page using template data.
	 *
	 * @param array $template Templates data from settings page.
	 * @param int   $index    Template index.
	 *
	 * @return WP_Error
	 */
	public function save( $template, $index ) {
		$file = '/temp/' . time() . '.jpg';

		// Get background image file path.
		$image = $this->get_editor_image( $template, $index );

		// Generate image and show it immediately.
		$poster = $this->create_poster( $image, $template, $file );

		if ( is_wp_error( $poster ) ) {
			return $poster;
		}

		return SHARING_IMAGE_URL . $file;
	}

	/**
	 * Create poster using template data.
	 *
	 * @param string $image    Source image file path.
	 * @param array  $template List of template options.
	 * @param string $file     Optional. File path to save.
	 */
	private function create_poster( $image, $template, $file = null ) {
		try {
			$poster = new PosterEditor();

			$poster->make( $image )->fit( $template['width'], $template['height'] );

			if ( isset( $template['layers'] ) ) {
				$poster = $this->append_layers( $poster, $template['layers'] );
			}

			if ( null === $file ) {
				return $poster->show( 90, 'jpg' );
			}

			$poster->save( SHARING_IMAGE_DIR . $file, 90, 'jpg' );

		} catch ( Exception $e ) {
			return new WP_Error( 'generate', $e->getMessage() );
		}
	}

	/**
	 * Append layers to image.
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layers List of layers options.
	 *
	 * @return PosterEditor
	 */
	private function append_layers( $poster, $layers ) {
		$layers = array_reverse( $layers );

		foreach ( $layers as $layer ) {
			if ( empty( $layer['type'] ) ) {
				continue;
			}

			switch ( $layer['type'] ) {
				case 'filter':
					$poster = $this->draw_filter( $poster, $layer );
					break;

				case 'rectangle':
					$poster = $this->draw_rectangle( $poster, $layer );
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
	 * Draw filter layer
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layer  Filter layer options.
	 *
	 * @return PosterEditor
	 */
	private function draw_filter( $poster, $layer ) {
		if ( ! empty( $layer['grayscale'] ) ) {
			$poster->grayscale();
		}

		if ( ! empty( $layer['blur'] ) ) {
			$poster->blur();
		}

		if ( isset( $layer['contrast'] ) ) {
			$poster->contrast( $layer['contrast'] );
		}

		if ( isset( $layer['brightness'] ) ) {
			$poster->brightness( $layer['brightness'] );
		}

		if ( isset( $layer['blackout'] ) ) {
			$poster->blackout( $layer['blackout'] );
		}

		return $poster;
	}

	/**
	 * Draw rectangle layer.
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layer  Rectangle layer options.
	 *
	 * @return PosterEditor
	 */
	private function draw_rectangle( $poster, $layer ) {
		// Both x and y should be set.
		if ( ! isset( $layer['x'], $layer['y'] ) ) {
			return $poster;
		}

		$args = $this->prepare_args( $layer, array( 'color', 'opacity', 'thickness' ) );

		if ( ! empty( $layer['outline'] ) ) {
			$args['outline'] = true;
		}

		if ( ! isset( $layer['width'] ) ) {
			$layer['width'] = 0;
		}

		if ( ! isset( $layer['height'] ) ) {
			$layer['height'] = 0;
		}

		// Draw rectangle.
		$poster->rectangle( $layer['x'], $layer['y'], $layer['width'], $layer['height'], $args );

		return $poster;
	}

	/**
	 * Draw image layer
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param object       $layer  Option name.
	 *
	 * @return PosterEditor
	 */
	private function draw_image( $poster, $layer ) {
		// Attachment id is required.
		if ( ! isset( $layer['attachment'] ) ) {
			return $poster;
		}

		$args = $this->prepare_args( $layer, array( 'x', 'y', 'width', 'height' ) );

		// Get attachment file by id.
		$image = get_attached_file( $layer['attachment'] );

		// Insert image to poster.
		$poster->insert( $image, $args );

		return $poster;
	}

	/**
	 * Draw text layer
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layer  Rectangle layer options.
	 *
	 * @return PosterEditor
	 */
	private function draw_text( $poster, $layer ) {
		$args = $this->prepare_args( $layer, array( 'x', 'y', 'width', 'height', 'fontsize', 'color', 'lineheight', 'opacity', 'horizontal', 'vertical' ) );

		// Try to set font file by name or attachment path.
		$args['fontpath'] = $this->get_fontpath( $layer );

		// Add text to poster.
		$poster->text( $this->get_layer_text( $layer ), $args );

		return $poster;
	}

	/**
	 * Get poster background image from template data.
	 *
	 * @param array   $template Template data.
	 * @param integer $index    Template index.
	 *
	 * @return string Filtered poster background file.
	 */
	private function get_editor_image( $template, $index ) {
		$image = sprintf( SHARING_IMAGE_DIR . '/assets/images/%d.jpg', ( $index % 12 ) + 1 );

		if ( 'permanent' === $template['background'] ) {
			if ( ! empty( $template['attachment'] ) ) {
				$image = get_attached_file( $template['attachment'] );
			}
		}

		/**
		 * Filters image generator background.
		 *
		 * @param integer $image    Path to image file.
		 * @param string  $template Template data.
		 * @param integer $index    Template index.
		 */
		return apply_filters( 'sharing_image_get_editor_image', $image, $template, $index );
	}

	/**
	 * Get font file path by layer data.
	 *
	 * @param array  $layer Layer data.
	 * @param string $path  Default file path.
	 *
	 * @return string Filtered path to font file.
	 */
	private function get_fontpath( $layer, $path = '' ) {
		if ( isset( $layer['fontname'] ) ) {
			$path = sprintf( SHARING_IMAGE_DIR . '/assets/fonts/%s.ttf', $layer['fontname'] );
		}

		if ( isset( $layer['fontfile'] ) ) {
			$path = get_attached_file( $layer['fontfile'] );
		}

		/**
		 * Filters generator font file path.
		 *
		 * @param string $path  Font file path.
		 * @param array  $layer Layer data.
		 */
		return apply_filters( 'sharing_image_get_fontpath', $path, $layer );
	}

	/**
	 * Get text to draw on poster by layer data.
	 *
	 * @param array  $layer Layer data.
	 * @param string $text  Default text.
	 *
	 * @return string Filtered text.
	 */
	private function get_layer_text( $layer, $text = '' ) {
		if ( isset( $layer['inscription'] ) ) {
			$text = $layer['inscription'];
		}

		if ( isset( $layer['sample'] ) && ! empty( $layer['dynamic'] ) ) {
			$text = $layer['sample'];
		}

		/**
		 * Filters generator layer text.
		 *
		 * @param string $text  Text to draw on poster.
		 * @param array  $layer Layer data.
		 */
		return apply_filters( 'sharing_image_get_layer_text', $text, $layer );
	}

	/**
	 * Get picker data for template id.
	 *
	 * @param array   $picker Picker data from metabox.
	 * @param integer $id     Template id.
	 */
	private function set_picker_data( $picker, $id ) {
		$captions   = array();
		$attachment = null;

		if ( ! isset( $picker['fieldset'][ $id ] ) ) {
			return array( $captions, $attachment );
		}

		$fieldset = $picker['fieldset'][ $id ];

		if ( isset( $fieldset['captions'] ) ) {
			$captions = $fieldset['captions'];
		}

		if ( isset( $fieldset['attachment'] ) ) {
			$attachment = $fieldset['attachment'];
		}

		return array( $captions, $attachment );
	}

	/**
	 * Prepare args and remove not-allowed keys.
	 *
	 * @param array $args    List of source arguments.
	 * @param array $allowed List of allowed keys.
	 *
	 * @return array List of prepared args.
	 */
	private function prepare_args( $args, $allowed ) {
		return array_intersect_key( $args, array_flip( $allowed ) );
	}
}
