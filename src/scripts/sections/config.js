/**
 * Config settings tab.
 */

import Build from '../builders';

// Store global script object for settings page.
let params = null;

/**
 * Create default poster option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createDefaultOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Default poster', 'sharing-image' ),
		append: options,
	} );

	Build.media( {
		name: params.name + '[default]',
		classes: [ 'sharing-image-config-control-media' ],
		label: wp.i18n.__( 'Default poster', 'sharing-image' ),
		value: data.default,
		link: params.links.uploads,
		labels: {
			button: wp.i18n.__( 'Upload image', 'sharing-image' ),
			heading: wp.i18n.__( 'Select default poster', 'sharing-image' ),
			details: wp.i18n.__( 'Attachment details', 'sharing-image' ),
			remove: wp.i18n.__( 'Remove image', 'sharing-image' ),
		},
		remove: true,
		append: control,
	} );

	const description = [];

	description.push(
		wp.i18n.__( 'The default poster is used on pages where there is no generated.', 'sharing-image' ),
	);

	description.push( wp.i18n.__( 'Best image size: 1200×630 pixels.', 'sharing-image' ) );

	Build.element( 'small', {
		text: description.join( ' ' ),
		append: control,
	} );
}

/**
 * Create uploads directory option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createUploadsOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Upload directory', 'sharing-image' ),
		append: options,
	} );

	const fieldset = Build.element( 'div', {
		classes: [ 'sharing-image-config-control-fieldset' ],
		append: control,
	} );

	Build.radio(
		{
			classes: [ 'sharing-image-config-control-radio' ],
			attributes: {
				name: params.name + '[uploads]',
				value: 'default',
			},
			label: wp.i18n.__( 'Use default uploads directory', 'sharing-image' ),
			checked: data.uploads || 'default',
		},
		fieldset,
	);

	Build.radio(
		{
			classes: [ 'sharing-image-config-control-radio' ],
			attributes: {
				name: params.name + '[uploads]',
				value: 'custom',
			},
			label: wp.i18n.__( 'Choose custom storage for posters', 'sharing-image' ),
			checked: data.uploads || 'default',
		},
		fieldset,
	);

	const input = Build.input(
		{
			classes: [ 'sharing-image-config-control-input' ],
			attributes: {
				name: params.name + '[storage]',
				value: data.storage || params.links.storage,
				disabled: 'disabled',
			},
		},
		control,
	);

	Build.element( 'small', {
		text: wp.i18n.__( 'Use relative path from site root. Directory should be writeable.', 'sharing-image' ),
		append: control,
	} );

	control.querySelectorAll( 'input' ).forEach( ( radio ) => {
		if ( 'radio' !== radio.type ) {
			return;
		}

		// Show storage input for checked custom radio.
		if ( radio.checked && 'custom' === radio.value ) {
			input.disabled = false;
		}

		radio.addEventListener( 'change', () => {
			input.disabled = true;

			if ( 'custom' === radio.value ) {
				input.disabled = false;
			}
		} );
	} );
}

/**
 * Create format and quality poster options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createImageOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-config-control', 'control-extra' ],
		label: wp.i18n.__( 'Poster image format', 'sharing-image' ),
		help: wp.i18n.__( 'The higher the value, the less compression. Availible for JPEG only.', 'sharing-image' ),
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-config-control-select' ],
				options: {
					jpg: wp.i18n.__( 'JPEG', 'sharing-image' ),
					png: wp.i18n.__( 'PNG', 'sharing-image' ),
					gif: wp.i18n.__( 'GIF', 'sharing-image' ),
				},
				attributes: {
					name: params.name + '[format]',
				},
				selected: data.format || 'jpg',
			},
			{
				group: 'input',
				classes: [ 'sharing-image-config-control-range' ],
				attributes: {
					type: 'range',
					name: params.name + '[quality]',
					min: 10,
					max: 100,
					step: 5,
					value: data.quality || '90',
					disabled: 'disabled',
				},
				label: wp.i18n.__( 'Image quality', 'sharing-image' ),
			},
		],
		append: options,
	} );

	// Find control format select.
	const format = control.querySelector( 'select' );

	// Find control quiality input.
	const quality = control.querySelector( 'input' );

	if ( 'jpg' === format.value ) {
		quality.disabled = false;
	}

	format.addEventListener( 'change', () => {
		quality.disabled = true;

		if ( 'jpg' === format.value ) {
			quality.disabled = false;
		}
	} );
}

/**
 * Create autogenerate poster options.
 *
 * @param {HTMLElement} options   Options form element.
 * @param {Object}      data      Config data object.
 * @param {Array}       templates List of templates.
 */
function createAutogenerateOptions( options, data, templates ) {
	const fields = {};

	// Add the option for disabling feature.
	fields.manual = wp.i18n.__( 'Disable auto generation', 'sharing-image' );

	templates.forEach( ( template, i ) => {
		fields[ i ] = template.title || wp.i18n.__( 'Untitled', 'sharing-image' );
	} );

	let selected = data.autogenerate;

	if ( typeof selected === 'undefined' ) {
		selected = 'manual';
	}

	Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Auto generate poster', 'sharing-image' ),
		help: wp.i18n.__( 'This template will be applied automatically on post save.', 'sharing-image' ),
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-config-control-select' ],
				options: fields,
				attributes: {
					name: params.name + '[autogenerate]',
				},
				selected: String( selected ),
			},
		],
		append: options,
	} );
}

function createLiveReloadOptions( options, data ) {
	Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Live-reload', 'sharing-image' ),
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-config-control-checkbox' ],
				attributes: {
					name: params.name + '[suspend]',
					value: 'suspend',
				},
				label: wp.i18n.__( 'Disable live-reload on the template editor screen', 'sharing-image' ),
				checked: data.suspend,
			},
		],
		append: options,
	} );
}

/**
 * Create required form meta fields.
 *
 * @param {HTMLElement} options Options form element.
 */
function createMetaFields( options ) {
	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'action',
			value: params.name,
		},
		append: options,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: options,
	} );

	Build.element( 'button', {
		text: wp.i18n.__( 'Save changes', 'sharing-image' ),
		classes: [ 'button', 'button-primary' ],
		attributes: {
			type: 'submit',
		},
		append: options,
	} );
}

/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */
function createConfig( content, settings ) {
	params = settings;

	// Set params name for config form fields.
	params.name = 'sharing_image_config';

	// Find config element
	const config = content.querySelector( '.sharing-image-config' );

	if ( null === config ) {
		return;
	}

	const options = Build.element( 'form', {
		classes: [ 'sharing-image-config-options' ],
		attributes: {
			action: params.links.action,
			method: 'POST',
		},
		append: config,
	} );

	const data = params.config || {};
	const templates = params.templates || [];

	// Poster image options.
	createImageOptions( options, data );

	// Autogenerate poster.
	createAutogenerateOptions( options, data, templates );

	// Uploads directory options.
	createUploadsOptions( options, data );

	// Live-reload options.
	createLiveReloadOptions( options, data );

	// Default poster.
	createDefaultOptions( options, data );

	// Create required form fields.
	createMetaFields( options );
}

export default createConfig;
