/**
 * Editor settings.
 */
/* global ajaxurl:true */

import Build from '../builders';

const { __ } = wp.i18n;

// Store global DOM elements.
const screen = {};

// Store global settings for poster editor.
let config = null;

/**
 * Geneate poster using form data.
 */
function generatePoster() {
	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'blob';

	const preview = screen.preview;
	preview.classList.add( 'preview-loader' );

	request.onload = () => {
		let image = preview.querySelector( 'img' );

		if ( null === image ) {
			image = Build.element( 'img', {
				append: preview,
			} );
		}

		preview.classList.remove( 'preview-blank', 'preview-loader' );

		// Set new blob image source.
		image.src = window.URL.createObjectURL( request.response );
	};

	const data = new window.FormData( screen.form );

	data.set( 'action', config.action );
	data.set( 'handler', 'show' );

	request.send( data );
}

/**
 * Save poster while form submiting.
 *
 * @param {HTMLElement} field Hidden preview input field.
 */
function savePoster( field ) {
	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	request.onload = () => {
		field.value = request.response.data;

		// Trigger form submitting.
		screen.form.submit();
	};

	const data = new window.FormData( screen.form );

	data.set( 'action', config.action );
	data.set( 'handler', 'save' );

	request.send( data );
}

/**
 * Update form fields name attributes for layers
 *
 * @param {HTMLElement} designer Layouts designer element.
 */
function reorderLayers( designer ) {
	const layers = designer.children;

	for ( let index = 0; index < layers.length; index++ ) {
		const fields = layers[ index ].querySelectorAll( '[name]' );

		fields.forEach( ( field ) => {
			let name = field.getAttribute( 'name' );

			// Try to find layer index.
			const match = name.match( /(.+?\[layers\])\[(\d+)\](\[.+?\])$/ );

			if ( null !== match ) {
				name = match[ 1 ] + `[${ index }]` + match[ 3 ];
			}

			field.setAttribute( 'name', name );
		} );
	}
}

/**
 * Update poster background settings with custom logic.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object} data Current poster data.
 */
function createPermanentAttachment( fieldset, data ) {
	data.background = data.background || null;

	// Create background settings control.
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-half-bottom' ],
		label: __( 'Poster background settings', 'sharing-image' ),
		fields: [
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-radio' ],
				attributes: {
					name: config.name + '[background]',
					value: 'dynamic',
				},
				label: __( 'Select for each post separately', 'sharing-image' ),
				checked: data.background,
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-radio' ],
				attributes: {
					name: config.name + '[background]',
					value: 'thumbnail',
				},
				label: __( 'Use post thumbnail image', 'sharing-image' ),
				checked: data.background,
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-radio' ],
				attributes: {
					name: config.name + '[background]',
					value: 'permanent',
				},
				label: __( 'Upload permanent background', 'sharing-image' ),
				checked: data.background,
			},
		],
		append: fieldset,
	} );

	config.links = config.links || {};

	const media = Build.media( {
		name: config.name + '[attachment]',
		classes: [ 'sharing-image-editor-control', 'control-details' ],
		value: data.attachment || '',
		link: config.links.uploads,
		labels: {
			button: __( 'Upload image', 'sharing-image' ),
			heading: __( 'Select layer image', 'sharing-image' ),
			details: __( 'Attachment details', 'sharing-image' ),
		},
		append: fieldset,
	} );

	const upload = media.querySelector( 'button' );
	upload.setAttribute( 'disabled', 'disabled' );

	// Get checked background radio input.
	const fields = control.querySelectorAll( 'input' );

	fields.forEach( ( input ) => {
		// Show button for checked permanent radio.
		if ( input.checked && 'permanent' === input.value ) {
			upload.removeAttribute( 'disabled', 'disabled' );
		}

		input.addEventListener( 'change', () => {
			upload.setAttribute( 'disabled', 'disabled' );

			if ( 'permanent' === input.value ) {
				upload.removeAttribute( 'disabled' );
			}
		} );
	} );
}

/**
 * Text layer dynamic/static fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string} name Fields name attribute prefix.
 * @param {Object} data Layer data object.
 */
function createDynamicFields( layer, name, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		append: layer,
	} );

	const checkbox = Build.checkbox(
		{
			classes: [ 'sharing-image-editor-checkbox' ],
			attributes: {
				name: name + '[dynamic]',
				value: 'dynamic',
			},
			label: __( 'Dynamic field. Filled in the post editing screen.', 'sharing-image' ),
			checked: data.dynamic,
		},
		control
	);

	const fields = [];

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-hidden' ],
		help: __( 'Displayed only in the metabox.', 'sharing-image' ),
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: name + '[title]',
					value: data.title || '',
				},
				label: __( 'Field name', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-hidden' ],
		label: __( 'Preset text field', 'sharing-image' ),
		fields: [
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'none',
				},
				label: __( 'Fill in manually', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'title',
				},
				label: __( 'Take from post title', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'excerpt',
				},
				label: __( 'Use post excerpt text', 'sharing-image' ),
				checked: data.preset || 'none',
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		help: __( 'You can use non-breaking spaces to manage your string position.', 'sharing-image' ),
		fields: [
			{
				group: 'textarea',
				classes: [ 'sharing-image-editor-textarea' ],
				content: data.inscription || '',
				attributes: {
					name: name + '[inscription]',
					rows: 2,
				},
				label: __( 'Inscription', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Helper function to toggle contols visibility.
	const toggleClasses = () => {
		fields.forEach( ( field ) => {
			field.classList.toggle( 'control-hidden' );
		} );
	};

	if ( checkbox.checked ) {
		toggleClasses();
	}

	checkbox.addEventListener( 'change', () => {
		toggleClasses();
	} );
}

/**
 * Text layer more options fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string} name Fields name attribute prefix.
 * @param {Object} data Layer data object.
 */
function createMoreFields( layer, name, data ) {
	const fields = [];

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-single', 'control-hidden' ],
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-editor-select' ],
				options: {
					opensans: 'Open Sans',
					roboto: 'Roboto',
					montserrat: 'Montserrat',
					merriweather: 'Merriweather',
					alice: 'Alice',
				},
				attributes: {
					name: name + '[font]',
				},
				label: __( 'Font family', 'sharing-image' ),
				selected: data.font,
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-single', 'control-hidden' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-color' ],
				attributes: {
					type: 'color',
					name: name + '[color]',
					value: data.color || '#cccccc',
				},
				label: __( 'Color', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-double', 'control-hidden' ],
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-editor-select' ],
				options: {
					left: __( 'Left', 'sharing-image' ),
					center: __( 'Center', 'sharing-image' ),
					right: __( 'Right', 'sharing-image' ),
				},
				attributes: {
					name: name + '[horizontal]',
				},
				label: __( 'Horizontal alignment', 'sharing-image' ),
				selected: data.horizontal,
			},
			{
				group: 'select',
				classes: [ 'sharing-image-editor-select' ],
				options: {
					top: __( 'Top', 'sharing-image' ),
					center: __( 'Center', 'sharing-image' ),
					bottom: __( 'Bottom', 'sharing-image' ),
				},
				attributes: {
					name: name + '[vertical]',
				},
				label: __( 'Vertical alignment', 'sharing-image' ),
				selected: data.vertical,
			},
		],
		append: layer,
	} );

	const control = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		append: layer,
	} );

	const button = Build.element( 'button', {
		classes: [ 'sharing-image-editor-more' ],
		text: __( 'More options', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: control,
	} );

	button.addEventListener( 'click', () => {
		fields.forEach( ( field ) => {
			field.classList.remove( 'control-hidden' );
		} );

		// Remove button on expand.
		layer.removeChild( control );
	} );
}

/**
 * Create catalog button in footer.
 *
 * @param {HTMLElement} footer Footer HTML element.
 */
function createCatalogButton( footer ) {
	const link = new URL( document.location.href );
	link.searchParams.delete( 'poster' );

	Build.element( 'a', {
		classes: [ 'button' ],
		text: __( '← Back to Catalog', 'sharing-image' ),
		attributes: {
			href: link,
		},
		append: footer,
	} );
}

/**
 * Create poster deletion button in footer.
 *
 * @param {HTMLElement} footer Footer HTML element.
 */
function createDeleteButton( footer ) {
	config.links = config.links || {};

	const href = new URL( document.location.href );

	// Get poster index from current link.
	const index = href.searchParams.get( 'poster' );

	// Set poster index to delete link.
	const link = new URL( config.links.delete );
	link.searchParams.set( 'poster', index );

	// Get form nonce.
	const nonce = document.getElementById( '_wpnonce' );

	if ( null !== nonce ) {
		link.searchParams.set( '_wpnonce', nonce.value );
	}

	Build.element( 'a', {
		classes: [ 'sharing-image-editor-delete' ],
		text: __( 'Delete poster', 'sharing-image' ),
		attributes: {
			href: link,
		},
		append: footer,
	} );
}

/**
 * Create preview element.
 *
 * @param {HTMLElement} viewport Monitor viewport element.
 * @param {Object} data Poster data object.
 */
function createPreview( viewport, data ) {
	const preview = Build.element( 'div', {
		classes: [ 'sharing-image-editor-preview', 'preview-blank' ],
		append: viewport,
	} );

	screen.preview = preview;

	if ( data.preview ) {
		Build.element( 'img', {
			attributes: {
				src: data.preview,
				alt: '',
			},
			append: preview,
		} );

		preview.classList.remove( 'preview-blank' );
	}

	Build.element( 'span', {
		classes: [ 'sharing-image-editor-loader' ],
		append: preview,
	} );

	const field = Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: config.name + '[preview]',
			value: data.preview || '',
		},
		append: preview,
	} );

	screen.form.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		// Show preview preloader.
		preview.classList.add( 'preview-loader' );

		savePoster( field );
	} );
}

/**
 * Create button inside layer box to change order.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer Current layer HTML emelemt.
 */
function createOrderLayersButton( designer, layer ) {
	const button = Build.element( 'button', {
		classes: [ 'sharing-image-editor-order' ],
		attributes: {
			type: 'button',
			title: __( 'Raise higher', 'sharing-image' ),
		},
		append: layer,
	} );

	button.addEventListener( 'click', () => {
		if ( layer.previousSibling ) {
			designer.insertBefore( layer, layer.previousSibling );
		}

		reorderLayers( designer );
	} );
}

/**
 * Create button to delete layer.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer Current layer HTML emelemt.
 */
function createDeleteLayerButton( designer, layer ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-footer' ],
		append: layer,
	} );

	const button = Build.element( 'button', {
		classes: [ 'sharing-image-editor-delete' ],
		text: __( 'Delete layer', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: control,
	} );

	button.addEventListener( 'click', () => {
		designer.removeChild( layer );
		reorderLayers( designer );
	} );
}

/**
 * Create image layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current poster layer data.
 */
function createLayerImage( index, data ) {
	const description = [];

	description.push( __( 'Use jpg, gif or png image formats.', 'sharing-image' ) );
	description.push( __( 'All sizes can be set in pixels or percentages. ', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-image' ],
		label: __( 'Image', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	// Form fields name for this layer.
	const name = config.name + `[layers][${ index }]`;

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'image',
		},
		append: layer,
	} );

	config.links = config.links || {};

	Build.media( {
		name: name + '[attachment]',
		classes: [ 'sharing-image-editor-control', 'control-details' ],
		value: data.attachment || '',
		link: config.links.uploads,
		labels: {
			button: __( 'Upload image', 'sharing-image' ),
			heading: __( 'Select layer image', 'sharing-image' ),
			details: __( 'Attachment details', 'sharing-image' ),
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-grid' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: name + '[x]',
					placeholder: '50%',
					value: data.x || '',
				},
				label: __( 'X starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: name + '[y]',
					placeholder: '20',
					value: data.y || '',
				},
				label: __( 'Y starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: name + '[width]',
					placeholder: '100',
					value: data.width || '',
				},
				label: __( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: name + '[height]',
					placeholder: '100',
					value: data.height || '',
				},
				label: __( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create text layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current poster data.
 */
function createLayerText( index, data ) {
	const description = [];

	description.push( __( 'Write a text to the current image.', 'sharing-image' ) );
	description.push( __( 'If the font does not fit within your limits, its size will decrease.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: __( 'Text', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	// Form fields name for this layer.
	const name = config.name + `[layers][${ index }]`;

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'text',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-grid' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[x]',
					value: data.x || '',
					placeholder: '10',
				},
				label: __( 'X starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[y]',
					value: data.y || '',
					placeholder: '10',
				},
				label: __( 'Y starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[width]',
					value: data.width || '',
					placeholder: '100',
				},
				label: __( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[height]',
					value: data.height || '',
					placeholder: '100',
				},
				label: __( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Create static/dynamic text fields.
	createDynamicFields( layer, name, data );

	// Create more options.
	createMoreFields( layer, name, data );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-double' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[fontsize]',
					min: 10,
					max: 200,
					step: 1,
					value: data.fontsize || '48',
				},
				label: __( 'Font size', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[lineheight]',
					min: 0,
					max: 4,
					step: 0.25,
					value: data.lineheight || '1.5',
				},
				label: __( 'Line height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create filter layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current poster data.
 */
function createLayerFilter( index, data ) {
	const description = [];

	description.push( __( 'Filters are applied one after another to the entire poster image.', 'sharing-image' ) );
	description.push( __( 'If you want to control their order, create multiple layers.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: __( 'Filter', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	// Form fields name for this layer.
	const name = config.name + `[layers][${ index }]`;

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'filter',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-editor-checkbox' ],
				attributes: {
					name: name + '[grayscale]',
					value: 'grayscale',
				},
				label: __( 'Turns image into a grayscale version', 'sharing-image' ),
				checked: data.grayscale,
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[brightness]',
					min: -255,
					max: 255,
					step: 10,
					value: data.brightness || '0',
				},
				label: __( 'Brightness', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[contrast]',
					min: -100,
					max: 100,
					step: 10,
					value: data.contrast || '0',
				},
				label: __( 'Contrast', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create line layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current poster data.
 */
function createLayerLine( index, data ) {
	const description = [];

	description.push( __( 'Draw a line from x,y starting point to x,y end point on current image.', 'sharing-image' ) );
	description.push( __( 'Use rectangle layer to draw a line with a variable width.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: __( 'Line', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	// Form fields name for this layer.
	const name = config.name + `[layers][${ index }]`;

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'line',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-single' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-color' ],
				attributes: {
					type: 'color',
					name: name + '[color]',
					value: data.color || '#cccccc',
				},
				label: __( 'Line color', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-grid' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[x1]',
					value: data.y1 || '',
					placeholder: '10',
				},
				label: __( 'X starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[y1]',
					value: data.y1 || '',
					placeholder: '10',
				},
				label: __( 'Y starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[x2]',
					value: data.x2 || '',
					placeholder: '100',
				},
				label: __( 'X end point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[y2]',
					value: data.y2 || '',
					placeholder: '10',
				},
				label: __( 'Y end point', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-editor-checkbox' ],
				attributes: {
					name: name + '[dashed]',
					value: 'dashed',
				},
				label: __( 'Draw a dashed line', 'sharing-image' ),
				checked: data.dashed,
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[opacity]',
					min: 0,
					max: 1,
					step: 0.05,
					value: data.opacity || '0',
				},
				label: __( 'Opacity', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create rectangle layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current poster data.
 */
function createLayerRectangle( index, data ) {
	const description = [];

	description.push( __( 'Draw a colored rectangle on current image.', 'sharing-image' ) );
	description.push( __( 'You can get filled or outlined figure with custom color and opacity.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: __( 'Rectangle', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	// Form fields name for this layer.
	const name = config.name + `[layers][${ index }]`;

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'rectangle',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-single' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-color' ],
				attributes: {
					type: 'color',
					name: name + '[color]',
					value: data.color || '#cccccc',
				},
				label: __( 'Rectangle color', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-grid' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[x]',
					value: data.x || '',
					placeholder: '10',
				},
				label: __( 'X starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[y]',
					value: data.y || '',
					placeholder: '10',
				},
				label: __( 'Y starting point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[width]',
					value: data.width || '',
					placeholder: '100',
				},
				label: __( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[height]',
					value: data.height || '',
					placeholder: '100',
				},
				label: __( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-editor-checkbox' ],
				attributes: {
					name: name + '[outline]',
					value: 'outline',
				},
				label: __( 'Outline rectangle', 'sharing-image' ),
				checked: data.outline,
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[opacity]',
					min: 0,
					max: 1,
					step: 0.05,
					value: data.opacity || '0',
				},
				label: __( 'Opacity', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create ellipse layer.
 *
 * @param {number} index Current layer index.
 * @param {Object} data Current poster data.
 */
function createLayerEllipse( index, data ) {
	const description = [];

	description.push( __( 'Draw a colored ellipse at given x,y center coordinates and size.', 'sharing-image' ) );
	description.push( __( 'You can get filled or outlined figure with custom color and opacity.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: __( 'Ellipse', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	// Form fields name for this layer.
	const name = config.name + `[layers][${ index }]`;

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'ellipse',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-single' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-color' ],
				attributes: {
					type: 'color',
					name: name + '[color]',
					value: data.color || '#cccccc',
				},
				label: __( 'Ellipse color', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-grid' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[x]',
					value: data.x || '',
					placeholder: '10',
				},
				label: __( 'X center point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[y]',
					value: data.y || '',
					placeholder: '10',
				},
				label: __( 'Y center point', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[width]',
					value: data.width || '',
					placeholder: '100',
				},
				label: __( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					type: 'text',
					name: name + '[height]',
					value: data.height || '',
					placeholder: '100',
				},
				label: __( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-editor-checkbox' ],
				attributes: {
					name: name + '[outline]',
					value: 'outline',
				},
				label: __( 'Outline ellipse', 'sharing-image' ),
				checked: data.outline,
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-range' ],
				attributes: {
					type: 'range',
					name: name + '[opacity]',
					min: 0,
					max: 1,
					step: 0.05,
					value: data.opacity || '0',
				},
				label: __( 'Opacity', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create new layer.
 *
 * @param {HTMLElement} designer Designer HTML element.
 * @param {string} type New layer type.
 * @param {number} index Layer index.
 * @param {Object} data New layer data.
 */
function createLayer( designer, type, index, data = {} ) {
	let layer = null;

	switch ( type ) {
		case 'image':
			layer = createLayerImage( index, data );
			break;
		case 'text':
			layer = createLayerText( index, data );
			break;
		case 'filter':
			layer = createLayerFilter( index, data );
			break;
		case 'line':
			layer = createLayerLine( index, data );
			break;
		case 'ellipse':
			layer = createLayerEllipse( index, data );
			break;
		case 'rectangle':
			layer = createLayerRectangle( index, data );
			break;
	}

	if ( null === layer ) {
		return;
	}

	designer.insertBefore( layer, designer.firstChild );

	// Delete this layer button.
	createDeleteLayerButton( designer, layer );

	// Reorder layers button.
	createOrderLayersButton( designer, layer );
}

/**
 * Create layers designer control.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object} data Current poster data.
 */
function createDesigner( fieldset, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-row', 'control-compact', 'control-pinned' ],
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-editor-select' ],
				options: {
					text: __( 'Text', 'sharing-image' ),
					image: __( 'Image', 'sharing-image' ),
					filter: __( 'Filter', 'sharing-image' ),
					rectangle: __( 'Rectangle', 'sharing-image' ),
					line: __( 'Line', 'sharing-image' ),
					ellipse: __( 'Ellipse', 'sharing-image' ),
				},
			},
		],
		append: fieldset,
	} );

	const button = Build.element( 'button', {
		classes: [ 'button' ],
		text: __( 'Add new', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: control,
	} );

	const designer = Build.element( 'div', {
		classes: [ 'snaring-image-editor-designer' ],
		append: fieldset,
	} );

	// Set default layers set.
	const layers = data.layers || [];

	layers.forEach( ( layer, index ) => {
		if ( layer.hasOwnProperty( 'type' ) ) {
			createLayer( designer, layer.type, index++, layer );
		}
	} );

	button.addEventListener( 'click', () => {
		const select = control.querySelector( 'select' );

		if ( null === select ) {
			return;
		}

		createLayer( designer, select.value, designer.children.length );
	} );
}

/**
 * Create common poster settings on poster editor screen.
 *
 * @param {HTMLElement} section Section HTML element.
 * @param {Object} data Current poster data.
 */
function createFieldset( section, data ) {
	const fieldset = Build.element( 'div', {
		classes: [ 'sharing-image-editor-fieldset' ],
		append: section,
	} );

	// Create poster title control.
	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-compact' ],
		help: __( 'Used only in the admin panel', 'sharing-image' ),
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: config.name + '[title]',
					value: data.title || '',
				},
				label: __( 'Template title', 'sharing-image' ),
			},
		],
		append: fieldset,
	} );

	// Create background settings with custom logic.
	createPermanentAttachment( fieldset, data );

	// Create width/height settings control.
	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-grid', 'control-compact' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: config.name + '[width]',
					value: data.width || '1200',
					placeholder: '1200',
				},
				label: __( 'Poster width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-input' ],
				attributes: {
					name: config.name + '[height]',
					value: data.height || '630',
					placeholder: '630',
				},
				label: __( 'Poster height', 'sharing-image' ),
			},
		],
		append: fieldset,
	} );

	const description = [];

	description.push( __( 'You can add multiple layers on your poster.', 'sharing-image' ) );
	description.push( __( 'Note that the stacking order of the layers is important.', 'sharing-image' ) );
	description.push( __( 'You can change the order using the arrows in the corner of each box.', 'sharing-image' ) );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-pinned' ],
		label: __( 'Add layers', 'sharing-image' ),
		description: description.join( ' ' ),
		append: fieldset,
	} );

	// Create layers designer block.
	createDesigner( fieldset, data );

	const footer = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-overlined' ],
		append: fieldset,
	} );

	// Create back to catalog button.
	createCatalogButton( footer );

	// Create poster deletion button.
	createDeleteButton( footer );

	fieldset.addEventListener( 'change', ( e ) => {
		if ( screen.suspend.checked ) {
			return;
		}

		const target = e.target;

		if ( target.hasAttribute( 'name' ) ) {
			generatePoster();
		}
	} );
}

/**
 * Create button to submit editor form.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createSubmitButton( manager ) {
	Build.element( 'button', {
		text: __( 'Save changes', 'sharing-image' ),
		classes: [ 'button', 'button-primary' ],
		attributes: {
			type: 'submit',
		},
		append: manager,
	} );
}

/**
 * Create button to generate new poster manually.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createGenerateButton( manager ) {
	const button = Build.element( 'button', {
		text: __( 'Generate preview', 'sharing-image' ),
		classes: [ 'button' ],
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', generatePoster );
}

/**
 * Create disable live-reloading checkbox.
 *
 * @param {HTMLElement} manager Manager element.
 * @param {Object} data Poster data.
 */
function createSuspendCheckbox( manager, data ) {
	const checkbox = Build.checkbox(
		{
			classes: [ 'sharing-image-editor-suspend' ],
			attributes: {
				name: config.name + '[suspend]',
				value: 'suspend',
			},
			label: __( 'Disable live-reload', 'sharing-image' ),
			checked: data.suspend,
		},
		manager
	);

	screen.suspend = checkbox;
}

/**
 * Create poster settings preview.
 *
 * @param {HTMLElement} section Section HTML element.
 * @param {Object} data Current poster data.
 */
function createMonitor( section, data ) {
	const monitor = Build.element( 'div', {
		classes: [ 'sharing-image-editor-monitor' ],
		append: section,
	} );

	const viewport = Build.element( 'div', {
		classes: [ 'sharing-image-editor-viewport' ],
		append: monitor,
	} );

	createPreview( viewport, data );

	const manager = Build.element( 'div', {
		classes: [ 'sharing-image-editor-manager' ],
		append: viewport,
	} );

	// Create submit form button.
	createSubmitButton( manager );

	// Create poster generator button.
	createGenerateButton( manager );

	// Create live-reload manager checkbox.
	createSuspendCheckbox( manager, data );
}

/**
 * Create poster editor page.
 *
 * @param {HTMLElement} form Settings form element.
 * @param {Object} settings Global settings field.
 * @param {number} index Current option index.
 * @param {Object} data Poster data.
 */
function createEditor( form, settings, index, data = {} ) {
	config = settings;

	// Set config name for poster form fields.
	config.name = config.option + '[' + index + ']';

	const section = Build.element( 'div', {
		classes: [ 'sharing-image-editor' ],
		prepend: form,
	} );

	screen.form = form;

	// Create monitor section part.
	createMonitor( section, data );

	// Create fieldset section part.
	createFieldset( section, data );
}

export default createEditor;
