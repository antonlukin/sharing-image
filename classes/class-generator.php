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

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

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
	 * Check requred template values.
	 *
	 * @param array $template List of template settings.
	 *
	 * @return bool Whether all required values isset.
	 */
	public function check_required( $template ) {
		$required = array( 'width', 'height', 'fill' );

		// Count intersected values.
		$prepared = count( $this->prepare_args( $template, $required ) );

		if ( count( $required ) === $prepared ) {
			return true;
		}

		return false;
	}

	/**
	 * Prepare template before creating poster.
	 * Used to fill fieldset texts and background image.
	 *
	 * @param array   $template  List of template data.
	 * @param array   $fieldset  Optional. Fieldset data from picker.
	 * @param integer $index     Optional. Template index from editor.
	 * @param integer $screen_id Optional. Post or term ID from admin screen.
	 * @param string  $context   Optional. Screen ID context field. Can be settings, post or term.
	 *
	 * @return array List of template data.
	 */
	public function prepare_template( $template, $fieldset = array(), $index = null, $screen_id = 0, $context = 'settings' ) {
		$layers = array();

		if ( isset( $template['layers'] ) ) {
			$layers = $template['layers'];
		}

		foreach ( $layers as $i => &$layer ) {
			if ( empty( $layer['type'] ) || 'text' !== $layer['type'] ) {
				continue;
			}

			if ( 'settings' === $context && ! empty( $template['debug'] ) ) {
				$layer['debug'] = true;
			}

			if ( empty( $layer['dynamic'] ) ) {
				continue;
			}

			$layer['content'] = null;

			if ( isset( $layer['sample'] ) ) {
				$layer['content'] = $layer['sample'];
			}

			if ( isset( $fieldset['captions'][ $i ] ) ) {
				$layer['content'] = $fieldset['captions'][ $i ];
			}
		}

		$template['layers'] = $layers;

		if ( 'dynamic' === $template['background'] ) {
			if ( null !== $index ) {
				$template['image'] = sprintf( SHARING_IMAGE_DIR . 'images/%d.jpg', ( $index % 12 ) + 1 );
			}

			if ( ! empty( $fieldset['attachment'] ) ) {
				$template['image'] = get_attached_file( $fieldset['attachment'] );
			}
		}

		if ( 'permanent' === $template['background'] ) {
			if ( ! empty( $template['attachment'] ) ) {
				$template['image'] = get_attached_file( $template['attachment'] );
			}
		}

		/**
		 * Filters template before generation.
		 *
		 * @param array   $template  List of template data.
		 * @param array   $fieldset  Fieldset data from picker.
		 * @param integer $index     Template index from editor.
		 * @param integer $screen_id Post or term ID from admin screen.
		 * @param string  $context   Screen ID context field. Can be settings, post or term.
		 */
		return apply_filters( 'sharing_image_prepare_template', $template, $fieldset, $index, $screen_id, $context );
	}

	/**
	 * Create poster using template data.
	 *
	 * @param array  $template List of template options.
	 * @param string $path     Optional. File path to save.
	 *
	 * @return void|WP_Error WP_Error on failure.
	 */
	public function create_poster( $template, $path = null ) {
		try {
			$poster = new PosterEditor();

			// Set color canvas options.
			$options = array(
				'color'   => $template['fill'],
				'opacity' => 0,
			);

			// Create empty poster.
			$poster->canvas( $template['width'], $template['height'], $options );

			// Recreate poster with image if exists.
			if ( ! empty( $template['image'] ) ) {
				$poster->make( $template['image'] )->fit( $template['width'], $template['height'] );
			}

			if ( ! empty( $template['layers'] ) ) {
				$poster = $this->append_layers( $poster, $template['layers'] );
			}

			$settings = $this->settings;

			if ( null === $path ) {
				return $poster->show( $settings->get_file_format(), $settings->get_quality() );
			}

			$poster->save( $path, $settings->get_quality() );
		} catch ( Exception $e ) {
			return new WP_Error( 'generate', $e->getMessage() );
		}
	}

	/**
	 * Get upload file path and url.
	 *
	 * @return array Server file path and url to uploaded image.
	 */
	public function get_upload_file() {
		$settings = $this->settings;

		// Get uploads directory url and path array.
		list( $path, $url ) = $settings->get_upload_dir();

		// Create random file name with proper extension.
		$name = wp_unique_filename( $path, uniqid() . '.' . $settings->get_file_format() );

		$file = array(
			trailingslashit( $path ) . $name,
			trailingslashit( $url ) . $name,
		);

		/**
		 * Filters upload file path and url
		 *
		 * @param array  $file Server file path and url to image.
		 * @param string $name Unique file name.
		 */
		return apply_filters( 'sharing_image_get_upload_file', $file, $name );
	}

	/**
	 * Append layers to image.
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layers List of layers options.
	 *
	 * @return PosterEditor PosterEditor instance.
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
	 * @return PosterEditor PosterEditor instance.
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
	 * @return PosterEditor PosterEditor instance.
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
	 * @return PosterEditor PosterEditor instance.
	 */
	private function draw_image( $poster, $layer ) {
		// Attachment id is required.
		if ( ! isset( $layer['attachment'] ) ) {
			return $poster;
		}

		$image = new PosterEditor();

		// Prepare common layer args.
		$args = $this->prepare_args( $layer, array( 'x', 'y' ) );

		// Create new editor  instance by attachment id.
		$attachment = $image->make( get_attached_file( $layer['attachment'] ) );

		if ( isset( $layer['width'], $layer['height'] ) ) {
			return $poster->insert( $attachment->resize( $layer['width'], $layer['height'] ), $args );
		}

		if ( ! isset( $layer['width'] ) ) {
			$layer['width'] = null;
		}

		if ( ! isset( $layer['height'] ) ) {
			$layer['height'] = null;
		}

		return $poster->insert( $attachment->downsize( $layer['width'], $layer['height'] ), $args );
	}

	/**
	 * Draw text layer.
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layer  Rectangle layer options.
	 *
	 * @return PosterEditor PosterEditor instance.
	 */
	private function draw_text( $poster, $layer ) {
		$allowed = array(
			'x',
			'y',
			'width',
			'height',
			'fontsize',
			'color',
			'lineheight',
			'opacity',
			'horizontal',
			'vertical',
			'debug',
		);

		$args = $this->prepare_args( $layer, $allowed );

		// Try to set font file by name or attachment path.
		$args['fontpath'] = $this->get_fontpath( $layer );

		if ( ! empty( $layer['content'] ) ) {
			$poster->text( $layer['content'], $args );
		}

		return $poster;
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
			$path = sprintf( SHARING_IMAGE_DIR . 'fonts/%s.ttf', $layer['fontname'] );
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
	 * Prepare args and remove not-allowed keys.
	 *
	 * @param array $args    List of source arguments.
	 * @param array $allowed List of allowed keys.
	 *
	 * @return array List of prepared args.
	 */
	private function prepare_args( $args, $allowed ) {
		return wp_array_slice_assoc( $args, $allowed );
	}
}
