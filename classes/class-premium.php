<?php
/**
 * Handle premium tab on settings page and provide static methods.
 *
 * @package sharing-image
 * @author  Anton Lukin
 */

namespace Sharing_Image;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Premium class.
 *
 * @class Premium
 */
class Premium {
	/**
	 * Sharing Image license options name.
	 *
	 * @var string
	 */
	const OPTION_LICENSE = 'sharing_image_license';

	/**
	 * Remote licenses API url.
	 *
	 * @var string
	 */
	const REMOTE_LICENSES = 'https://wpset.org/sharing-image/verify/';

	/**
	 * Premium verification event name.
	 *
	 * @var string
	 */
	const EVENT_PREMIUM = 'sharing_image_event_premium';

	/**
	 * Init class actions and filters.
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'handle_requests' ) );
		add_action( self::EVENT_PREMIUM, array( __CLASS__, 'launch_verification_event' ), 10, 1 );
		add_action( 'load-settings_page_' . Settings::SETTINGS_SLUG, array( __CLASS__, 'check_verification_event' ) );
	}

	/**
	 * Handle premium requests from admin-side.
	 */
	public static function handle_requests() {
		add_action( 'wp_ajax_sharing_image_verify_premium', array( __CLASS__, 'verify_premium_key' ) );
		add_action( 'wp_ajax_sharing_image_revoke_premium', array( __CLASS__, 'revoke_premium_access' ) );
	}

	/**
	 * Verify Premium key from AJAX request.
	 */
	public static function verify_premium_key() {
		$check = check_ajax_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Please reload the page and try again.', 'sharing-image' ), 403 );
		}

		if ( empty( $_POST['sharing_image_key'] ) ) {
			wp_send_json_error( __( 'Premium key is undefined.', 'sharing-image' ), 400 );
		}

		$key = sanitize_text_field( wp_unslash( $_POST['sharing_image_key'] ) );

		$args = array(
			'body' => array(
				'key'    => $key,
				'domain' => wp_parse_url( site_url(), PHP_URL_HOST ),
			),
		);

		$response = wp_remote_post( self::REMOTE_LICENSES, $args );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( __( 'Remote request error: ', 'sharing-image' ) . $response->get_error_message(), 400 );
		}

		$answer = json_decode( $response['body'], true );

		if ( ! isset( $answer['success'] ) ) {
			wp_send_json_error( __( 'Invalid response received from the verification server.', 'sharing-image' ), 400 );
		}

		wp_unschedule_hook( self::EVENT_PREMIUM );

		if ( true === $answer['success'] ) {
			$license = self::update_license( true, $key );

			self::schedule_verification();

			wp_send_json_success( $license );
		}

		$error = array(
			'success' => false,
			'data'    => __( 'Verification unsuccessful.', 'sharing-image' ),
		);

		if ( isset( $answer['result'] ) ) {
			$error['code'] = $answer['result'];
		}

		self::update_license( false, $key );

		wp_send_json( $error, 403 );
	}

	/**
	 * Revoke Premium access from AJAX request.
	 */
	public static function revoke_premium_access() {
		$check = check_ajax_referer( Settings::SETTINGS_NONCE, 'sharing_image_nonce', false );

		if ( false === $check ) {
			wp_send_json_error( __( 'Invalid security token. Please reload the page and try again.', 'sharing-image' ), 403 );
		}

		// Remove license verification event.
		wp_unschedule_hook( self::EVENT_PREMIUM );

		// Disable Premium license.
		$license = self::update_license( false );

		wp_send_json_success( $license );
	}


	/**
	 * Get plugin license settings.
	 *
	 * @return array List of plugin license settings.
	 */
	public static function get_license() {
		$license = get_option( self::OPTION_LICENSE, array() );

		/**
		 * Check if the plugin in development mode.
		 *
		 * @param bool Current development state. Disabled by default.
		 */
		$develop = apply_filters( 'sharing_image_develop', false );

		if ( $develop ) {
			$license['develop'] = true;
		}

		/**
		 * Filters license settings.
		 *
		 * @param array List of plugin license settings.
		 */
		return apply_filters( 'sharing_image_get_license', $license );
	}

	/**
	 * Set license options.
	 *
	 * @param bool   $premium Premium status.
	 * @param string $key     License key.
	 * @param string $error   Verification error code.

	 * @return array License options.
	 */
	public static function update_license( $premium, $key = '', $error = '' ) {
		$license = get_option( self::OPTION_LICENSE, array() );

		if ( ! empty( $key ) ) {
			$license['key'] = $key;
		}

		unset( $license['error'] );

		if ( ! empty( $error ) ) {
			$license['error'] = $error;
		}

		$license['premium'] = $premium;

		// Save updated license settings in database.
		update_option( self::OPTION_LICENSE, $license );

		return $license;
	}

	/**
	 * Launch scheduled license verification event.
	 * Do not disable Premium if the verification server does not respond.
	 *
	 * @param string|null $key Optional. Legacy license key.
	 */
	public static function launch_verification_event( $key = null ) {
		if ( ! is_null( $key ) ) {
			self::reschedule_verification(); // For backward compatibility before version 3.0.
		}

		$license = self::get_license();

		if ( ! empty( $license['instant'] ) || ! empty( $license['develop'] ) ) {
			return;
		}

		if ( empty( $license['key'] ) ) {
			return self::update_license( false, '' );
		}

		$args = array(
			'body' => array(
				'key'    => $license['key'],
				'domain' => wp_parse_url( site_url(), PHP_URL_HOST ),
			),
		);

		$response = wp_remote_post( self::REMOTE_LICENSES, $args );

		if ( is_wp_error( $response ) ) {
			return;
		}

		$answer = json_decode( $response['body'], true );

		if ( ! isset( $answer['success'] ) ) {
			return;
		}

		if ( true === $answer['success'] ) {
			return self::update_license( true, $license['key'] );
		}

		if ( ! isset( $answer['result'] ) ) {
			return self::update_license( false, $license['key'] );
		}

		self::update_license( false, $license['key'], $answer['result'] );
	}

	/**
	 * Check if Premium features availible.
	 *
	 * @return bool Whether premium features are enabled.
	 */
	public static function is_premium_features() {
		$license = self::get_license();

		if ( ! empty( $license['premium'] ) || ! empty( $license['develop'] ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Reschedule license verification on load settings page.
	 */
	public static function check_verification_event() {
		$license = self::get_license();

		if ( empty( $license['premium'] ) || ! empty( $license['instant'] ) ) {
			return;
		}

		self::schedule_verification();
	}

	/**
	 * Schedule license verification.
	 */
	public static function schedule_verification() {
		if ( wp_next_scheduled( self::EVENT_PREMIUM ) ) {
			return;
		}

		wp_schedule_event( time() + DAY_IN_SECONDS / 2, 'twicedaily', self::EVENT_PREMIUM );
	}

	/**
	 * Delete all events with the same name and schedule again.
	 */
	public static function reschedule_verification() {
		wp_unschedule_hook( self::EVENT_PREMIUM );

		self::schedule_verification();
	}
}
