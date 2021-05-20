/**
 * Config settings tab.
 */

import Build from '../builders';

const { __ } = wp.i18n;

// Store global scriot object for settings page.
let params = null;

/**
 * Create default poster option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object} data Config data object.
 */
function createRestOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-control', 'control-config', 'control-rest' ],
		label: __( 'Default poster', 'sharing-image' ),
		append: options,
	} );

	Build.media( {
		name: params.name + '[default]',
		classes: [ 'sharing-image-control-media' ],
		label: __( 'Default poster', 'sharing-image' ),
		value: data.rest,
		link: params.links.uploads,
		labels: {
			button: __( 'Upload image', 'sharing-image' ),
			heading: __( 'Select default poster', 'sharing-image' ),
			details: __( 'Attachment details', 'sharing-image' ),
		},
		append: control,
	} );

	const description = [];

	description.push( __( 'The default poster is used on pages where there is no generated.', 'sharing-image' ) );
	description.push( __( 'Best image size: 1200×630 pixels.', 'sharing-image' ) );

	Build.element( 'small', {
		text: description.join( ' ' ),
		append: control,
	} );
}

/**
 * Create uploads directory option.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object} data Config data object.
 */
function createUploadsOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-control', 'control-config', 'control-filepath' ],
		label: __( 'Upload directory', 'sharing-image' ),
		append: options,
	} );

	const fieldset = Build.element( 'div', {
		classes: [ 'sharing-image-control-fieldset' ],
		append: control,
	} );

	Build.radio(
		{
			classes: [ 'sharing-image-control-radio' ],
			attributes: {
				name: params.name + '[uploads]',
				value: 'default',
			},
			label: __( 'Use default uploads directory', 'sharing-image' ),
			checked: data.uploads || 'default',
		},
		fieldset
	);

	Build.radio(
		{
			classes: [ 'sharing-image-control-radio' ],
			attributes: {
				name: params.name + '[uploads]',
				value: 'custom',
			},
			label: __( 'Choose custom storage for posters', 'sharing-image' ),
			checked: data.uploads || 'default',
		},
		fieldset
	);

	const input = Build.input(
		{
			classes: [ 'sharing-image-control-input' ],
			attributes: {
				name: params.name + '[filepath]',
				value: data.filepath || params.links.filepath,
				disabled: 'disabled',
			},
		},
		control
	);

	// Find all radio fields.
	const fields = control.querySelectorAll( 'input[type="radio"]' );

	fields.forEach( ( radio ) => {
		// Show filepath input for checked custom radio.
		if ( radio.checked && 'custom' === radio.value ) {
			input.removeAttribute( 'disabled', 'disabled' );
		}

		radio.addEventListener( 'change', () => {
			input.setAttribute( 'disabled', 'disabled' );

			if ( 'custom' === radio.value ) {
				input.removeAttribute( 'disabled' );
			}
		} );
	} );
}

/**
 * Create format and quality poster options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object} data Config data object.
 */
function createImageOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-control', 'control-config', 'control-format' ],
		label: __( 'Poster image format', 'sharing-image' ),
		help: __( 'The higher the value, the less compression. Availible for JPEG only.', 'sharing-image' ),
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-control-select' ],
				options: {
					jpg: __( 'JPEG', 'sharing-image' ),
					png: __( 'PNG', 'sharing-image' ),
				},
				attributes: {
					name: params.name + '[format]',
				},
				selected: data.format || 'jpg',
			},
			{
				group: 'input',
				classes: [ 'sharing-image-control-range' ],
				attributes: {
					type: 'range',
					name: params.name + '[quality]',
					min: 0,
					max: 100,
					step: 5,
					value: data.quality || '95',
					disabled: 'disabled',
				},
				label: __( 'Image quality', 'sharing-image' ),
			},
		],
		append: options,
	} );

	// Find control format select.
	const format = control.querySelector( 'select' );

	// Find control quiality input.
	const quality = control.querySelector( 'input' );

	if ( 'jpg' === format.value ) {
		quality.removeAttribute( 'disabled' );
	}

	format.addEventListener( 'change', () => {
		quality.setAttribute( 'disabled', 'disabled' );

		if ( 'jpg' === format.value ) {
			quality.removeAttribute( 'disabled' );
		}
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
		text: __( 'Save changes', 'sharing-image' ),
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
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings field.
 */
function createConfig( content, settings ) {
	params = settings;

	// Set params name for template form fields.
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

	// Poster image options.
	createImageOptions( options, data );

	// Uploads directory options.
	createUploadsOptions( options, data );

	// Rest poster.
	createRestOptions( options, data );

	// Create required form fields
	createMetaFields( options );
}

export default createConfig;
