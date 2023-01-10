/**
 * Premium settings tab.
 */
/* global ajaxurl:true */

import Build from '../builders';

// Store global scriot object for settings page.
let params = null;

// Premium HTML emelent.
let premium = null;

/**
 * Parse error code from settings or AJAX response.
 *
 * @param {string} code  Error code from settings or AJAX response.
 * @param {string} title Prepended error title. Optional.
 */
function parseErrorCode( code, title ) {
	const message = [];

	if ( undefined === title ) {
		title = wp.i18n.__( 'Verification failed.', 'sharing-image' );
	}

	message.push( title );

	switch ( code ) {
		case 'LIMIT_EXCEEDED':
			message.push( wp.i18n.__( 'The number of licenses for this key has been exceeded.', 'sharing-image' ) );

			break;

		case 'KEY_NOT_FOUND':
			message.push( wp.i18n.__( 'Premium key is invalid or expired.', 'sharing-image' ) );

			break;

		case 'SERVER_ERROR':
			message.push( wp.i18n.__( 'Unable to get a response from the verification server.', 'sharing-image' ) );

			break;
	}

	return message.join( ' ' );
}

/**
 * Show premium warning message.
 *
 * @param {string} message Warning message.
 */
function showPremiumError( message ) {
	// Try to find warning element.
	const warning = premium.querySelector( '.sharing-image-premium-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.add( 'warning-visible' );
	warning.textContent = message || wp.i18n.__( 'Unknown request error', 'sharing-image' );
}

/**
 * Remove warning message block.
 */
function hidePremiumError() {
	// Try to find warning element.
	const warning = premium.querySelector( '.sharing-image-premium-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.remove( 'warning-visible' );
}

/**
 * Revoke Premium key.
 *
 * @param {HTMLElement} access Access form element.
 */
function revokePremium( access ) {
	access.classList.add( 'access-loader' );

	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	// Create data bundle using form data.
	const bundle = new window.FormData( access );
	bundle.set( 'action', 'sharing_image_revoke' );

	hidePremiumError();

	request.addEventListener( 'load', () => {
		const response = request.response || {};

		// Hide form loader class.
		access.classList.remove( 'access-loader' );

		if ( ! response.data ) {
			return showPremiumError();
		}

		if ( ! response.success ) {
			return showPremiumError( response.data );
		}

		params.license = response.data;

		// Refresh premium fields.
		preparePremiumFields();
	} );

	request.addEventListener( 'error', () => {
		showPremiumError();

		// Hide form loader class.
		access.classList.remove( 'access-loader' );
	} );

	request.send( bundle );
}

/**
 * Verify Premium key.
 *
 * @param {HTMLElement} access Access form element.
 */
function verifyPremium( access ) {
	access.classList.add( 'access-loader' );

	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	// Create data bundle using form data.
	const bundle = new window.FormData( access );
	bundle.set( 'action', 'sharing_image_verify' );

	hidePremiumError();

	request.addEventListener( 'load', () => {
		const response = request.response || {};

		// Hide form loader class.
		access.classList.remove( 'access-loader' );

		if ( ! response.data ) {
			return showPremiumError();
		}

		if ( ! response.success ) {
			return showPremiumError( parseErrorCode( response.code, response.data ) );
		}

		params.license = response.data;

		// Refresh premium fields.
		preparePremiumFields();
	} );

	request.addEventListener( 'error', () => {
		showPremiumError();

		// Hide form loader class.
		access.classList.remove( 'access-loader' );
	} );

	request.send( bundle );
}

/**
 * Show verify form if stil not premium.
 *
 * @param {HTMLElement} access  Access HTML element.
 * @param {Object}      license License data.
 */
function showVerifyForm( access, license ) {
	if ( license.error ) {
		showPremiumError( parseErrorCode( license.error ) );
	}

	Build.element( 'strong', {
		text: wp.i18n.__( 'Do you already have a key? Enter it here', 'sharing-image' ),
		append: access,
	} );

	const verify = Build.element( 'div', {
		classes: [ 'sharing-image-premium-verify' ],
		append: access,
	} );

	Build.element( 'input', {
		label: wp.i18n.__( 'Your Premium key', 'sharing-image' ),
		attributes: {
			type: 'text',
			name: 'sharing_image_key',
			value: license.key,
		},
		append: verify,
	} );

	Build.element( 'button', {
		classes: [ 'button' ],
		text: wp.i18n.__( 'Submit', 'sharing-image' ),
		attributes: {
			type: 'submit',
		},
		append: verify,
	} );

	Build.element( 'span', {
		classes: [ 'spinner' ],
		append: verify,
	} );

	access.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		verifyPremium( access );
	} );
}

/**
 * Show alert for develop license mode.
 */
function showDevelopAlert() {
	showPremiumError(
		wp.i18n.__( 'Using plugin with a development license is prohibited in production.', 'sharing-image' ),
	);
}

/**
 * Show revoke Premium button.
 *
 * @param {HTMLElement} access Access HTML element.
 */
function showRevokeButton( access ) {
	const revoke = Build.element( 'div', {
		classes: [ 'sharing-image-premium-revoke' ],
		append: access,
	} );

	const description = [];

	description.push(
		wp.i18n.__( 'Disabling premium mode will not remove the license for this domain.', 'sharing-image' ),
	);

	description.push(
		wp.i18n.__( 'Your current key will also be saved in the plugin settings.', 'sharing-image' ),
	);

	description.push(
		wp.i18n.__( 'Use key management tool to delete the license for the site.', 'sharing-image' ),
	);

	Build.element( 'p', {
		text: description.join( ' ' ),
		append: revoke,
	} );

	Build.element( 'button', {
		classes: [ 'button' ],
		text: wp.i18n.__( 'Disable Premium' ),
		attributes: {
			type: 'submit',
		},
		append: revoke,
	} );

	Build.element( 'span', {
		classes: [ 'spinner' ],
		append: revoke,
	} );

	access.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		revokePremium( access );
	} );
}

/**
 * Show permit information.
 *
 * @param {HTMLElement} access Access HTML element.
 * @param {string}      key    License key from settings.
 */
function showLicenseInfo( access, key ) {
	const permit = Build.element( 'div', {
		classes: [ 'sharing-image-premium-permit' ],
		append: access,
	} );

	const button = Build.element( 'button', {
		classes: [ 'sharing-image-premium-show', 'button' ],
		text: wp.i18n.__( 'Show License key' ),
		attributes: {
			type: 'button',
		},
		append: permit,
	} );

	button.addEventListener( 'click', () => {
		permit.classList.toggle( 'permit-visible' );
	} );

	Build.element( 'strong', {
		text: key,
		append: permit,
	} );

	return permit;
}

/**
 * Show fields if user has the license.
 *
 * @param {HTMLElement} access  Access HTML element.
 * @param {Object}      license License data.
 */
function showPremiumData( access, license ) {
	premium.classList.add( 'premium-enabled' );

	if ( license.develop ) {
		return showDevelopAlert();
	}

	if ( license.key ) {
		showLicenseInfo( access, license.key );
	}

	showRevokeButton( access );
}

/**
 * Set premium fields according settings.
 */
function preparePremiumFields() {
	let access = premium.querySelector( '.sharing-image-premium-access' );

	if ( null !== access ) {
		premium.removeChild( access );
	}

	access = Build.element( 'form', {
		classes: [ 'sharing-image-premium-access' ],
		attributes: {
			action: '',
			method: 'POST',
		},
		append: premium,
	} );

	premium.classList.remove( 'premium-enabled' );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: access,
	} );

	const license = params.license || {};

	// Show fields if user has the license.
	if ( license.premium || license.develop ) {
		return showPremiumData( access, license );
	}

	return showVerifyForm( access, license );
}

/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */
function createPremium( content, settings ) {
	params = settings;

	// Find premium element
	premium = content.querySelector( '.sharing-image-premium' );

	if ( null === premium ) {
		return;
	}

	Build.element( 'div', {
		classes: [ 'sharing-image-premium-warning' ],
		append: premium,
	} );

	preparePremiumFields();
}

export default createPremium;
