<?php
/**
 * Poster generator class.
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
 * Generator class.
 *
 * @class Generator
 */
class Generator {
	/**
	 * Check requred template values.
	 *
	 * @param array $template List of template settings.
	 *
	 * @return bool Whether all required values isset.
	 */
	public static function check_required( $template ) {
		$required = array( 'width', 'height', 'fill' );

		// Count intersected values.
		$prepared = count( self::prepare_args( $template, $required ) );

		if ( count( $required ) === $prepared ) {
			return true;
		}

		return false;
	}

	/**
	 * Prepare template before creating poster.
	 * Used to fill fieldset texts and background image.
	 *
	 * @param array  $template  List of template data.
	 * @param array  $fieldset  Optional. Fieldset data from widget.
	 * @param string $index     Optional. Template index from editor.
	 * @param int    $screen_id Optional. Post or term ID from admin screen.
	 * @param string $context   Optional. Screen ID context field. Can be settings, post or term.
	 *
	 * @return array List of template data.
	 */
	public static function prepare_template( $template, $fieldset = array(), $index = null, $screen_id = 0, $context = 'settings' ) {
		$layers = array();

		if ( isset( $template['layers'] ) ) {
			$layers = $template['layers'];
		}

		foreach ( $layers as $key => &$layer ) {
			if ( 'settings' === $context && ! empty( $template['debug'] ) ) {
				$layer['debug'] = true;
			}

			if ( empty( $layer['type'] ) || empty( $layer['dynamic'] ) ) {
				continue;
			}

			switch ( $layer['type'] ) {
				case 'image':
					$layer = self::prepare_image_layer( $layer, $fieldset, $key, $context );
					break;

				case 'text':
					$layer = self::prepare_text_layer( $layer, $fieldset, $key, $context );
					break;
			}
		}

		$template['layers'] = $layers;

		/**
		 * Filters template before generation.
		 *
		 * @param array  $template  List of template data.
		 * @param array  $fieldset  Fieldset data from widget or sidebars.
		 * @param string $index     Template index from editor.
		 * @param int    $screen_id Post or term ID from admin screen.
		 * @param string $context   Screen ID context field. Can be settings, post or term.
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
	public static function create_poster( $template, $path = null ) {
		try {
			$poster = new PosterEditor();

			// Set color canvas options.
			$options = array(
				'color'   => $template['fill'],
				'opacity' => 0,
			);

			// Create empty poster.
			$poster->canvas( $template['width'], $template['height'], $options );

			if ( ! empty( $template['layers'] ) ) {
				$poster = self::append_layers( $poster, $template['layers'] );
			}

			if ( null === $path ) {
				return $poster->show( Config::get_file_format(), Config::get_quality() );
			}

			$poster->save( $path, Config::get_quality() );
		} catch ( Exception $e ) {
			return new WP_Error( 'generate', $e->getMessage() );
		}
	}

	/**
	 * Get upload file path and url.
	 *
	 * @return array Server file path and url to uploaded image.
	 */
	public static function get_upload_file() {
		// Get uploads directory url and path array.
		list( $path, $url ) = Config::get_upload_dir();

		// Create random file name with proper extension.
		$name = wp_unique_filename( $path, uniqid() . '.' . Config::get_file_format() );

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
	private static function append_layers( $poster, $layers ) {
		$boundary = array();

		foreach ( $layers as $layer ) {
			if ( empty( $layer['type'] ) ) {
				continue;
			}

			switch ( $layer['type'] ) {
				case 'filter':
					$poster = self::draw_filter( $poster, $layer );
					break;

				case 'rectangle':
					$poster = self::draw_rectangle( $poster, $layer, $boundary );
					break;

				case 'image':
					$poster = self::draw_image( $poster, $layer, $boundary );
					break;

				case 'text':
					$poster = self::draw_text( $poster, $layer, $boundary );
					break;
			}
		}

		return $poster;
	}

	/**
	 * Prepare image layer template.
	 *
	 * @param array  $layer    Image layer data.
	 * @param array  $fieldset Fieldset data from widget or sidebar.
	 * @param string $key      Layer key.
	 * @param string $context  Screen ID context field. Can be settings, post or term.
	 *
	 * @return array List of image layer data.
	 */
	private static function prepare_image_layer( $layer, $fieldset, $key, $context ) {
		if ( 'settings' !== $context ) {
			unset( $layer['attachment'] );
		}

		if ( ! empty( $fieldset[ $key ] ) ) {
			$layer['attachment'] = $fieldset[ $key ];
		}

		return $layer;
	}

	/**
	 * Prepare text layer template.
	 *
	 * @param array  $layer    Text layer data.
	 * @param array  $fieldset Fieldset data from widget or sidebar.
	 * @param string $key      Layer key.
	 * @param string $context  Screen ID context field. Can be settings, post or term.
	 *
	 * @return array List of text layer data.
	 */
	private static function prepare_text_layer( $layer, $fieldset, $key, $context ) {
		$layer['content'] = null;

		if ( isset( $layer['sample'] ) && 'settings' === $context ) {
			$layer['content'] = $layer['sample'];
		}

		if ( isset( $fieldset[ $key ] ) ) {
			$layer['content'] = $fieldset[ $key ];
		}

		return $layer;
	}

	/**
	 * Draw filter layer
	 *
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 * @param array        $layer  Filter layer options.
	 *
	 * @return PosterEditor PosterEditor instance.
	 */
	private static function draw_filter( $poster, $layer ) {
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
	 * @param PosterEditor $poster   Instance of PosterEditor class.
	 * @param array        $layer    Rectangle layer options.
	 * @param array        $boundary Optional. List of previous layer boundaries.
	 *
	 * @return PosterEditor PosterEditor instance.
	 */
	private static function draw_rectangle( $poster, $layer, &$boundary = array() ) {
		// Both x and y should be set.
		if ( ! isset( $layer['x'], $layer['y'] ) ) {
			return $poster;
		}

		$args = self::prepare_args( $layer, array( 'color', 'opacity', 'thickness' ) );

		if ( ! empty( $layer['outline'] ) ) {
			$args['outline'] = true;
		}

		if ( ! isset( $layer['width'] ) ) {
			$layer['width'] = 1;
		}

		if ( ! isset( $layer['height'] ) ) {
			$layer['height'] = 1;
		}

		// Update layer position and dimensions.
		$layer = self::update_layer_position( $layer, $boundary );
		$layer = self::update_layer_dimensions( $layer, $poster );

		// Draw rectangle.
		$poster->rectangle( $layer['x'], $layer['y'], $layer['width'], $layer['height'], $args );

		// Set boundary from layer dimensions.
		foreach ( array( 'x', 'y', 'width', 'height' ) as $param ) {
			$boundary[ $param ] = $layer[ $param ];
		}

		return $poster;
	}

	/**
	 * Draw image layer
	 *
	 * @param PosterEditor $poster   Instance of PosterEditor class.
	 * @param array        $layer    Image layer options.
	 * @param array        $boundary Optional. List of previous layer boundaries.
	 *
	 * @return PosterEditor PosterEditor instance.
	 */
	private static function draw_image( $poster, $layer, &$boundary = array() ) {
		if ( ! isset( $layer['attachment'] ) ) {
			return $poster;
		}

		$image = new PosterEditor();

		// Update layer position and dimensions.
		$layer = self::update_layer_position( $layer, $boundary );
		$layer = self::update_layer_dimensions( $layer, $poster );

		// Prepare common layer args.
		$args = self::prepare_args( $layer, array( 'x', 'y', 'opacity' ) );

		// Create new editor  instance by attachment id.
		$attachment = $image->make( get_attached_file( $layer['attachment'] ) );

		return $poster->insert( self::resize_attachment( $attachment, $layer ), $args, $boundary );
	}

	/**
	 * Draw text layer.
	 *
	 * @param PosterEditor $poster   Instance of PosterEditor class.
	 * @param array        $layer    Text layer options.
	 * @param array        $boundary Optional. List of previous layer boundaries.
	 *
	 * @return PosterEditor PosterEditor instance.
	 */
	private static function draw_text( $poster, $layer, &$boundary = array() ) {
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

		// Update layer position and dimensions.
		$layer = self::update_layer_position( $layer, $boundary );
		$layer = self::update_layer_dimensions( $layer, $poster );

		// Prepare common layer args.
		$args = self::prepare_args( $layer, $allowed );

		// Try to set font file by name or attachment path.
		$args['fontpath'] = self::get_fontpath( $layer );

		$boundary = self::set_empty_boundary( $args );

		if ( ! empty( $layer['content'] ) ) {
			$poster->text( $layer['content'], $args, $boundary );
		}

		return $poster;
	}

	/**
	 * Set empty boundary list to reset boundary for empty layers.
	 *
	 * @since 3.0
	 *
	 * @param array $args List of common layer args.
	 */
	private static function set_empty_boundary( $args ) {
		$boundary = array(
			'x'      => 0,
			'y'      => 0,
			'width'  => 0,
			'height' => 0,
		);

		if ( isset( $args['x'] ) ) {
			$boundary['x'] = $args['x'];
		}

		if ( isset( $args['y'] ) ) {
			$boundary['y'] = $args['y'];
		}

		return $boundary;
	}

	/**
	 * Smart resizing of image layer attachment according to selected options.
	 *
	 * @param PosterEditor $attachment Instance of PosterEditor class.
	 * @param array        $layer      Layer settings.
	 *
	 * @return PosterEditor PosterEditor instance.
	 */
	private static function resize_attachment( $attachment, $layer ) {
		$width = null;

		if ( isset( $layer['width'] ) ) {
			$width = $layer['width'];
		}

		$height = null;

		if ( isset( $layer['height'] ) ) {
			$height = $layer['height'];
		}

		// Reduce the image size if width or height dimensions are not specified.
		if ( is_null( $width ) || is_null( $height ) ) {
			return $attachment->downsize( $width, $height );
		}

		if ( 'top' === $layer['resize'] ) {
			return $attachment->fit( $width, $height, 'top' );
		}

		if ( 'bottom' === $layer['resize'] ) {
			return $attachment->fit( $width, $height, 'bottom' );
		}

		if ( 'ignore' === $layer['resize'] ) {
			return $attachment->resize( $width, $height );
		}

		if ( 'crop' === $layer['resize'] ) {
			return $attachment->crop( $width, $height );
		}

		// Fit center by default.
		return $attachment->fit( $width, $height );
	}

	/**
	 * Get font file path by layer data.
	 *
	 * @param array  $layer Layer data.
	 * @param string $path  Default file path.
	 *
	 * @return string Filtered path to font file.
	 */
	private static function get_fontpath( $layer, $path = '' ) {
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
	 * Update layer position using boundary settings.
	 *
	 * @param array $layer    List of layer options.
	 * @param array $boundary List of previous layer boundaries.
	 *
	 * @return array List of layer settings.
	 */
	private static function update_layer_position( $layer, $boundary ) {
		if ( empty( $layer['boundary'] ) || 'absolute' === $layer['boundary'] ) {
			return $layer;
		}

		// Check if boundary sizes exist.
		foreach ( array( 'x', 'y', 'width', 'height' ) as $size ) {
			if ( ! isset( $boundary[ $size ] ) ) {
				return $layer;
			}
		}

		$x = $layer['x'] + $boundary['width'] + $boundary['x'];
		$y = $layer['y'] + $boundary['height'] + $boundary['y'];

		switch ( $layer['boundary'] ) {
			case 'horizontally':
				$layer['x'] = $x;
				break;

			case 'vertically':
				$layer['y'] = $y;
				break;

			default:
				$layer['x'] = $x;
				$layer['y'] = $y;
		}

		return $layer;
	}

	/**
	 * Update layer sizes for negative dimensions.
	 *
	 * @param array        $layer List of layer options.
	 * @param PosterEditor $poster Instance of PosterEditor class.
	 *
	 * @return array List of layer settings.
	 */
	private static function update_layer_dimensions( $layer, $poster ) {
		if ( ! isset( $layer['width'] ) ) {
			$layer['width'] = 0;
		}

		if ( ! isset( $layer['height'] ) ) {
			$layer['height'] = 0;
		}

		$width = absint( $poster->width() );

		if ( $layer['width'] <= 0 ) {
			$layer['width'] = $width + $layer['width'] - $layer['x'];
		}

		$height = absint( $poster->height() );

		if ( $layer['height'] <= 0 ) {
			$layer['height'] = $height + $layer['height'] - $layer['y'];
		}

		return $layer;
	}

	/**
	 * Prepare args and remove not-allowed keys.
	 *
	 * @param array $args    List of source arguments.
	 * @param array $allowed List of allowed keys.
	 *
	 * @return array List of prepared args.
	 */
	private static function prepare_args( $args, $allowed ) {
		return wp_array_slice_assoc( $args, $allowed );
	}
}
