/**
 * Tools settings tab.
 */

import Build from '../../../builders';
import './styles.scss';

// Store global script object for settings page.
let params = null;

/**
 * Create export options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */
function createExportOptions( tools ) {
	const control = Build.control( {
		classes: [ 'sharing-image-tools-control' ],
		label: wp.i18n.__( 'Export templates', 'sharing-image' ),
		append: tools,
	} );

	const fieldset = Build.element( 'div', {
		classes: [ 'sharing-image-tools-control-fieldset' ],
		append: control,
	} );

	// Set template index to delete link.
	const link = new URL( params.links.action );

	link.searchParams.set( 'action', 'sharing_image_export' );
	link.searchParams.set( 'nonce', params.nonce );

	Build.element( 'a', {
		classes: [ 'button', 'button-primary' ],
		text: wp.i18n.__( 'Download backup file', 'sharing-image' ),
		attributes: {
			href: link.href,
		},
		append: fieldset,
	} );

	Build.element( 'small', {
		text: wp.i18n.__( 'Save a local copy of all template settings for later use.', 'sharing-image' ),
		append: fieldset,
	} );
}

/**
 * Create import options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */
function createImportOptions( tools ) {
	const control = Build.control( {
		classes: [ 'sharing-image-tools-control' ],
		label: wp.i18n.__( 'Import templates', 'sharing-image' ),
		append: tools,
	} );

	const uploader = Build.element( 'form', {
		classes: [ 'sharing-image-tools-control-uploader' ],
		attributes: {
			action: params.links.action,
			method: 'POST',
			enctype: 'multipart/form-data',
		},
		append: control,
	} );

	Build.element( 'input', {
		classes: [ 'sharing-image-tools-control-file' ],
		attributes: {
			type: 'file',
			name: 'sharing_image_import',
			accept: 'application/json',
			required: 'required',
		},
		append: uploader,
	} );

	Build.element( 'button', {
		classes: [ 'button', 'button-primary' ],
		attributes: {
			type: 'submit',
		},
		text: wp.i18n.__( 'Import templates', 'sharing-image' ),
		append: uploader,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'action',
			value: 'sharing_image_import',
		},
		append: uploader,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: uploader,
	} );
}

/**
 * Create import options block.
 *
 * @param {HTMLElement} tools Tools wrapper element.
 */
function createCloningOptions( tools ) {
	const templates = params.templates || [];

	const control = Build.control( {
		classes: [ 'sharing-image-tools-control', 'control-section' ],
		label: wp.i18n.__( 'Clone template', 'sharing-image' ),
		append: tools,
	} );

	const warning = Build.element( 'p', {
		classes: [ 'sharing-image-tools-warning' ],
		text: wp.i18n.__( 'You need to enable Premium and create at least one template.', 'sharing-image' ),
	} );

	const license = params.license || {};

	if ( templates.length === 0 || ( ! license.premium && ! license.develop ) ) {
		return control.appendChild( warning );
	}

	const fields = {};

	for ( const i in templates ) {
		fields[ i ] = templates[ i ].title || wp.i18n.__( 'Untitled', 'sharing-image' );
	}

	const cloning = Build.element( 'form', {
		classes: [ 'sharing-image-tools-control-cloning' ],
		attributes: {
			action: params.links.action,
			method: 'POST',
		},
		append: control,
	} );

	const select = Build.select(
		{
			classes: [ 'sharing-image-tools-control-duplicator' ],
			options: fields,
			attributes: {
				name: 'sharing_image_clone',
			},
		},
		cloning
	);

	Build.element( 'button', {
		classes: [ 'button', 'button-primary' ],
		attributes: {
			type: 'submit',
		},
		text: wp.i18n.__( 'Create a copy', 'sharing-image' ),
		append: select.parentNode,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'action',
			value: 'sharing_image_clone',
		},
		append: cloning,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: cloning,
	} );
}

/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */
function createTools( content, settings ) {
	params = settings;

	// Find tools element
	const tools = content.querySelector( '.sharing-image-tools' );

	if ( null === tools ) {
		return;
	}

	// Cloning options.
	createCloningOptions( tools );

	// Export options.
	createExportOptions( tools );

	// Import options.
	createImportOptions( tools );
}

export default createTools;
