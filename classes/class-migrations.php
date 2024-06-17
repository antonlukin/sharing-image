<?php
/**
 * Migrations class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Migrations class
 *
 * @class Migrations
 */
class Migrations {
	/**
	 * The instance of Settings class.
	 *
	 * @var instance
	 */
	private $settings;

	/**
	 * Widget constructor.
	 */
	public function __construct() {
		$this->settings = new Settings();
	}

	/**
	 * Init class actions and filters.
	 */
	public function init() {
		add_action( 'admin_init', array( $this, 'update_version' ) );
		add_action( 'admin_init', array( $this, 'migrate_templates' ) );

		add_action( 'load-post.php', array( $this, 'migrate_post_fieldset' ) );
	}

	/**
	 * Update version if needed.
	 */
	public function update_version() {
		$config = $this->settings->get_config();

		// Default version if not defined.
		$version = '2.0';

		if ( ! empty( $config['version'] ) ) {
			$version = $config['version'];
		}

		// Skip migrations if version matches.
		if ( version_compare( $version, SHARING_IMAGE_VERSION, '=' ) ) {
			return;
		}

		$config['version'] = SHARING_IMAGE_VERSION;

		$this->settings->update_config( $config );
	}

	/**
	 * Migrate database from version 2.0 to 3.0
	 */
	public function migrate_templates() {
		$legacy = get_option( 'sharing_image_templates' );

		if ( empty( $legacy ) ) {
			return;
		}

		$templates = get_option( Settings::OPTION_TEMPLATES, null );

		if ( ! is_null( $templates ) ) {
			return;
		}

		$this->add_templates_index( $legacy );

		delete_option( 'sharing_image_templates' );
	}

	/**
	 * Migrate fieldset in edit screen.
	 */
	public function migrate_post_fieldset() {
		// phpcs:ignore WordPress.Security.NonceVerification
		$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;

		if ( empty( $post_id ) ) {
			return;
		}

		$source = get_post_meta( $post_id, Widget::META_SOURCE, true );

		if ( empty( $source['fieldset'] ) ) {
			return;
		}

		$migrated = array();
		$fieldset = $source['fieldset'];

		foreach ( $this->settings->get_templates() as $template ) {
			if ( empty( $template['layers'] ) ) {
				continue;
			}

			foreach ( $template['layers'] as $key => $layer ) {
				if ( empty( $layer['legacy'] ) ) {
					continue;
				}

				list( $field, $id, $pos ) = array_pad( explode( '-', $layer['legacy'] ), 3, null );

				if ( is_null( $pos ) && ! empty( $fieldset[ $id ][ $field ] ) ) {
					$migrated[ $key ] = $fieldset[ $id ][ $field ];
				}

				if ( ! is_null( $pos ) && ! empty( $fieldset[ $id ][ $field ][ $pos ] ) ) {
					$migrated[ $key ] = $fieldset[ $id ][ $field ][ $pos ];
				}
			}
		}

		unset( $source['fieldset'] );

		update_post_meta( $post_id, Widget::META_SOURCE, $source );
		update_post_meta( $post_id, Widget::META_FIELDSET, $migrated );
	}

	/**
	 * Add keys to templates and layers for legacy settings.
	 *
	 * @param array $legacy Legacy templates data.
	 */
	private function add_templates_index( $legacy ) {
		$templates = array();

		foreach ( $legacy as $id => $template ) {
			$index = $this->settings->create_unique_index();

			if ( ! empty( $template['layers'] ) ) {
				$template['layers'] = $this->replace_layers_key( $template['layers'], $id );
			}

			$template = $this->create_background_layer( $template, $id );

			// Add template with a new key.
			$templates[ $index ] = $template;
		}

		update_option( Settings::OPTION_TEMPLATES, $templates );
	}

	/**
	 * Create new background layer from template data.
	 *
	 * @param array $template Template data.
	 * @param int   $id       Legacy template id.
	 */
	private function create_background_layer( $template, $id ) {
		if ( empty( $template['background'] ) ) {
			return $template;
		}

		$background = $template['background'];

		if ( ! in_array( $background, array( 'dynamic', 'permanent' ), true ) ) {
			return $template;
		}

		if ( ! isset( $template['layers'] ) ) {
			$template['layers'] = array();
		}

		$layer = array(
			'type'   => 'image',
			'x'      => 0,
			'y'      => 0,
			'width'  => 1200,
			'height' => 630,
			'legacy' => 'attachment-' . $id,
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

		unset( $template['attachment'] );

		$item = array( $this->settings->generate_layer_key() => $layer );

		// Add new layer to first layers position.
		$template['layers'] = array_merge( $item, $template['layers'] );

		return $template;
	}

	/**
	 * Replace key for the template layer.
	 *
	 * @param array $layers List of template layers.
	 * @param int   $id     Legacy template id.
	 */
	private function replace_layers_key( $layers, $id ) {
		foreach ( $layers as $pos => $layer ) {
			$key = $this->settings->generate_layer_key();

			$layer['legacy'] = 'captions-' . $id . '-' . $pos;

			// Add layer with a new key.
			$layers[ $key ] = $layer;

			unset( $layers[ $pos ] );
		}

		return $layers;
	}
}
