/* global ajaxurl:true */
import Build from '../builders';

import './styles.scss';

// Store global script object for metabox.
let params = null;

// Picker HTML element.
let picker = null;

/**
 * Show picker warning message.
 *
 * @param {string} message Warning message.
 */
function showPickerError( message ) {
	const warning = picker.querySelector( '.sharing-image-picker-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.add( 'warning-visible' );
	warning.textContent = message || wp.i18n.__( 'Unknown generation error', 'sharing-image' );
}

/**
 * Remove warning message block.
 */
function hidePickerError() {
	const warning = picker.querySelector( '.sharing-image-picker-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.remove( 'warning-visible' );
}

/**
 * Handle poster generation action.
 */
function generatePoster() {
	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	picker.classList.add( 'picker-loader' );

	// Create data form data bundle.
	const bundle = new window.FormData();
	bundle.set( 'action', 'sharing_image_generate' );

	picker.querySelectorAll( '[name]' ).forEach( ( field ) => {
		bundle.append( field.name, field.value );
	} );

	hidePickerError();

	const poster = picker.querySelector( '.sharing-image-picker-poster' );

	request.addEventListener( 'load', () => {
		const response = request.response || {};

		// Hide preview loader on request complete.
		picker.classList.remove( 'picker-loader' );

		if ( ! response.data ) {
			return showPickerError();
		}

		if ( ! response.success ) {
			return showPickerError( response.data );
		}

		for ( const key in response.data ) {
			poster.querySelectorAll( 'input' ).forEach( ( input ) => {
				const name = params.name + '[' + key + ']';

				if ( name === input.name ) {
					input.value = response.data[ key ];
				}
			} );
		}

		let image = poster.querySelector( 'img' );

		if ( null === image ) {
			image = Build.element( 'img', {
				append: poster,
			} );
		}

		image.src = response.data.poster;

		// Show the poster.
		picker.classList.add( 'picker-visible' );
	} );

	request.addEventListener( 'error', () => {
		showPickerError();

		// Hide preview loader on request complete.
		picker.classList.remove( 'picker-loader' );
	} );

	request.send( bundle );
}

/**
 * Create designer template selector.
 *
 * @param {HTMLElement} designer Designer element.
 * @param {Object}      selected Seleted template.
 */
function createTemplate( designer, selected ) {
	const fields = {};

	params.templates.forEach( ( template, i ) => {
		fields[ i ] = template.title || wp.i18n.__( 'Untitled', 'sharing-image' );
	} );

	const template = Build.select(
		{
			classes: [ 'sharing-image-picker-template' ],
			options: fields,
			attributes: {
				name: params.name + '[template]',
			},
			selected: String( selected ),
		},
		designer
	);

	template.addEventListener( 'change', () => {
		const fieldset = designer.querySelectorAll( '.sharing-image-picker-fieldset' );

		for ( let i = 0; i < fieldset.length; i++ ) {
			fieldset[ i ].classList.remove( 'fieldset-visible' );

			if ( i === parseInt( template.value ) ) {
				fieldset[ i ].classList.add( 'fieldset-visible' );
			}
		}
	} );

	return template;
}

/**
 * Try to prefill caption field.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */
function fillCaptionPreset( textarea, preset ) {
	const source = document.getElementById( preset );

	if ( null === source ) {
		return;
	}

	const updateCaption = () => {
		textarea.value = source.value;
	};

	source.addEventListener( 'change', updateCaption );

	// Stop textarea update after first user input.
	textarea.addEventListener( 'change', () => {
		source.removeEventListener( 'change', updateCaption );
	} );

	updateCaption();
}

/**
 * Create designer attachment field for dynamic background.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      template Template data.
 * @param {Array}       values   Template fieldset values.
 * @param {string}      name     Field name attribute.
 */
function createDesignerAttachment( fieldset, template, values, name ) {
	if ( 'dynamic' !== template.background ) {
		return;
	}

	Build.media( {
		name: name + '[attachment]',
		classes: [ 'sharing-image-picker-media' ],
		value: values.attachment,
		link: params.links.uploads,
		labels: {
			button: wp.i18n.__( 'Upload background', 'sharing-image' ),
			heading: wp.i18n.__( 'Select background image', 'sharing-image' ),
			details: wp.i18n.__( 'Attachment', 'sharing-image' ),
		},
		append: fieldset,
	} );
}

/**
 * Create designer captions for text layers.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      template Template data.
 * @param {Array}       values   Template fieldset values.
 * @param {string}      name     Field name attribute.
 */
function createDesignerCaptions( fieldset, template, values, name ) {
	const captions = values.captions || [];

	// Set default layers list.
	template.layers = template.layers || [];

	template.layers.forEach( ( layer, n ) => {
		if ( 'text' !== layer.type || ! layer.dynamic ) {
			return;
		}

		const textarea = Build.textarea(
			{
				classes: [ 'sharing-image-picker-caption' ],
				label: layer.title || null,
				attributes: {
					name: name + `[captions][${ n }]`,
				},
			},
			fieldset
		);

		if ( ! captions[ n ] ) {
			fillCaptionPreset( textarea, layer.preset );
		}

		textarea.textContent = captions[ n ];
	} );
}

/**
 * Create fields designer.
 *
 * @param {Object} data Picker data object.
 */
function createDesigner( data ) {
	const designer = Build.element( 'div', {
		classes: [ 'sharing-image-picker-designer' ],
	} );

	let selected = data.template || 0;

	// Reset selected template if index undefined.
	if ( ! params.templates[ selected ] ) {
		selected = 0;
	}

	if ( params.templates.length > 1 ) {
		createTemplate( designer, selected );
	}

	params.templates.forEach( ( template, i ) => {
		template.layers = template.layers || [];

		const fieldset = Build.element( 'div', {
			classes: [ 'sharing-image-picker-fieldset' ],
			append: designer,
		} );

		if ( i === parseInt( selected ) ) {
			fieldset.classList.add( 'fieldset-visible' );
		}

		let values = {};

		if ( data.fieldset && data.fieldset[ i ] ) {
			values = data.fieldset[ i ];
		}

		const name = params.name + `[fieldset][${ i }]`;

		Build.element( 'input', {
			attributes: {
				type: 'hidden',
				name: name,
			},
			append: fieldset,
		} );

		createDesignerAttachment( fieldset, template, values, name );
		createDesignerCaptions( fieldset, template, values, name );
	} );

	picker.appendChild( designer );

	return designer;
}

/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createGenerateButton( manager ) {
	const button = Build.element( 'button', {
		classes: [ 'sharing-image-picker-generate', 'button' ],
		text: wp.i18n.__( 'Generate', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', () => {
		generatePoster();
	} );
}

/**
 * Create button to delete current metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createDeleteButton( manager ) {
	const button = Build.element( 'button', {
		classes: [ 'sharing-image-picker-delete', 'button', 'button-delete' ],
		text: wp.i18n.__( 'Remove', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', () => {
		const image = picker.querySelector( '.sharing-image-picker-poster img' );

		if ( null === image ) {
			return;
		}

		const poster = image.parentNode;
		poster.removeChild( image );

		poster.querySelectorAll( 'input' ).forEach( ( input ) => {
			input.value = '';
		} );

		picker.classList.remove( 'picker-visible' );
	} );
}

/**
 * Create picker manager.
 *
 * @param {HTMLElement} designer Designer element.
 */
function createManager( designer ) {
	const manager = Build.element( 'div', {
		classes: [ 'sharing-image-picker-manager' ],
		append: designer,
	} );

	createGenerateButton( manager );
	createDeleteButton( manager );

	Build.element( 'span', {
		classes: [ 'sharing-image-picker-spinner', 'spinner' ],
		append: manager,
	} );
}

/**
 * Create poster block.
 *
 * @param {Object} data Picker data object.
 */
function createPoster( data ) {
	const poster = Build.element( 'div', {
		classes: [ 'sharing-image-picker-poster' ],
		append: picker,
	} );

	if ( data.poster ) {
		Build.element( 'img', {
			attributes: {
				src: data.poster,
				alt: '',
			},
			append: poster,
		} );

		picker.classList.add( 'picker-visible' );
	}

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name + '[poster]',
			value: data.poster,
		},
		append: poster,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name + '[width]',
			value: data.width,
		},
		append: poster,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name + '[height]',
			value: data.height,
		},
		append: poster,
	} );
}

/**
 * Check that the poster sizes are set or show an error message.
 *
 * @param {Object} data Picker data object.
 */
function showSizesWarning( data ) {
	if ( ! data.poster ) {
		return;
	}

	if ( ! data.width || ! data.height ) {
		showPickerError( wp.i18n.__( 'Image sizes are not set. Regenerate the poster.', 'sharing-image' ) );
	}
}

/**
 * Build metabox fields.
 *
 * @param {HTMLElement} widget   Widget element.
 * @param {Object}      settings Global settings object.
 */
function buildPicker( widget, settings ) {
	params = settings;

	// Set params name for template form fields.
	params.name = 'sharing_image_picker';

	while ( widget.firstChild ) {
		widget.removeChild( widget.lastChild );
	}

	picker = Build.element( 'div', {
		classes: [ 'sharing-image-picker' ],
		append: widget,
	} );

	const data = params.meta || {};

	createPoster( data );

	// Create fields designer.
	const designer = createDesigner( data );

	Build.element( 'div', {
		classes: [ 'sharing-image-picker-warning' ],
		append: designer,
	} );

	createManager( designer );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: picker,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_screen',
			value: params.screen,
		},
		append: picker,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_context',
			value: params.context,
		},
		append: picker,
	} );

	showSizesWarning( data );
}

/**
 * Init metabox handler.
 */
( function () {
	if ( typeof 'undefined' === wp ) {
		return;
	}

	const object = window.sharingImageWidget || {};

	// Set default templates empty list.
	object.templates = object.templates || [];

	// Find metabox element.
	const widgets = document.querySelectorAll( '.sharing-image-widget' );

	widgets.forEach( ( widget ) => {
		if ( object.context ) {
			widget.classList.add( `widget-${ object.context }` );
		}

		buildPicker( widget, object );
	} );
} )();
