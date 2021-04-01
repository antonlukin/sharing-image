<?php
/**
 * Settings page class
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Settings page class
 *
 * @class Settings
 */
class Settings {
	/**
	 * Admin screen id.
	 *
	 * @var string
	 */
	const SCREEN_ID = 'settings_page_sharing-image';

	/**
	 * Sharing Image templates options name.
	 *
	 * @var string
	 */
	const OPTION_TEMPLATES = 'sharing_image_templates';

	/**
	 * Sharing Image config options name.
	 *
	 * @var string
	 */
	const OPTION_CONFIG = 'sharing_image_config';

	/**
	 * List of settings tabs.
	 *
	 * @var array
	 */
	private $tabs = array();
	/**
	 * Settings constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );

		// Handle settings POST requests.
		add_action( 'admin_init', array( $this, 'handle_post_requests' ) );

		// Handle settins AJAX requests.
		add_action( 'admin_init', array( $this, 'handle_ajax_requests' ) );

		// Add settings link to plugins list.
		add_filter( 'plugin_action_links', array( $this, 'add_settings_link' ), 10, 2 );

		$this->init_tabs();
	}


	/**
	 * Add plugin settings page in WordPress menu.
	 */
	public function add_menu() {
		/**
		 * Easy way to hide settings page.
		 *
		 * @param bool $hide_settings Set true to hide settings page.
		 */
		$hide_settings = apply_filters( 'sharing_image_hide_settings', false );

		if ( $hide_settings ) {
			return;
		}

		add_options_page(
			esc_html__( 'Sharing Image settings', 'sharing-image' ),
			esc_html__( 'Sharing Image', 'sharing-image' ),
			'manage_options',
			SHARING_IMAGE_SLUG,
			array( $this, 'display_settings' )
		);

		// Add required assets and objects.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Handle settings POST requests.
	 */
	public function handle_post_requests() {
		$actions = array(
			'editor' => 'save_settings_template',
			'delete' => 'delete_settings_template',
		);

		foreach ( $actions as $key => $method ) {
			$action = 'sharing-image-' . $key;

			if ( method_exists( $this, $method ) ) {
				add_action( 'admin_post_' . $action, array( $this, $method ) );
			}
		}
	}

	/**
	 * Handle settings AJAX requests.
	 */
	public function handle_ajax_requests() {
		$actions = array(
			'show' => 'show_template_preview',
			'save' => 'save_template_preview',
		);

		foreach ( $actions as $key => $method ) {
			$action = 'sharing-image-' . $key;

			if ( method_exists( $this, $method ) ) {
				add_action( 'wp_ajax_' . $action, array( $this, $method ) );
			}
		}
	}

	/**
	 * Add settings link to plugins list.
	 *
	 * @param array  $actions     An array of plugin action links.
	 * @param string $plugin_file Path to the plugin file relative to the plugins directory.
	 */
	public function add_settings_link( $actions, $plugin_file ) {
		$actions = (array) $actions;

		if ( plugin_basename( SHARING_IMAGE_FILE ) === $plugin_file ) {
			$actions[] = sprintf(
				'<a href="%s">%s</a>',
				admin_url( 'options-general.php?page=' . SHARING_IMAGE_SLUG ),
				__( 'Settings', 'sharing-image' )
			);
		}

		return $actions;
	}

	/**
	 * Save template editor fields.
	 */
	public function save_settings_template() {
		check_admin_referer( 'sharing-image-settings', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to manage options for this site.', 'sharing-image' ) );
		}

		$link = admin_url( 'options-general.php?page=' . SHARING_IMAGE_SLUG );

		if ( ! isset( $_POST['sharing-image-index'] ) ) {
			return $this->redirect_with_message( $link, 2 );
		}

		$index = absint( wp_unslash( $_POST['sharing-image-index'] ) );

		if ( ! isset( $_POST['sharing-image-editor'] ) ) {
			return $this->redirect_with_message( $link, 2 );
		}

		$link = add_query_arg( array( 'template' => $index + 1 ), $link );

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = $this->sanitize_editor( wp_unslash( $_POST['sharing-image-editor'] ) );

		// Update settings template.
		$this->update_template( $editor, $index );

		return $this->redirect_with_message( $link, 1 );
	}

	/**
	 * Action to delete template from editor page.
	 */
	public function delete_settings_template() {
		check_admin_referer( 'sharing-image-settings', 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$link = admin_url( 'options-general.php?page=' . SHARING_IMAGE_SLUG );

		if ( ! isset( $_REQUEST['template'] ) ) {
			return $this->redirect_with_message( $link, 4 );
		}

		// Get index from template ID.
		$index = absint( $_REQUEST['template'] ) - 1;

		if ( ! $this->delete_template( $index ) ) {
			return $this->redirect_with_message( $link, 4 );
		}

		return $this->redirect_with_message( $link, 3 );
	}

	/**
	 * Show generated template from AJAX request.
	 */
	public function show_template_preview() {
		check_ajax_referer( 'sharing-image-settings', 'nonce' );

		$generator = new Generator();

		if ( ! isset( $_POST['sharing-image-index'] ) ) {
			wp_send_json_error( __( 'Poster index undefined.', 'sharing-image' ), 400 );
		}

		$index = absint( wp_unslash( $_POST['sharing-image-index'] ) );

		if ( ! isset( $_POST['sharing-image-editor'] ) ) {
			wp_send_json_error( __( 'Editor settings are not set.', 'sharing-image' ), 400 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = $this->sanitize_editor( wp_unslash( $_POST['sharing-image-editor'] ) );

		// Get background sample image.
		$image = sprintf( SHARING_IMAGE_DIR . '/assets/images/%d.jpg', ( $index % 12 ) + 1 );

		// Prepare generator.
		$poster = $generator->show( $editor, $image );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}
	}

	/**
	 * Show generated template from AJAX request.
	 */
	public function save_template_preview() {
		check_ajax_referer( 'sharing-image-settings', 'nonce' );

		$generator = new Generator();

		if ( ! isset( $_POST['sharing-image-index'] ) ) {
			wp_send_json_error( __( 'Poster index undefined.', 'sharing-image' ), 400 );
		}

		$index = absint( wp_unslash( $_POST['sharing-image-index'] ) );

		if ( ! isset( $_POST['sharing-image-editor'] ) ) {
			wp_send_json_error( __( 'Editor settings are not set.', 'sharing-image' ), 400 );
		}

		// phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$editor = $this->sanitize_editor( wp_unslash( $_POST['sharing-image-editor'] ) );

		// Get background sample image.
		$image = sprintf( SHARING_IMAGE_DIR . '/assets/images/%d.jpg', ( $index % 12 ) + 1 );

		// Prepare generator.
		$poster = $generator->save( $editor, $image );

		if ( is_wp_error( $poster ) ) {
			wp_send_json_error( $poster->get_error_message(), 400 );
		}

		wp_send_json_success( $poster );
	}

	/**
	 * Show plugin settings.
	 */
	public function display_settings() {
		if ( ! $this->is_settings_screen() ) {
			return;
		}

		include_once SHARING_IMAGE_DIR . '/templates/settings.php';
	}

	/**
	 * Enqueue settings styles.
	 */
	public function enqueue_styles() {
		if ( ! $this->is_settings_screen() ) {
			return;
		}

		wp_enqueue_style(
			'sharing-image-settings',
			SHARING_IMAGE_URL . '/assets/styles/settings.css',
			array(),
			SHARING_IMAGE_VERSION,
			'all'
		);
	}

	/**
	 * Enqueue settings scripts.
	 */
	public function enqueue_scripts() {
		if ( ! $this->is_settings_screen() ) {
			return;
		}

		wp_enqueue_script(
			'sharing-image-settings',
			SHARING_IMAGE_URL . '/assets/scripts/settings.js',
			array( 'wp-i18n', 'wp-polyfill-url' ),
			SHARING_IMAGE_VERSION,
			true
		);

		wp_enqueue_media();

		wp_set_script_translations( 'sharing-image-settings', 'sharing-image' );

		$object = array(
			'nonce'     => wp_create_nonce( 'sharing-image-settings' ),

			'links'     => array(
				'uploads' => esc_url( admin_url( 'upload.php' ) ),
			),
			'config'    => $this->get_config(),
			'templates' => $this->get_templates(),
		);

		wp_localize_script( 'sharing-image-settings', 'sharingImageSettings', $object );
	}

	/**
	 * Sanitize editor template settings.
	 *
	 * @param array $editor Template editor settings.
	 */
	public function sanitize_editor( $editor ) {
		$sanitized = array();

		if ( isset( $editor['preview'] ) ) {
			$sanitized['preview'] = sanitize_text_field( $editor['preview'] );
		}

		if ( isset( $editor['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $editor['title'] );
		}

		if ( ! empty( $editor['attachment'] ) ) {
			$sanitized['attachment'] = absint( $editor['attachment'] );
		}

		if ( ! empty( $editor['suspend'] ) ) {
			$sanitized['suspend'] = 'suspend';
		}

		$sanitized['background'] = 'dynamic';

		if ( isset( $editor['background'] ) ) {
			$background = array( 'dynamic', 'thumbnail', 'permanent' );

			// We can't use permanent background for templates with empty attachment.
			if ( empty( $sanitized['attachment'] ) ) {
				unset( $background['permanent'] );
			}

			if ( in_array( $editor['background'], $background, true ) ) {
				$sanitized['background'] = $editor['background'];
			}
		}

		if ( isset( $editor['width'] ) ) {
			$match = preg_match( '/^[\d]+%?$/', $editor['width'] );

			if ( $match ) {
				$sanitized['width'] = $editor['width'];
			}
		}

		if ( isset( $editor['height'] ) ) {
			$match = preg_match( '/^[\d]+%?$/', $editor['height'] );

			if ( $match ) {
				$sanitized['height'] = $editor['height'];
			}
		}

		if ( isset( $editor['layers'] ) && is_array( $editor['layers'] ) ) {
			$layers = array();

			foreach ( $editor['layers'] as $layer ) {
				if ( empty( $layer['type'] ) ) {
					continue;
				}

				switch ( $layer['type'] ) {
					case 'text':
						$layers[] = $this->sanitize_text_layer( $layer );
						break;

					case 'image':
						$layers[] = $this->sanitize_image_layer( $layer );
						break;

					case 'filter':
						$layers[] = $this->sanitize_filter_layer( $layer );
						break;

					case 'line':
						$layers[] = $this->sanitize_line_layer( $layer );
						break;

					case 'rectangle':
					case 'ellipse':
						$layers[] = $this->sanitize_figure_layer( $layer );
						break;
				}
			}

			$sanitized['layers'] = $layers;
		}

		/**
		 * Filters template editor sanitized fields.
		 *
		 * @param array $sanitized List of sanitized editor fields.
		 * @param array $editor    List of editor fields before sanitization.
		 */
		return apply_filters( 'sharing_image_sanitize_editor', $sanitized, $editor );
	}

	/**
	 * Sanitize template editor text layer.
	 *
	 * @param array $layer Layer settings.
	 */
	public function sanitize_text_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['dynamic'] ) ) {
			$sanitized['dynamic'] = 'dynamic';
		}

		if ( isset( $layer['title'] ) ) {
			$sanitized['title'] = sanitize_text_field( $layer['title'] );
		}

		if ( isset( $layer['inscription'] ) ) {
			$sanitized['inscription'] = sanitize_textarea_field( $layer['inscription'] );
		}

		if ( isset( $layer['sample'] ) ) {
			$sanitized['sample'] = sanitize_textarea_field( $layer['sample'] );
		}

		$sanitized['preset'] = 'none';

		if ( isset( $layer['preset'] ) ) {
			$preset = array( 'title', 'excerpt' );

			if ( in_array( $layer['preset'], $preset, true ) ) {
				$sanitized['preset'] = $layer['preset'];
			}
		}

		$sanitized['color'] = '#000000';

		if ( ! empty( $layer['color'] ) ) {
			$sanitized['color'] = sanitize_hex_color( $layer['color'] );
		}

		$sanitized['horizontal'] = 'left';

		if ( isset( $layer['horizontal'] ) ) {
			$horizontal = array( 'center', 'right' );

			if ( in_array( $layer['horizontal'], $horizontal, true ) ) {
				$sanitized['horizontal'] = $layer['horizontal'];
			}
		}

		$sanitized['vertical'] = 'top';

		if ( isset( $layer['vertical'] ) ) {
			$vertical = array( 'center', 'bottom' );

			if ( in_array( $layer['vertical'], $vertical, true ) ) {
				$sanitized['vertical'] = $layer['vertical'];
			}
		}

		if ( isset( $layer['fontsize'] ) ) {
			$sanitized['fontsize'] = absint( $layer['fontsize'] );
		}

		if ( isset( $layer['lineheight'] ) ) {
			$sanitized['lineheight'] = (float) $layer['lineheight'];
		}

		if ( isset( $layer['font'] ) ) {
			$sanitized['font'] = sanitize_text_field( $layer['font'] );
		}

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( isset( $layer[ $size ] ) ) {
				$sanitized[ $size ] = absint( $layer[ $size ] );
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize template editor image layer.
	 *
	 * @param array $layer Layer settings.
	 */
	public function sanitize_image_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['attachment'] ) ) {
			$sanitized['attachment'] = absint( $layer['attachment'] );
		}

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( isset( $layer[ $size ] ) ) {
				$match = preg_match( '/^[\d]+%?$/', $layer[ $size ] );

				if ( $match ) {
					$sanitized[ $size ] = $layer[ $size ];
				}
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize template editor filter layer.
	 *
	 * @param array $layer Layer settings.
	 */
	public function sanitize_filter_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['grayscale'] ) ) {
			$sanitized['grayscale'] = 'grayscale';
		}

		$sanitized['brightness'] = 0;

		if ( isset( $layer['brightness'] ) ) {
			$brightness = (int) $layer['brightness'];

			if ( $brightness >= -255 && $brightness <= 255 ) {
				$sanitized['brightness'] = $brightness;
			}
		}

		$sanitized['contrast'] = 0;

		if ( isset( $layer['contrast'] ) ) {
			$contrast = (int) $layer['contrast'];

			if ( $contrast >= -100 && $contrast <= 100 ) {
				$sanitized['contrast'] = $contrast;
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize template editor ellipse and rectagle layers.
	 *
	 * @param array $layer Layer settings.
	 */
	public function sanitize_figure_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['outline'] ) ) {
			$sanitized['outline'] = 'outline';
		}

		$sanitized['color'] = '#000000';

		if ( ! empty( $layer['color'] ) ) {
			$sanitized['color'] = sanitize_hex_color( $layer['color'] );
		}

		$sanitized['opacity'] = 0;

		if ( isset( $layer['opacity'] ) ) {
			$opacity = (float) $layer['opacity'];

			if ( $opacity >= 0 && $opacity <= 1 ) {
				$sanitized['opacity'] = $opacity;
			}
		}

		$sizes = array( 'x', 'y', 'width', 'height' );

		foreach ( $sizes as $size ) {
			if ( isset( $layer[ $size ] ) ) {
				$sanitized[ $size ] = absint( $layer[ $size ] );
			}
		}

		return $sanitized;
	}

	/**
	 * Sanitize template editor line layer.
	 *
	 * @param array $layer Layer settings.
	 */
	public function sanitize_line_layer( $layer ) {
		$sanitized = array();

		// No need to sanitize after switch.
		$sanitized['type'] = $layer['type'];

		if ( ! empty( $layer['dashed'] ) ) {
			$sanitized['dashed'] = 'dashed';
		}

		$sanitized['color'] = '#000000';

		if ( ! empty( $layer['color'] ) ) {
			$sanitized['color'] = sanitize_hex_color( $layer['color'] );
		}

		$sanitized['opacity'] = 0;

		if ( isset( $layer['opacity'] ) ) {
			$opacity = (float) $layer['opacity'];

			if ( $opacity >= 0 && $opacity <= 1 ) {
				$sanitized['opacity'] = $opacity;
			}
		}

		$sizes = array( 'x1', 'y1', 'x2', 'y2' );

		foreach ( $sizes as $size ) {
			if ( isset( $layer[ $size ] ) ) {
				$sanitized[ $size ] = absint( $layer[ $size ] );
			}
		}

		return $sanitized;
	}

	/**
	 * Get plugin config settings.
	 *
	 * @return array List of plugin config settings.
	 */
	public function get_config() {
		$config = get_option( self::OPTION_CONFIG, array() );

		/**
		 * Filters settigns config.
		 *
		 * @return array List of plugin config settings.
		 */
		return apply_filters( 'sharing_image_get_config', $config );
	}

	/**
	 * Get templates list from options.
	 *
	 * @return array List of templates.
	 */
	public function get_templates() {
		$templates = get_option( self::OPTION_TEMPLATES, array() );

		/**
		 * Filters list of templates.
		 *
		 * @param array $templates List of templates.
		 */
		return apply_filters( 'sharing_image_get_templates', $templates );
	}

	/**
	 * Update templates in options.
	 *
	 * @param array $templates List of new templates.
	 */
	public function update_templates( $templates ) {
		/**
		 * Filters list of templates before update in database.
		 *
		 * @param array $templates List of templates.
		 */
		$templates = apply_filters( 'sharing_image_update_templates', $templates );

		return update_option( self::OPTION_TEMPLATES, $templates );
	}

	/**
	 * Update single template by index.
	 *
	 * @param array $editor New template data.
	 * @param int   $index  Template index to update.
	 */
	public function update_template( $editor, $index ) {
		$templates = $this->get_templates();

		$templates[ $index ] = $editor;

		// Reindex templates array.
		$templates = array_values( $templates );

		return $this->update_templates( $templates );
	}

	/**
	 * Delete template by index.
	 *
	 * @param int $index Template index to delete.
	 */
	public function delete_template( $index ) {
		$templates = $this->get_templates();

		unset( $templates[ $index ] );

		// Reindex templates array.
		$templates = array_values( $templates );

		return $this->update_templates( $templates );
	}

	/**
	 * Get list of settings page tabs
	 */
	private function init_tabs() {
		$tabs = array(
			'templates' => array(
				'label'   => __( 'Templates', 'sharing-image' ),
				'link'    => admin_url( 'options-general.php?page=' . SHARING_IMAGE_SLUG ),
				'default' => true,
			),
			'config'  => array(
				'label' => __( 'Configuration', 'sharing-image' ),
				'link'  => admin_url( 'options-general.php?page=' . SHARING_IMAGE_SLUG . '&tab=config' ),
			),
			'premium' => array(
				'label' => __( 'Premium', 'sharing-image' ),
				'link'  => admin_url( 'options-general.php?page=' . SHARING_IMAGE_SLUG . '&tab=premium' ),
			),
		);

		/**
		 * Filter tabs in settings page.
		 *
		 * @param array $tabs List of settings tabs.
		 */
		$this->tabs = apply_filters( 'sharing_image_settings_tabs', $tabs );
	}

	/**
	 * Show settings tab template.
	 */
	private function show_settings_section() {
		$tab = $this->get_current_tab();

		/*
		if ( ! empty( $tab ) ) {
			include_once SHARING_IMAGE_DIR . '/templates/premium.php';
		}*/
	}

	/**
	 * Show settings messages and errors after post actions.
	 */
	private function show_settings_message() {
		// phpcs:ignore WordPress.Security.NonceVerification
		$message = isset( $_GET['message'] ) ? absint( $_GET['message'] ) : 0;

		switch ( $message ) {
			case 1:
				add_settings_error( 'sharing-image', 'settings', __( 'Settings successfully updated.', 'sharing-image' ), 'updated' );
				break;

			case 2:
				add_settings_error( 'sharing-image', 'settings', __( 'Failed to save template settings.', 'sharing-image' ) );
				break;

			case 3:
				add_settings_error( 'sharing-image', 'settings', __( 'Template successfully deleted.', 'sharing-image' ), 'updated' );
				break;

			case 4:
				add_settings_error( 'sharing-image', 'settings', __( 'Failed to delete template.', 'sharing-image' ) );
				break;
		}

		settings_errors( 'sharing-image' );
	}

	/**
	 * Print menu on settings page.
	 */
	private function show_settings_menu() {
		$current = $this->get_current_tab();

		foreach ( $this->tabs as $tab => $args ) {
			$classes = array(
				'sharing-image-tab',
			);

			if ( $current === $tab ) {
				$classes[] = 'active';
			}

			printf(
				'<a href="%2$s" class="%1$s">%3$s</a>',
				esc_attr( implode( ' ', $classes ) ),
				esc_url( $args['link'] ),
				esc_html( $args['label'] )
			);
		}
	}

	/**
	 * Get current tab.
	 *
	 * @return string $tab Current tab name.
	 */
	private function get_current_tab() {
		// phpcs:disable WordPress.Security.NonceVerification
		if ( isset( $_GET['tab'] ) ) {
			$tab = sanitize_file_name( wp_unslash( $_GET['tab'] ) );

			if ( array_key_exists( $tab, $this->tabs ) ) {
				return $tab;
			}
		}
		// phpcs:enable WordPress.Security.NonceVerification

		foreach ( $this->tabs as $tab => $args ) {
			if ( isset( $args['default'] ) && $args['default'] ) {
				return $tab;
			}
		}

		return null;
	}

	/**
	 * Add message id to the back link and redirect
	 *
	 * @param string $link    Back link.
	 * @param int    $message Settings error message id.
	 */
	private function redirect_with_message( $link, $message ) {
		$link = add_query_arg( array( 'message' => $message ), $link );

		wp_safe_redirect( $link );
		exit;
	}

	/**
	 * Is current admin screen the plugin options screen.
	 *
	 * @return bool
	 */
	private function is_settings_screen() {
		$current_screen = get_current_screen();

		if ( $current_screen && self::SCREEN_ID === $current_screen->id ) {
			return true;
		}

		return false;
	}
}
