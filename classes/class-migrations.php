<?php
/**
 * Process all migration on plugin update.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Migrations class.
 *
 * @class Migrations
 */
class Migrations {
	/**
	 * Sharing Image migrations options name.
	 *
	 * @var string
	 */
	const OPTION_MIGRATION = 'sharing_image_migration';

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'migrate_templates' ) );
		add_action( 'load-post.php', array( __CLASS__, 'migrate_post_fieldset' ) );
	}

	/**
	 * Migrate database templates to new format.
	 */
	public static function migrate_templates() {
		$legacy = get_option( 'sharing_image_templates' );

		if ( empty( $legacy ) ) {
			return;
		}

		$migration = get_option( self::OPTION_MIGRATION, null );

		if ( ! is_null( $migration ) ) {
			return;
		}

		self::add_templates_index( $legacy );

		delete_option( 'sharing_image_templates' );
	}

	/**
	 * Migrate fieldset in post or term editor screen.
	 */
	public static function migrate_post_fieldset() {
		// phpcs:ignore WordPress.Security.NonceVerification
		$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;

		if ( empty( $post_id ) ) {
			return;
		}

		$source = get_post_meta( $post_id, Widget::META_SOURCE, true );

		if ( empty( $source['fieldset'] ) ) {
			return;
		}

		$migration = get_option( self::OPTION_MIGRATION, array() );

		if ( empty( $migration['layers'] ) ) {
			$migration['layers'] = array();
		}

		$source = self::update_source_template( $source, $migration );

		$prepared = array();
		$fieldset = $source['fieldset'];

		foreach ( $migration['layers'] as $key => $layer ) {
			list( $field, $id, $pos ) = array_pad( explode( '-', $layer ), 3, null );

			if ( is_null( $pos ) && ! empty( $fieldset[ $id ][ $field ] ) ) {
				$prepared[ $key ] = $fieldset[ $id ][ $field ];
			}

			if ( ! is_null( $pos ) && ! empty( $fieldset[ $id ][ $field ][ $pos ] ) ) {
				$prepared[ $key ] = $fieldset[ $id ][ $field ][ $pos ];
			}
		}

		unset( $source['fieldset'] );

		update_post_meta( $post_id, Widget::META_SOURCE, $source );
		update_post_meta( $post_id, Widget::META_FIELDSET, $prepared );
	}

	/**
	 * Update source template from id to index.
	 *
	 * @param array $source    Source post meta data.
	 * @param array $migration Migration options.
	 *
	 * @return array Update source post meta data.
	 */
	private static function update_source_template( $source, $migration ) {
		if ( empty( $migration['templates'] ) ) {
			return $source;
		}

		if ( ! isset( $source['template'] ) ) {
			return $source;
		}

		$id = $source['template'];

		if ( isset( $migration['templates'][ $id ] ) ) {
			$source['template'] = $migration['templates'][ $id ];
		}

		return $source;
	}

	/**
	 * Add keys to templates and layers for legacy settings.
	 *
	 * @param array $legacy Legacy templates data.
	 */
	private static function add_templates_index( $legacy ) {
		$migration = array();
		$templates = array();

		foreach ( $legacy as $id => $template ) {
			$index = Templates::create_unique_index();

			$migration['templates'][ $id ] = $index;

			if ( ! empty( $template['layers'] ) ) {
				$template['layers'] = self::replace_layers_key( $template['layers'], $id, $migration );
			}

			$template = self::create_background_layer( $template, $id, $migration );

			// Add template with a new key.
			$templates[ $index ] = $template;
		}

		update_option( self::OPTION_MIGRATION, $migration );
		update_option( Templates::OPTION_TEMPLATES, $templates );
	}

	/**
	 * Replace key for the template layer.
	 *
	 * @param array $layers    List of template layers.
	 * @param int   $id        Legacy template id.
	 * @param array $migration Migration options. Passed by reference.
	 *
	 * @return array Updated list of template layers.
	 */
	private static function replace_layers_key( $layers, $id, &$migration ) {
		foreach ( $layers as $pos => $layer ) {
			$key = Templates::generate_layer_key();

			// Add layer with a new key.
			$layers[ $key ] = $layer;

			$migration['layers'][ $key ] = 'captions-' . $id . '-' . $pos;

			unset( $layers[ $pos ] );
		}

		$layers = array_reverse( $layers );

		return $layers;
	}

	/**
	 * Create new background layer from template data.
	 *
	 * @param array $template  Template data.
	 * @param int   $id        Legacy template id.
	 * @param array $migration Migration options. Passed by reference.
	 *
	 * @return array Updated template.
	 */
	private static function create_background_layer( $template, $id, &$migration ) {
		if ( empty( $template['background'] ) ) {
			return $template;
		}

		$background = $template['background'];

		if ( ! in_array( $background, array( 'dynamic', 'permanent' ), true ) ) {
			return $template;
		}

		$key = Templates::generate_layer_key();

		if ( ! isset( $template['layers'] ) ) {
			$template['layers'] = array();
		}

		$layer = array(
			'type'   => 'image',
			'x'      => 0,
			'y'      => 0,
			'width'  => 1200,
			'height' => 630,
		);

		if ( 'dynamic' === $background ) {
			$layer['dynamic'] = 'dynamic';
			$layer['preset']  = 'featured';
		}

		if ( ! empty( $template['attachment'] ) ) {
			$layer['attachment'] = $template['attachment'];
		}

		if ( ! empty( $template['width'] ) ) {
			$layer['width'] = $template['width'];
		}

		if ( ! empty( $template['height'] ) ) {
			$layer['height'] = $template['height'];
		}

		$migration['layers'][ $key ] = 'attachment-' . $id;

		// Add new layer to first layers position.
		$template['layers'] = array_merge( array( $key => $layer ), $template['layers'] );

		unset( $template['attachment'] );

		return $template;
	}
}
