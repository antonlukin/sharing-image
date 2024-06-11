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
		add_action( 'admin_init', array( $this, 'migrate_database' ) );
	}


	/**
	 * Migrate database if needed.
	 */
	public function migrate_database() {
		$config = $this->settings->get_config();

		if ( empty( $config['version'] ) ) {
			$this->add_templates_index();
		}

		// TODO: here
		// $config['version'] = '3.0';

		$this->settings->update_config( $config );
	}

	/**
	 * Add keys to templates and layers for legacy settings.
	 */
	private function add_templates_index() {
		$templates = get_option( Settings::OPTION_TEMPLATES, null );

		if ( empty( $templates ) ) {
			$templates = array();
		}

		$settings = $this->settings;

		foreach ( $templates as $i => $template ) {
			$index = $settings->create_unique_index();

			if ( ! empty( $template['layers'] ) ) {
				$template['layers'] = $this->replace_layers_key( $template['layers'] );
			}

			if ( ! empty( $template['attachment'] ) ) {
				$template = $this->create_background_layer( $template );
			}

			// Add template with a new key.
			$templates[ $index ] = $template;

			unset( $templates[ $i ] );
		}

		update_option( Settings::OPTION_TEMPLATES, $templates );
	}

	/**
	 * Create new background layer from template data.
	 *
	 * @param array $template Template data.
	 */
	private function create_background_layer( $template ) {
		unset( $template['attachment'] );

		return $template;
	}

	/**
	 * Replace key for the template layer.
	 *
	 * @param array $layers List of template layers.
	 */
	private function replace_layers_key( $layers ) {
		$settings = $this->settings;

		foreach ( $layers as $i => $layer ) {
			$key = $settings->generate_layer_key();

			// Add layer with a new key.
			$layers[ $key ] = $layer;

			unset( $layers[ $i ] );
		}

		return $layers;
	}
}
