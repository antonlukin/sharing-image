/**
 * Tools settings tab.
 */

import Build from '../builders';

// Store global script object for settings page.
let params = null;

/**
 * Create export options block.
 *
 * @param {HTMLElement} options Options form element.
 */
function createExportOptions( options ) {
	const control = Build.control( {
		classes: [ 'sharing-image-tools-control' ],
		label: wp.i18n.__( 'Export templates', 'sharing-image' ),
		append: options,
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
 * @param {HTMLElement} options Options form element.
 */
function createImportOptions( options ) {
	const control = Build.control( {
		classes: [ 'sharing-image-tools-control' ],
		label: wp.i18n.__( 'Import templates', 'sharing-image' ),
		append: options,
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

	const options = Build.element( 'form', {
		classes: [ 'sharing-image-tools-options' ],
		attributes: {
			action: params.links.action,
			method: 'POST',
		},
		append: tools,
	} );

	// Export options.
	createExportOptions( options );

	// Export options.
	createImportOptions( options );
}

export default createTools;
