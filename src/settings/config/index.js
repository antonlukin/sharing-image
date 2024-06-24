/**
 * Config settings tab.
 */

import Build from '../../builders';
import './styles.scss';

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
		value: data.default,
		link: params.links.uploads,
		labels: {
			button: wp.i18n.__( 'Upload image', 'sharing-image' ),
			heading: wp.i18n.__( 'Select default poster', 'sharing-image' ),
			details: wp.i18n.__( 'Attachment details', 'sharing-image' ),
			remove: wp.i18n.__( 'Remove image', 'sharing-image' ),
		},
		image: true,
		remove: true,
		append: control,
	} );

	const description = [];

	description.push( wp.i18n.__( 'The default poster is used on pages where none is generated.', 'sharing-image' ) );
	description.push( wp.i18n.__( 'Best image size: 1200×630 pixels.', 'sharing-image' ) );

	Build.element( 'small', {
		text: description.join( ' ' ),
		append: control,
	} );

	return control;
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
		fieldset
	);

	Build.radio(
		{
			classes: [ 'sharing-image-config-control-radio' ],
			attributes: {
				name: params.name + '[uploads]',
				value: 'custom',
			},
			label: wp.i18n.__( 'Select custom storage for posters', 'sharing-image' ),
			checked: data.uploads || 'default',
		},
		fieldset
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
		control
	);

	Build.element( 'small', {
		text: wp.i18n.__(
			'Use a relative path from the site root. The directory should be writable.',
			'sharing-image'
		),
		append: control,
	} );

	control.querySelectorAll( 'input' ).forEach( ( radio ) => {
		if ( 'radio' !== radio.type ) {
			return;
		}

		// Show storage input for checked custom radio.
		if ( radio.checked && radio.value === 'custom' ) {
			input.disabled = false;
		}

		radio.addEventListener( 'change', () => {
			input.disabled = true;

			if ( radio.value === 'custom' ) {
				input.disabled = false;
			}
		} );
	} );

	return control;
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

	if ( format.value === 'jpg' ) {
		quality.disabled = false;
	}

	format.addEventListener( 'change', () => {
		quality.disabled = true;

		if ( format.value === 'jpg' ) {
			quality.disabled = false;
		}
	} );

	return control;
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

	// Add empty option to disable feature.
	fields[ '' ] = wp.i18n.__( 'Disable auto generation', 'sharing-image' );

	for ( const i in templates ) {
		fields[ i ] = templates[ i ].title || wp.i18n.__( 'Untitled', 'sharing-image' );
	}

	let selected = data.autogenerate;

	if ( typeof selected === 'undefined' ) {
		selected = '';
	}

	const control = Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Auto generate poster', 'sharing-image' ),
		help: wp.i18n.__( 'This template will be applied automatically when the post is saved.', 'sharing-image' ),
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

	return control;
}

/**
 * Create hiding widget options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createHideWidgetOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Hide post widget', 'sharing-image' ),
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-config-control-checkbox' ],
				attributes: {
					name: params.name + '[nowidget]',
					value: 'nowidget',
				},
				label: wp.i18n.__( 'Hide the widget on the post editor page', 'sharing-image' ),
				checked: data.nowidget,
			},
		],
		append: options,
	} );

	return control;
}

/**
 * Create header meta options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createMetaOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-config-control', 'control-extra' ],
		label: wp.i18n.__( 'Header Meta Tags', 'sharing-image' ),
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-config-control-select' ],
				options: {
					snippets: wp.i18n.__( 'Display Meta Tags with consideration for SEO plugins', 'sharing-image' ),
					custom: wp.i18n.__( 'Always display Meta Tags on all pages', 'sharing-image' ),
					hidden: wp.i18n.__( 'Hide Sharing Image Meta Tags', 'sharing-image' ),
				},
				attributes: {
					name: params.name + '[meta]',
				},
				selected: data.meta || 'snippets',
			},
		],
		append: options,
	} );

	if ( params.snippets.length === 0 ) {
		return control;
	}

	Build.element( 'h4', {
		text: wp.i18n.__( 'Detected SEO plugins', 'sharing-image' ),
		append: control,
	} );

	const list = Build.element( 'ul', {
		classes: [ 'sharing-image-config-control-list' ],
		append: control,
	} );

	params.snippets.forEach( ( snippet ) => {
		const item = Build.element( 'li', {
			append: list,
		} );

		Build.element( 'a', {
			attributes: {
				href: snippet.link,
				target: '_blank',
				rel: 'noopener',
			},
			text: snippet.title,
			append: item,
		} );
	} );

	return control;
}

/**
 * Live Reload options
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createLiveReloadOptions( options, data ) {
	const control = Build.control( {
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
				label: wp.i18n.__( 'Disable live reload on the template editor screen.', 'sharing-image' ),
				checked: data.suspend,
			},
		],
		append: options,
	} );

	return control;
}

/**
 * Attachment options.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createAttachmentOptions( options, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-config-control' ],
		label: wp.i18n.__( 'Poster attachment', 'sharing-image' ),
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-config-control-checkbox' ],
				attributes: {
					name: params.name + '[attachment]',
					value: 'attachment',
				},
				label: wp.i18n.__( 'Save the generated poster as an attachment in the media library', 'sharing-image' ),
				checked: data.attachment,
			},
		],
		append: options,
	} );

	return control;
}

/**
 * Create required form meta fields.
 *
 * @param {HTMLElement} options Options form element.
 * @param {Object}      data    Config data object.
 */
function createCommonFields( options, data ) {
	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'action',
			value: 'sharing_image_save_config',
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

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name + '[demo]',
			value: data.demo || '',
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

	// Hide widget and sidebar.
	createHideWidgetOptions( options, data );

	// Header meta options.
	createMetaOptions( options, data );

	// Attachment options.
	createAttachmentOptions( options, data );

	// Uploads directory options.
	createUploadsOptions( options, data );

	// Live-reload options.
	createLiveReloadOptions( options, data );

	// Default poster.
	createDefaultOptions( options, data );

	// Create required form fields.
	createCommonFields( options, data );
}

export default createConfig;
