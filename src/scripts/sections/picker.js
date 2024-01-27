/**
 * Metabox handler.
 */
/* global ajaxurl:true */

import Build from '../builders';

// Store global script object for metabox.
let params = null;

// Picker HTML element.
let picker = null;

// Is gutenberg editor used.
let gutenberg = false;

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
		designer,
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
 * Prefill caption fields for classic editor.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */
function fillClassicEditorPreset( textarea, preset ) {
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
 * Prefill caption fields for block editor.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */
function fillBlockEditorPreset( textarea, preset ) {
	const getAttribute = () => {
		return wp.data.select( 'core/editor' ).getEditedPostAttribute( preset );
	};

	let attribute = getAttribute();

	wp.data.subscribe( () => {
		const updated = getAttribute();

		if ( attribute !== updated ) {
			textarea.textContent = updated;
		}

		attribute = updated;
	} );
}

/**
 * Try to prefill caption field.
 *
 * @param {HTMLElement} textarea Caption textarea field.
 * @param {string}      preset   Preset field.
 */
function fillCaptionPreset( textarea, preset ) {
	if ( gutenberg ) {
		return fillBlockEditorPreset( textarea, preset );
	}

	fillClassicEditorPreset( textarea, preset );
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
			fieldset,
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
 * Get new config with AJAX call and reinit metabox.
 *
 * @param {HTMLElement} widget Widget element.
 */
const rebuildPicker = ( widget ) => {
	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	picker.classList.add( 'picker-loader' );

	// We need post ID for this request.
	const postId = wp.data.select( 'core/editor' ).getCurrentPostId();

	// Create data form data bundle.
	const bundle = new window.FormData();
	bundle.set( 'action', 'sharing_image_rebuild' );
	bundle.set( 'post', postId );

	picker.querySelectorAll( '[name]' ).forEach( ( field ) => {
		if ( 'sharing_image_nonce' === field.name ) {
			bundle.append( field.name, field.value );
		}
	} );

	hidePickerError();

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

		buildPicker( widget, response.data );
	} );

	request.addEventListener( 'error', () => {
		showPickerError();

		// Hide preview loader on request complete.
		picker.classList.remove( 'picker-loader' );
	} );

	request.send( bundle );
};

/**
 * Wait Gutenberg post saving and reinit tasks list.
 *
 * @param {HTMLElement} widget Widget element.
 */
const subscribeOnSaving = ( widget ) => {
	let wasSavingPost = wp.data.select( 'core/edit-post' ).isSavingMetaBoxes();

	wp.data.subscribe( () => {
		const isSavingPost = wp.data.select( 'core/edit-post' ).isSavingMetaBoxes();

		if ( wasSavingPost && ! isSavingPost ) {
			rebuildPicker( widget );
		}

		wasSavingPost = isSavingPost;
	} );
};

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

	if ( 'term' === params.context ) {
		const title = Build.element( 'div', {
			classes: [ 'sharing-image-title' ],
			append: widget,
		} );

		Build.element( 'strong', {
			text: wp.i18n.__( 'Sharing Image', 'sharing-image' ),
			append: title,
		} );
	}

	picker = Build.element( 'div', {
		classes: [ 'sharing-image-picker' ],
		append: widget,
	} );

	const data = params.meta || {};

	// Create fields designer.
	const designer = createDesigner( data );

	Build.element( 'div', {
		classes: [ 'sharing-image-picker-warning' ],
		append: designer,
	} );

	createManager( designer );

	createPoster( data );

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
 * Create metabox generator picker and subscribe to events.
 *
 * @param {HTMLElement} widget   Widget element.
 * @param {Object}      settings Global settings object.
 */
function createPicker( widget, settings ) {
	if ( wp.data && wp.data.select( 'core/editor' ) ) {
		gutenberg = true;
	}

	buildPicker( widget, settings );

	if ( gutenberg ) {
		subscribeOnSaving( widget );
	}
}

export default createPicker;
