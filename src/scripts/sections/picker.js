/**
 * Metabox handler.
 */
/* global ajaxurl:true */

import Build from '../builders';

const { __ } = wp.i18n;

// Store global script object for metabox.
let params = null;

// Poster element.
let poster = null;

/**
 * Handle poster generation action.
 *
 * @param {HTMLElement} picker Picker element.
 */
function generatePoster( picker ) {
	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	poster.classList.add( 'poster-loader' );

	// Create data form data bundle.
	const bundle = new window.FormData();
	bundle.set( 'action', 'sharing_image_generate' );

	const fields = picker.querySelectorAll( '[name]' );

	fields.forEach( ( field ) => {
		bundle.append( field.name, field.value );
	} );

	// Hide preview loader on request complete.
	request.onreadystatechange = () => {
		if ( request.readyState === 4 ) {
			poster.classList.remove( 'poster-loader' );
		}
	};

	request.onload = () => {
		poster.classList.add( 'poster-visible' );
		// data can be empty.
		// add errors.
		// add input.

		const response = request.response || {};

		let image = poster.querySelector( 'img' );

		if ( null === image ) {
			image = Build.element( 'img', {
				append: poster,
			} );
		}

		const input = poster.querySelector( 'input' );
		input.value = response.data;

		// Set new blob image source.
		image.src = response.data;
	};

	request.send( bundle );
}

/**
 * Create designer template selector.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {HTMLElement} designer Designer element.
 * @param {Object} data Custom data object.
 */
function createTemplate( picker, designer, data ) {
	const fields = {};

	params.templates.forEach( ( template, i ) => {
		fields[ i ] = template.title || __( 'Untitled', 'sharing-image' );
	} );

	const template = Build.select(
		{
			classes: [ 'sharing-image-picker-template' ],
			options: fields,
			attributes: {
				name: params.name + '[template]',
			},
			selected: String( data.template ),
		},
		picker
	);

	template.addEventListener( 'change', () => {
		const fieldset = designer.childNodes;

		for ( let i = 0; i < fieldset.length; i++ ) {
			fieldset[ i ].classList.remove( 'fieldset-visible' );

			if ( i === parseInt( template.value ) ) {
				fieldset[ i ].classList.add( 'fieldset-visible' );
			}
		}
	} );

	return template;
}

function createDesignerAttachment( fieldset, template, values, name ) {
	params.links = params.links || {};

	if ( 'dynamic' === template.background ) {
		Build.media( {
			name: name + '[attachment]',
			classes: [ 'sharing-image-picker-details' ],
			value: values.attachment || '',
			link: params.links.uploads,
			labels: {
				button: __( 'Upload background', 'sharing-image' ),
				heading: __( 'Select background image', 'sharing-image' ),
				details: __( 'Attachment', 'sharing-image' ),
			},
			append: fieldset,
		} );
	}
}

function createDesignerCaptions( fieldset, template, values, name ) {
	// Set default layers list.
	template.layers = template.layers || [];

	template.layers.forEach( ( layer, n ) => {
		if ( 'text' === layer.type && layer.dynamic ) {
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

			if ( values.captions && values.captions[ n ] ) {
				textarea.textContent = values.captions[ n ];
			}
		}
	} );
}

/**
 * Create fields designer.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {Object} data Custom data object.
 */
function createDesigner( picker, data ) {
	const designer = Build.element( 'div', {
		classes: [ 'sharing-image-picker-designer' ],
	} );

	// Create designer fields
	params.templates.forEach( ( template, i ) => {
		// Set default layers list.
		template.layers = template.layers || [];

		const fieldset = Build.element( 'div', {
			classes: [ 'sharing-image-picker-fieldset' ],
			append: designer,
		} );

		const selected = data.template || 0;

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

		// Create attachment field.
		createDesignerAttachment( fieldset, template, values, name );

		// Create all caption fields.
		createDesignerCaptions( fieldset, template, values, name );
	} );

	// Create template selector.
	if ( params.templates.length > 1 ) {
		createTemplate( picker, designer, data );
	}

	picker.appendChild( designer );
}

/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} picker Picker element.
 * @param {HTMLElement} manager Manager element.
 */
function createGenerateButton( picker, manager ) {
	const button = Build.element( 'button', {
		classes: [ 'sharing-image-picker-generate', 'button' ],
		text: __( 'Generate', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', () => {
		generatePoster( picker );
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
		text: __( 'Remove', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', () => {
		const image = poster.querySelector( 'img' );

		if ( null !== image ) {
			poster.removeChild( image );
		}

		const input = poster.querySelector( 'input' );

		if ( null !== input ) {
			input.value = '';
		}

		poster.classList.remove( 'poster-visible' );
	} );
}

/**
 * Create picker manager.
 *
 * @param {HTMLElement} picker Picker element.
 */
function createManager( picker ) {
	const manager = Build.element( 'div', {
		classes: [ 'sharing-image-picker-manager' ],
		append: picker,
	} );

	// Create poster generation button.
	createGenerateButton( picker, manager );

	// Create poster removing button.
	createDeleteButton( manager );

	Build.element( 'span', {
		classes: [ 'sharing-image-picker-spinner', 'spinner' ],
		append: manager,
	} );
}

/**
 * Create poster block.
 *
 * @param {HTMLElement} picker Picker element.
 */
function createPoster( picker ) {
	poster = Build.element( 'div', {
		classes: [ 'sharing-image-picker-poster' ],
		append: picker,
	} );

	if ( params.poster ) {
		Build.element( 'img', {
			attributes: {
				src: params.poster,
				alt: '',
			},
			append: poster,
		} );

		poster.classList.add( 'poster-visible' );
	}

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name + '[poster]',
			value: params.poster || '',
		},
		append: poster,
	} );

	return poster;
}

/**
 * Create metabox generator picker.
 *
 * @param {HTMLElement} inside Metabox inside element.
 * @param {Object} object Global object field.
 */
function createPicker( inside, object ) {
	params = object;

	// Set params name for template form fields.
	params.name = 'sharing_image_picker';

	const picker = Build.element( 'div', {
		classes: [ 'sharing-image-picker' ],
		append: inside,
	} );

	const data = params.custom || {};

	// Create poster block.
	createPoster( picker );

	// Create fields designer.
	createDesigner( picker, data );

	// Create metabox manager block.
	createManager( picker );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: picker,
	} );
}

export default createPicker;
