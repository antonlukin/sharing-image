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

		if ( count( $required ) !== $prepared ) {
			return false;
		}

		return ! is_wp_error( self::validate_template( $template ) );
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
			$validation = self::validate_template( $template );

			if ( is_wp_error( $validation ) ) {
				return $validation;
			}

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

			if ( is_null( $path ) ) {
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
	 * Get generator safety limit.
	 *
	 * @param string $name Limit name.
	 *
	 * @return int Limit value.
	 */
	public static function get_limit( $name ) {
		$limits = array(
			'max_width'     => 4096,
			'max_height'    => 4096,
			'max_pixels'    => 12000000,
			'max_layers'    => 100,
			'max_text'      => 5000,
			'max_fontsize'  => 512,
			'max_dimension' => 4096,
		);

		/**
		 * Filters generator safety limits.
		 *
		 * @param array $limits List of generator limits.
		 */
		$limits = apply_filters( 'sharing_image_generator_limits', $limits );

		if ( ! isset( $limits[ $name ] ) ) {
			return 0;
		}

		return absint( $limits[ $name ] );
	}

	/**
	 * Limit text length before storing or rendering.
	 *
	 * @param mixed $text Text value.
	 *
	 * @return mixed Limited text value.
	 */
	public static function limit_text( $text ) {
		if ( ! is_string( $text ) ) {
			return $text;
		}

		$max = self::get_limit( 'max_text' );

		if ( ! $max ) {
			return $text;
		}

		if ( function_exists( 'mb_strlen' ) && function_exists( 'mb_substr' ) ) {
			if ( mb_strlen( $text, 'UTF-8' ) > $max ) {
				return mb_substr( $text, 0, $max, 'UTF-8' );
			}

			return $text;
		}

		if ( strlen( $text ) > $max ) {
			return substr( $text, 0, $max );
		}

		return $text;
	}

	/**
	 * Normalize template dimensions to configured safety limits.
	 *
	 * @param int $width  Template width.
	 * @param int $height Template height.
	 *
	 * @return array Normalized width and height.
	 */
	public static function normalize_dimensions( $width, $height ) {
		$width  = max( 1, min( absint( $width ), self::get_limit( 'max_width' ) ) );
		$height = max( 1, min( absint( $height ), self::get_limit( 'max_height' ) ) );

		$max_pixels = self::get_limit( 'max_pixels' );

		if ( $max_pixels && $width * $height > $max_pixels ) {
			$ratio  = sqrt( $max_pixels / ( $width * $height ) );
			$width  = max( 1, (int) floor( $width * $ratio ) );
			$height = max( 1, (int) floor( $height * $ratio ) );
		}

		return array(
			'width'  => $width,
			'height' => $height,
		);
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

		$layer['content'] = self::normalize_text( $layer['content'] );
		$layer['content'] = self::limit_text( $layer['content'] );

		if ( isset( $layer['textconvert'] ) && 'default' !== $layer['textconvert'] ) {
			if ( 'uppercase' === $layer['textconvert'] ) {
				if ( function_exists( 'mb_strtoupper' ) ) {
					$layer['content'] = mb_strtoupper( $layer['content'], 'UTF-8' );
				} else {
					$layer['content'] = strtoupper( $layer['content'] );
				}
			} elseif ( 'lowercase' === $layer['textconvert'] ) {
				if ( function_exists( 'mb_strtolower' ) ) {
					$layer['content'] = mb_strtolower( $layer['content'], 'UTF-8' );
				} else {
					$layer['content'] = strtolower( $layer['content'] );
				}
			}
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

		$args = self::prepare_args( $layer, array( 'x', 'y', 'opacity' ) );

		// Try to get file from attachment id.
		$file = get_attached_file( $layer['attachment'] );

		if ( empty( $file ) ) {
			return $poster;
		}

		// Create new editor  instance by attachment id.
		$attachment = $image->make( $file );

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
	 * Normalize text before rendering it into GD.
	 *
	 * WordPress stores strings as UTF-8, but older saved meta or imported
	 * templates can contain HTML entities or mojibake markers instead of
	 * the original characters.
	 *
	 * @param mixed $text Text layer content.
	 *
	 * @return mixed Normalized text.
	 */
	public static function normalize_text( $text ) {
		if ( ! is_string( $text ) ) {
			return $text;
		}

		$text = html_entity_decode( $text, ENT_QUOTES | ENT_HTML5, 'UTF-8' );

		if ( function_exists( 'wp_check_invalid_utf8' ) ) {
			$text = wp_check_invalid_utf8( $text, true );
		}

		/**
		 * Whether to attempt heuristic mojibake repair.
		 *
		 * Detects common UTF-8 sequences that were once decoded as
		 * Windows-1252 (e.g. "RÃ©sumÃ©" → "Résumé"). Disable this filter
		 * if it produces false positives on legitimate accented text.
		 *
		 * @param bool   $enabled Whether repair is enabled. Default true.
		 * @param string $text    Text being normalized.
		 */
		if ( apply_filters( 'sharing_image_repair_mojibake', true, $text ) ) {
			$text = self::repair_mojibake( $text );
		}

		return $text;
	}

	/**
	 * Repair UTF-8 text that was previously decoded as Windows-1252/ISO-8859-1.
	 *
	 * @param string $text Text layer content.
	 *
	 * @return string Repaired text when mojibake is detected.
	 */
	private static function repair_mojibake( $text ) {
		for ( $attempt = 0; $attempt < 2; $attempt++ ) {
			$score = self::mojibake_score( $text );

			if ( 0 === $score ) {
				return $text;
			}

			$fixed = self::convert_mojibake_candidate( $text );

			if ( ! is_string( $fixed ) || $fixed === $text || self::mojibake_score( $fixed ) >= $score ) {
				$fixed = self::repair_mojibake_segments( $text );
			}

			if ( ! is_string( $fixed ) || $fixed === $text || self::mojibake_score( $fixed ) >= $score ) {
				return $text;
			}

			$text = $fixed;
		}

		return $text;
	}

	/**
	 * Count common mojibake markers without matching normal accented text.
	 *
	 * @param string $text Text layer content.
	 *
	 * @return int Mojibake marker count.
	 */
	private static function mojibake_score( $text ) {
		$score   = 0;
		$markers = array(
			"\xc3\x83",
			"\xc3\x82",
			"\xc3\xa2",
			"\xc3\x90",
			"\xc3\x91",
		);

		foreach ( $markers as $marker ) {
			$score += substr_count( $text, $marker );
		}

		return $score;
	}

	/**
	 * Repair mojibake one whitespace-delimited segment at a time.
	 *
	 * @param string $text Text layer content.
	 *
	 * @return string Repaired text when a segment can be converted safely.
	 */
	private static function repair_mojibake_segments( $text ) {
		$segments = preg_split( '/(\s+)/u', $text, -1, PREG_SPLIT_DELIM_CAPTURE );

		if ( ! is_array( $segments ) ) {
			return $text;
		}

		foreach ( $segments as &$segment ) {
			$score = self::mojibake_score( $segment );

			if ( 0 === $score ) {
				continue;
			}

			$fixed = self::convert_mojibake_candidate( $segment );

			if ( is_string( $fixed ) && $fixed !== $segment && self::mojibake_score( $fixed ) < $score ) {
				$segment = $fixed;
			}
		}
		unset( $segment );

		return implode( '', $segments );
	}

	/**
	 * Convert a mojibake-looking UTF-8 string back through Windows-1252 bytes.
	 *
	 * @param string $text Text layer content.
	 *
	 * @return string|false Converted candidate.
	 */
	private static function convert_mojibake_candidate( $text ) {
		$encodings = array( 'Windows-1252', 'ISO-8859-1' );
		$best      = false;

		foreach ( $encodings as $encoding ) {
			$fixed = self::convert_to_legacy_bytes( $text, $encoding );

			if ( ! is_string( $fixed ) || '' === $fixed ) {
				continue;
			}

			if ( ! self::is_valid_utf8( $fixed ) ) {
				continue;
			}

			if ( false === $best || self::mojibake_score( $fixed ) < self::mojibake_score( $best ) ) {
				$best = $fixed;
			}
		}

		return $best;
	}

	/**
	 * Convert UTF-8 text to legacy bytes only when the conversion is lossless.
	 *
	 * @param string $text     Text layer content.
	 * @param string $encoding Legacy encoding name.
	 *
	 * @return string|false Converted bytes.
	 */
	private static function convert_to_legacy_bytes( $text, $encoding ) {
		$source = $text;

		if ( 'ISO-8859-1' === $encoding ) {
			$source = self::normalize_windows_1252_symbols( $text );
		}

		if ( function_exists( 'iconv' ) ) {
			// Suppress notices: we only care about the return value, errors are expected on partial sequences.
			$fixed = @iconv( 'UTF-8', $encoding, $source ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

			if ( is_string( $fixed ) && @iconv( $encoding, 'UTF-8', $fixed ) === $source ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
				return $fixed;
			}
		} elseif ( function_exists( 'mb_convert_encoding' ) ) {
			$fixed = @mb_convert_encoding( $source, $encoding, 'UTF-8' ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

			if ( is_string( $fixed ) && @mb_convert_encoding( $fixed, 'UTF-8', $encoding ) === $source ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
				return $fixed;
			}
		}

		return false;
	}

	/**
	 * Normalize Windows-1252 printable symbols to ISO-8859-1 C1 controls.
	 *
	 * Some mojibake strings mix Windows-1252 symbols like "œ" with raw C1
	 * controls. Mapping those symbols back to controls lets ISO-8859-1 recover
	 * the original UTF-8 byte stream.
	 *
	 * @param string $text Text to normalize.
	 *
	 * @return string Normalized text.
	 */
	private static function normalize_windows_1252_symbols( $text ) {
		$bytes = array( 0x80, 0x82, 0x83, 0x84, 0x85, 0x86, 0x87, 0x88, 0x89, 0x8A, 0x8B, 0x8C, 0x8E, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9A, 0x9B, 0x9C, 0x9E, 0x9F );

		foreach ( $bytes as $byte ) {
			$symbol = @iconv( 'Windows-1252', 'UTF-8', chr( $byte ) ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

			if ( ! is_string( $symbol ) || '' === $symbol ) {
				continue;
			}

			$text = str_replace( $symbol, self::utf8_chr( $byte ), $text );
		}

		return $text;
	}

	/**
	 * Convert a Unicode code point below U+0800 to UTF-8.
	 *
	 * @param int $code_point Unicode code point.
	 *
	 * @return string UTF-8 character.
	 */
	private static function utf8_chr( $code_point ) {
		if ( $code_point < 0x80 ) {
			return chr( $code_point );
		}

		return chr( 0xC0 | ( $code_point >> 6 ) ) . chr( 0x80 | ( $code_point & 0x3F ) );
	}

	/**
	 * Check whether a string contains valid UTF-8 bytes.
	 *
	 * @param string $text Text to check.
	 *
	 * @return bool Whether text is valid UTF-8.
	 */
	private static function is_valid_utf8( $text ) {
		if ( function_exists( 'mb_check_encoding' ) ) {
			return mb_check_encoding( $text, 'UTF-8' );
		}

		return (bool) preg_match( '//u', $text );
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
			$fontname = sanitize_key( $layer['fontname'] );

			if ( $fontname ) {
				$path = sprintf( SHARING_IMAGE_DIR . 'fonts/%s.ttf', $fontname );
			}
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

	/**
	 * Validate template before allocating GD resources.
	 *
	 * @param array $template Template settings.
	 *
	 * @return true|WP_Error True when valid, WP_Error otherwise.
	 */
	private static function validate_template( $template ) {
		if ( empty( $template['width'] ) || empty( $template['height'] ) ) {
			return new WP_Error( 'generate', esc_html__( 'Incorrect template settings.', 'sharing-image' ) );
		}

		$width  = absint( $template['width'] );
		$height = absint( $template['height'] );

		if ( $width < 1 || $height < 1 ) {
			return new WP_Error( 'generate', esc_html__( 'Incorrect template dimensions.', 'sharing-image' ) );
		}

		if ( $width > self::get_limit( 'max_width' ) || $height > self::get_limit( 'max_height' ) ) {
			return new WP_Error( 'generate', esc_html__( 'Template dimensions are too large.', 'sharing-image' ) );
		}

		if ( $width * $height > self::get_limit( 'max_pixels' ) ) {
			return new WP_Error( 'generate', esc_html__( 'Template canvas is too large.', 'sharing-image' ) );
		}

		if ( ! empty( $template['layers'] ) && is_array( $template['layers'] ) ) {
			if ( count( $template['layers'] ) > self::get_limit( 'max_layers' ) ) {
				return new WP_Error( 'generate', esc_html__( 'Template contains too many layers.', 'sharing-image' ) );
			}

			foreach ( $template['layers'] as $layer ) {
				$validation = self::validate_layer( $layer );

				if ( is_wp_error( $validation ) ) {
					return $validation;
				}
			}
		}

		return true;
	}

	/**
	 * Validate layer settings before rendering.
	 *
	 * @param array $layer Layer settings.
	 *
	 * @return true|WP_Error True when valid, WP_Error otherwise.
	 */
	private static function validate_layer( $layer ) {
		if ( isset( $layer['fontsize'] ) && absint( $layer['fontsize'] ) > self::get_limit( 'max_fontsize' ) ) {
			return new WP_Error( 'generate', esc_html__( 'Layer font size is too large.', 'sharing-image' ) );
		}

		foreach ( array( 'width', 'height' ) as $dimension ) {
			if ( ! isset( $layer[ $dimension ] ) ) {
				continue;
			}

			$value = intval( $layer[ $dimension ] );

			if ( $value > self::get_limit( 'max_dimension' ) ) {
				return new WP_Error( 'generate', esc_html__( 'Layer dimensions are too large.', 'sharing-image' ) );
			}
		}

		if ( isset( $layer['content'] ) && is_string( $layer['content'] ) ) {
			$text = $layer['content'];
			$max  = self::get_limit( 'max_text' );

			if ( $max && function_exists( 'mb_strlen' ) && mb_strlen( $text, 'UTF-8' ) > $max ) {
				return new WP_Error( 'generate', esc_html__( 'Layer text is too long.', 'sharing-image' ) );
			}

			if ( $max && ! function_exists( 'mb_strlen' ) && strlen( $text ) > $max ) {
				return new WP_Error( 'generate', esc_html__( 'Layer text is too long.', 'sharing-image' ) );
			}
		}

		return true;
	}
}
