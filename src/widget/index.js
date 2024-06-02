/* global ajaxurl:true */
import Build from '../builders';

import './styles.scss';

// Store global script object for metabox.
let params = null;

// Widget HTML element.
let widget = null;

/**
 * Show widget warning message.
 *
 * @param {string} message Warning message.
 */
function showWidgetError( message ) {
	const warning = widget.querySelector( '.sharing-image-widget-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.add( 'warning-visible' );
	warning.textContent = message || wp.i18n.__( 'Unknown generation error', 'sharing-image' );
}

/**
 * Remove warning message block.
 */
function hideWidgetError() {
	const warning = widget.querySelector( '.sharing-image-widget-warning' );

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

	widget.classList.add( 'widget-loader' );

	// Create data form data bundle.
	const bundle = new window.FormData();
	bundle.set( 'action', 'sharing_image_generate' );

	widget.querySelectorAll( '[name]' ).forEach( ( field ) => {
		bundle.append( field.name, field.value );
	} );

	hideWidgetError();

	const poster = widget.querySelector( '.sharing-image-widget-poster' );

	request.addEventListener( 'load', () => {
		const response = request.response || {};

		// Hide preview loader on request complete.
		widget.classList.remove( 'widget-loader', 'widget-auto' );

		if ( ! response.data ) {
			return showWidgetError();
		}

		if ( ! response.success ) {
			return showWidgetError( response.data );
		}

		params.meta.source = response.data;

		for ( const key in response.data ) {
			poster.querySelectorAll( 'input' ).forEach( ( input ) => {
				const name = params.name.source + '[' + key + ']';

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

		if ( 'auto' === response.data.method ) {
			widget.classList.add( 'widget-auto' );
		}

		// Show the poster.
		widget.classList.add( 'widget-visible' );
	} );

	request.addEventListener( 'error', () => {
		showWidgetError();

		// Hide preview loader on request complete.
		widget.classList.remove( 'widget-loader' );
	} );

	request.send( bundle );
}

/**
 * Create designer template selector.
 *
 * @param {HTMLElement} designer Designer element.
 * @param {Object}      selected Seleted template.
 */
function createTemplateSelector( designer, selected ) {
	const fields = {};

	for ( const key in params.templates ) {
		fields[ key ] = params.templates[ key ]?.title || wp.i18n.__( 'Untitled', 'sharing-image' );
	}

	const template = Build.select(
		{
			classes: [ 'sharing-image-widget-template' ],
			options: fields,
			attributes: {
				name: params.name.source + '[template]',
			},
			selected: String( selected ),
		},
		designer
	);

	template.addEventListener( 'change', () => {
		const fieldset = designer.querySelectorAll( '.sharing-image-widget-fieldset' );

		for ( let i = 0; i < fieldset.length; i++ ) {
			const item = fieldset[ i ];
			item.classList.remove( 'fieldset-visible' );

			if ( item.dataset.index === template.value ) {
				item.classList.add( 'fieldset-visible' );
			}
		}
	} );

	return template;
}

/**
 * Try to prefill text layer field.
 *
 * @param {HTMLElement} textarea Textarea field.
 * @param {string}      preset   Preset field.
 * @param {Array}       data     Widget data object.
 */
function presetTextLayer( textarea, preset, data ) {
	const source = document.getElementById( preset );

	if ( null === source ) {
		return;
	}

	const updateField = () => {
		if ( 'manual' === data.source.method ) {
			return;
		}

		textarea.value = source.value;
	};

	source.addEventListener( 'input', updateField );

	// Stop textarea update after first user input.
	textarea.addEventListener( 'input', () => {
		source.removeEventListener( 'input', updateField );
	} );

	updateField();
}

/**
 * Try to prefill text layer field with categories.
 *
 * @param {HTMLElement} textarea Textarea field.
 * @param {Array}       data     Widget data object.
 */
function presetTextLayerCategories( textarea, data ) {
	const metabox = document.getElementById( 'categorychecklist' );

	if ( ! metabox ) {
		return;
	}

	const separator = params.separator || ', ';

	// Helper function to get checked categories.
	const updateField = () => {
		const content = [];

		if ( 'manual' === data.source.method ) {
			return;
		}

		metabox.querySelectorAll( 'input:checked' ).forEach( ( el ) => {
			if ( el.parentNode?.textContent ) {
				content.push( el.parentNode.textContent.trim() );
			}
		} );

		textarea.value = content.join( separator );
	};

	updateField();

	metabox.addEventListener( 'change', updateField );
}

/**
 * Try to prefill text layer field with tags.
 *
 * @param {HTMLElement} textarea Textarea field.
 * @param {Array}       data     Widget data object.
 */
function presetTextLayerTags( textarea, data ) {
	const checklist = document.querySelector( '#post_tag .tagchecklist' );

	if ( ! checklist || ! MutationObserver ) {
		return;
	}

	const separator = params.separator || ', ';

	// Update textarea field.
	const updateField = () => {
		const tags = document.getElementById( 'tax-input-post_tag' );

		if ( ! tags ) {
			return;
		}

		if ( 'manual' === data.source.method ) {
			return;
		}

		const content = tags.value.split( ',' );

		textarea.value = content.join( separator );
	};

	updateField();

	const observer = new MutationObserver( updateField );
	observer.observe( checklist, { childList: true } );
}

/**
 * Try to prefill image layer field.
 *
 * @param {HTMLElement} media Media element.
 * @param {Array}       data  Widget data object.
 */
function presetImageLayer( media, data ) {
	const frame = wp.media?.featuredImage?.frame();

	if ( frame ) {
		frame.on( 'select', () => {
			if ( 'manual' === data.source.method ) {
				return;
			}

			const selection = frame.state().get( 'selection' ).first().toJSON();

			if ( selection.id ) {
				media.dispatchEvent( new CustomEvent( 'set_attachment', { detail: selection.id } ) );
			}
		} );
	}

	// Find featured image metabox.
	const metabox = document.getElementById( 'postimagediv' );

	if ( ! metabox ) {
		return;
	}

	metabox.addEventListener( 'click', ( e ) => {
		if ( 'manual' === data.source.method ) {
			return;
		}

		if ( e.target.id === 'remove-post-thumbnail' ) {
			media.dispatchEvent( new CustomEvent( 'remove_attachment' ) );
		}
	} );

	if ( 'manual' === data.source.method ) {
		return;
	}

	const thumbnail = metabox.querySelector( '#_thumbnail_id' );

	if ( ! thumbnail ) {
		return;
	}

	const attachment = parseInt( thumbnail.value );

	if ( attachment > 0 ) {
		media.dispatchEvent( new CustomEvent( 'set_attachment', { detail: attachment } ) );
	}
}

/**
 * Create designer text layer.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      layer    Layer data.
 * @param {string}      key      Layer key.
 * @param {Array}       data     Widget data object.
 */
function createLayerText( fieldset, layer, key, data ) {
	const textarea = Build.textarea(
		{
			classes: [ 'sharing-image-widget-text' ],
			label: layer.title || null,
			attributes: {
				name: params.name.fieldset + `[${ key }]`,
			},
		},
		fieldset
	);

	textarea.value = data.fieldset[ key ] || '';

	// Preset title.
	if ( layer.preset === 'title' ) {
		presetTextLayer( textarea, 'title', data );
	}

	// Preset excerpt.
	if ( layer.preset === 'excerpt' ) {
		presetTextLayer( textarea, 'excerpt', data );
	}

	// Preset categories.
	if ( layer.preset === 'categories' ) {
		presetTextLayerCategories( textarea, data );
	}

	// Preset tags.
	if ( layer.preset === 'tags' ) {
		presetTextLayerTags( textarea, data );
	}
}

/**
 * Create designer image layer.
 *
 * @param {HTMLElement} fieldset Fieldset element.
 * @param {Object}      layer    Layer data.
 * @param {string}      key      Layer key.
 * @param {Array}       data     Widget data object.
 */
function createLayerImage( fieldset, layer, key, data ) {
	const media = Build.media( {
		name: params.name.fieldset + `[${ key }]`,
		classes: [ 'sharing-image-widget-image' ],
		label: layer.title || null,
		value: data.fieldset[ key ] || '',
		labels: {
			button: wp.i18n.__( 'Set layer image', 'sharing-image' ),
			heading: wp.i18n.__( 'Select image', 'sharing-image' ),
			details: wp.i18n.__( 'Attachment', 'sharing-image' ),
			remove: wp.i18n.__( 'Remove image', 'sharing-image' ),
		},
		mime: [ 'image/png', 'image/jpeg', 'image/gif', 'image/webp' ],
		image: true,
		remove: true,
		append: fieldset,
	} );

	// Preset title.
	if ( layer.preset === 'featured' ) {
		presetImageLayer( media, data );
	}
}

/**
 * Create fields designer.
 *
 * @param {Object} data Widget data object.
 */
function createDesigner( data ) {
	if ( Object.keys( params.templates ).length < 1 ) {
		return;
	}

	const designer = Build.element( 'div', {
		classes: [ 'sharing-image-widget-designer' ],
	} );

	let selected = data.source.template || null;

	// Reset selected template if index undefined.
	if ( ! params.templates[ selected ] ) {
		selected = Object.keys( params.templates )[ 0 ];
	}

	createTemplateSelector( designer, selected );

	for ( const index in params.templates ) {
		const template = params.templates[ index ];

		const fieldset = Build.element( 'div', {
			classes: [ 'sharing-image-widget-fieldset' ],
			dataset: {
				index: index,
			},
			append: designer,
		} );

		if ( index === selected ) {
			fieldset.classList.add( 'fieldset-visible' );
		}

		const layers = template.layers || {};

		for ( const key in layers ) {
			const layer = layers[ key ];

			if ( ! layer.dynamic ) {
				continue;
			}

			switch ( layer.type ) {
				case 'text':
					createLayerText( fieldset, layer, key, data );
					break;

				case 'image':
					createLayerImage( fieldset, layer, key, data );
					break;
			}
		}
	}

	widget.appendChild( designer );

	return designer;
}

/**
 * Create button to generate new metabox poster.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createGenerateButton( manager ) {
	const button = Build.element( 'button', {
		classes: [ 'sharing-image-widget-generate', 'button' ],
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
		classes: [ 'sharing-image-widget-delete', 'button', 'button-delete' ],
		text: wp.i18n.__( 'Remove', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', () => {
		const image = widget.querySelector( '.sharing-image-widget-poster img' );

		if ( null === image ) {
			return;
		}

		const poster = image.parentNode;
		poster.removeChild( image );

		poster.querySelectorAll( 'input' ).forEach( ( input ) => {
			input.value = '';

			if ( input.name === params.name.source + '[method]' ) {
				input.value = 'manual';
			}
		} );

		widget.classList.remove( 'widget-visible' );
	} );
}

/**
 * Create widget manager.
 *
 * @param {HTMLElement} designer Designer element.
 */
function createManager( designer ) {
	const manager = Build.element( 'div', {
		classes: [ 'sharing-image-widget-manager' ],
		append: designer,
	} );

	createGenerateButton( manager );
	createDeleteButton( manager );

	Build.element( 'span', {
		classes: [ 'sharing-image-widget-spinner', 'spinner' ],
		append: manager,
	} );
}

/**
 * Create poster block.
 *
 * @param {Object} data Widget data object.
 */
function createPoster( data ) {
	const poster = Build.element( 'div', {
		classes: [ 'sharing-image-widget-poster' ],
		append: widget,
	} );

	Build.element( 'span', {
		classes: [ 'sharing-image-widget-method' ],
		attributes: {
			title: wp.i18n.__( 'Poster was generated automatically and will update on post saving.', 'sharing-image' ),
		},
		append: poster,
	} );

	if ( 'auto' === data.source.method ) {
		widget.classList.add( 'widget-auto' );
	}

	if ( data.source.poster ) {
		Build.element( 'img', {
			attributes: {
				src: data.source.poster,
				alt: '',
			},
			append: poster,
		} );

		widget.classList.add( 'widget-visible' );
	}

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name.source + '[poster]',
			value: data.source.poster || '',
		},
		append: poster,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name.source + '[width]',
			value: data.source.width,
		},
		append: poster,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name.source + '[height]',
			value: data.source.height,
		},
		append: poster,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name.source + '[method]',
			value: data.source.method,
		},
		append: poster,
	} );
}

/**
 * Check that the poster sizes are set or show an error message.
 *
 * @param {Object} data Widget data object.
 */
function showSizesWarning( data ) {
	if ( ! data.poster ) {
		return;
	}

	if ( ! data.width || ! data.height ) {
		showWidgetError( wp.i18n.__( 'Image sizes are not set. Regenerate the poster.', 'sharing-image' ) );
	}
}

/**
 * Build metabox fields.
 */
function buildWidget() {
	while ( widget.firstChild ) {
		widget.removeChild( widget.lastChild );
	}

	if ( params.context ) {
		widget.classList.add( `widget-${ params.context }` );
	}

	const data = params.meta || {};

	createPoster( data );

	// Create fields designer.
	const designer = createDesigner( data );

	Build.element( 'div', {
		classes: [ 'sharing-image-widget-warning' ],
		append: designer,
	} );

	createManager( designer );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: widget,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_screen',
			value: params.screen,
		},
		append: widget,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_context',
			value: params.context,
		},
		append: widget,
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

	params = window.sharingImageWidget || {};

	// Find only single Sharing Image widget on page.
	widget = document.querySelector( '.sharing-image-widget' );

	if ( ! widget ) {
		return;
	}

	buildWidget( widget );
} )();
