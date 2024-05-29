/**
 * Editor settings.
 */
/* global ajaxurl:true */

import Sortable from 'sortablejs';
import Build from '../../builders';
import Helper from '../../helpers';
import './styles.scss';

// Store global script object for settings page.
let params = null;

// Preview element.
let preview = null;

// Root editor element.
let editor = null;

/**
 * Show template warning message.
 *
 * @param {string} message Warning message.
 */
function showTemplateError( message ) {
	const viewport = preview.parentNode;

	// Try to find warning element.
	const warning = viewport.querySelector( '.sharing-image-editor-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.add( 'warning-visible' );
	warning.textContent = message || wp.i18n.__( 'Unknown generation error', 'sharing-image' );
}

/**
 * Remove warning message block.
 */
function hideTemplateError() {
	const viewport = preview.parentNode;

	// Try to find warning element.
	const warning = viewport.querySelector( '.sharing-image-editor-warning' );

	if ( null === warning ) {
		return;
	}

	warning.classList.remove( 'warning-visible' );
}

/**
 * Geneate template using editor data.
 */
function generateTemplate() {
	preview.classList.add( 'preview-loader' );

	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'blob';

	// Create data bundle using form data.
	const bundle = new window.FormData( editor );
	bundle.set( 'action', 'sharing_image_show' );

	hideTemplateError();

	// Set blob for success response.
	request.addEventListener( 'readystatechange', () => {
		if ( request.readyState === 2 ) {
			request.responseType = 'json';

			if ( request.status === 200 ) {
				request.responseType = 'blob';
			}
		}
	} );

	request.addEventListener( 'load', () => {
		const response = request.response || {};

		// Hide preview loader on request complete.
		preview.classList.remove( 'preview-blank', 'preview-loader' );

		if ( 200 !== request.status ) {
			return showTemplateError( response.data );
		}

		let image = preview.querySelector( 'img' );

		if ( null === image ) {
			image = Build.element( 'img', {
				append: preview,
			} );
		}

		// Set new blob image source.
		image.src = window.URL.createObjectURL( response );
	} );

	request.addEventListener( 'error', () => {
		showTemplateError();

		// Hide preview loader on request complete.
		preview.classList.remove( 'preview-blank', 'preview-loader' );
	} );

	request.send( bundle );
}

/**
 * Save template while editor submiting.
 */
function saveTemplate() {
	const request = new XMLHttpRequest();
	request.open( 'POST', ajaxurl );
	request.responseType = 'json';

	preview.classList.add( 'preview-loader' );

	// Create data bundle using editor data.
	const bundle = new window.FormData( editor );
	bundle.set( 'action', 'sharing_image_save' );

	request.addEventListener( 'load', () => {
		const response = request.response || {};

		if ( ! response.data ) {
			return showTemplateError();
		}

		if ( ! response.success ) {
			// Hide preview loader on request complete.
			preview.classList.remove( 'preview-loader' );

			return showTemplateError( response.data );
		}

		const input = preview.querySelector( 'input' );

		if ( null !== input ) {
			input.value = response.data;
		}

		editor.submit();
	} );

	request.addEventListener( 'error', () => {
		// Hide preview loader on request complete.
		preview.classList.remove( 'preview-loader' );

		showTemplateError();
	} );

	request.send( bundle );
}

/**
 * Text layer dynamic/static fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createTextDynamicFields( layer, name, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		append: layer,
	} );

	const checkbox = Build.checkbox(
		{
			classes: [ 'sharing-image-editor-control-checkbox' ],
			attributes: {
				name: name + '[dynamic]',
				value: 'dynamic',
			},
			label: wp.i18n.__( 'Dynamic field. Filled in the post editing screen.', 'sharing-image' ),
			checked: data.dynamic,
		},
		control
	);

	const fields = [];

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-extend', 'control-hidden' ],
		help: wp.i18n.__( 'Only visible on the admin side.', 'sharing-image' ),
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: name + '[title]',
					value: data.title,
				},
				dataset: {
					caption: 'title',
				},
				label: wp.i18n.__( 'Field name', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-extend', 'control-hidden' ],
		help: wp.i18n.__(
			'This field is for example purposes only, to preview the editors appearance.',
			'sharing-image'
		),
		fields: [
			{
				group: 'textarea',
				classes: [ 'sharing-image-editor-control-textarea' ],
				content: data.sample || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				attributes: {
					name: name + '[sample]',
					rows: 2,
				},
				label: wp.i18n.__( 'Text sample', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	const presets = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-hidden' ],
		label: wp.i18n.__( 'Preset text field', 'sharing-image' ),
		fields: [
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'none',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Fill in manually', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'title',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Take from post title', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'excerpt',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Use post excerpt text', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'categories',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Use post categories', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'tags',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Use post tags', 'sharing-image' ),
				checked: data.preset || 'none',
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = presets;

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-extend' ],
		help: wp.i18n.__( 'You can use non-breaking spaces to manage your string position.', 'sharing-image' ),
		fields: [
			{
				group: 'textarea',
				classes: [ 'sharing-image-editor-control-textarea' ],
				content: data.content,
				attributes: {
					name: name + '[content]',
					rows: 2,
				},
				dataset: {
					caption: 'content',
				},
				label: wp.i18n.__( 'Content', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Helper function to toggle controls visibility.
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
		updateLayerCaption( layer, checkbox );
	} );

	updateLayerCaption( layer, checkbox );
}

/**
 * Image layer dynamic/static fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createImageDynamicFields( layer, name, data ) {
	const dynamic = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-gapped' ],
		append: layer,
	} );

	const checkbox = Build.checkbox(
		{
			classes: [ 'sharing-image-editor-control-checkbox' ],
			attributes: {
				name: name + '[dynamic]',
				value: 'dynamic',
			},
			label: wp.i18n.__( 'Dynamic image. Can be updated on the post editing screen.', 'sharing-image' ),
			checked: data.dynamic,
		},
		dynamic
	);

	Build.media( {
		name: name + '[attachment]',
		classes: [ 'sharing-image-editor-control-media' ],
		value: data.attachment,
		link: params.links.uploads,
		labels: {
			button: wp.i18n.__( 'Select an image', 'sharing-image' ),
			heading: wp.i18n.__( 'Select layer image', 'sharing-image' ),
			details: wp.i18n.__( 'Attachment details', 'sharing-image' ),
			remove: wp.i18n.__( 'Remove image', 'sharing-image' ),
		},
		append: dynamic,
		image: true,
		remove: true,
		help: wp.i18n.__(
			'This image is for example purposes only, to preview the editors appearance.',
			'sharing-image'
		),
		mime: [ 'image/png', 'image/jpeg', 'image/gif', 'image/webp' ],
	} );

	const fields = [];

	const presets = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		label: wp.i18n.__( 'Preset image field', 'sharing-image' ),
		fields: [
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'none',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Manual selection', 'sharing-image' ),
				checked: data.preset || 'none',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[preset]',
					value: 'featured',
				},
				dataset: {
					persistent: true,
				},
				label: wp.i18n.__( 'Use Post Featured Image', 'sharing-image' ),
				checked: data.preset || 'featured',
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = presets;

	// Helper function to toggle controls visibility and labels.
	const updateDynamic = () => {
		fields.forEach( ( field ) => {
			field.classList.toggle( 'control-hidden' );
		} );

		dynamic.classList.add( 'control-unhelp' );

		if ( checkbox.checked ) {
			dynamic.classList.remove( 'control-unhelp' );
		}
	};

	if ( ! checkbox.checked ) {
		updateDynamic();
	}

	checkbox.addEventListener( 'change', () => {
		updateDynamic();
	} );
}

/**
 * Creating a button to populate layer dimension fields.
 *
 * @param {HTMLElement} layer    Current layer element.
 * @param {HTMLElement} sizes    Sizes component.
 * @param {Function}    callback Callaback after button click.
 */
function createBackgroundButton( layer, sizes, callback ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-pulled' ],
		append: layer,
	} );

	const button = Build.element( 'button', {
		classes: [ 'sharing-image-editor-more' ],
		text: wp.i18n.__( 'Utilize image as poster background', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: control,
	} );

	button.addEventListener( 'click', () => {
		const fields = {};

		sizes.querySelectorAll( 'input' ).forEach( ( input ) => {
			fields[ input.dataset.dimension ] = input;
		} );

		fields.x.value = 0;
		fields.y.value = 0;

		// Set layer image size same as poster.
		fields.width.value = Helper.dataget( editor, 'editor', 'width' );
		fields.height.value = Helper.dataget( editor, 'editor', 'height' );

		return callback();
	} );
}

/**
 * Image layer sizes fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createImageSizesFields( layer, name, data ) {
	const fields = [];

	const sizes = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-sizes' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: name + '[x]',
					value: data.x,
					placeholder: '0',
				},
				dataset: {
					dimension: 'x',
				},
				label: wp.i18n.__( 'X', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: name + '[y]',
					value: data.y,
					placeholder: '0',
				},
				dataset: {
					dimension: 'y',
				},
				label: wp.i18n.__( 'Y', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: name + '[width]',
					value: data.width,
				},
				dataset: {
					dimension: 'width',
				},
				label: wp.i18n.__( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: name + '[height]',
					value: data.height,
				},
				dataset: {
					dimension: 'height',
				},
				label: wp.i18n.__( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Helper function to set full-size poster dimensions.
	createBackgroundButton( layer, sizes, () => {
		// Show dimensions options.
		toggleDimensions();

		// Regenerate right after size changed.
		generateTemplate();
	} );

	// Add boundary options.
	createBoundaryOptions( layer, name, data );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		label: wp.i18n.__( 'Image resizing principle', 'sharing-image' ),
		fields: [
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[resize]',
					value: 'center',
				},
				label: wp.i18n.__( 'Center image while preserving aspect ratio', 'sharing-image' ),
				checked: data.resize || 'center',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[resize]',
					value: 'top',
				},
				label: wp.i18n.__( 'Top aligned image while preserving aspect ratio', 'sharing-image' ),
				checked: data.resize || 'center',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[resize]',
					value: 'bottom',
				},
				label: wp.i18n.__( 'Bottom aligned image while preserving aspect ratio', 'sharing-image' ),
				checked: data.resize || 'center',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[resize]',
					value: 'ignore',
				},
				label: wp.i18n.__( 'Resize ignore the aspect ratio', 'sharing-image' ),
				checked: data.resize || 'center',
			},
			{
				group: 'radio',
				classes: [ 'sharing-image-editor-control-radio' ],
				attributes: {
					name: name + '[resize]',
					value: 'crop',
				},
				label: wp.i18n.__( 'Center-crop the image', 'sharing-image' ),
				checked: data.resize || 'center',
			},
		],
		append: layer,
	} );

	const dimensions = [];

	sizes.querySelectorAll( 'input' ).forEach( ( input ) => {
		if ( [ 'width', 'height' ].includes( input.dataset.dimension ) ) {
			dimensions.push( input );
		}
	} );

	// Helper function to trigger events on dimension changes.
	const toggleDimensions = () => {
		let empty = false;

		dimensions.forEach( ( input ) => {
			if ( input.value.length < 1 ) {
				empty = true;
			}
		} );

		fields.forEach( ( field ) => {
			field.classList.toggle( 'control-disabled', empty );
		} );
	};

	toggleDimensions();

	dimensions.forEach( ( dimension ) => {
		dimension.addEventListener( 'input', toggleDimensions );
	} );
}

/**
 * Update layer caption according to text fields value.
 *
 * @param {HTMLElement} layer    Current layer element.
 * @param {HTMLElement} checkbox Dynamic text checbox element.
 */
function updateLayerCaption( layer, checkbox ) {
	const caption = layer.querySelector( 'h2 > span' );

	if ( null === caption ) {
		return;
	}

	const fields = {};
	const prefix = ': ';

	layer.querySelectorAll( '[data-caption]' ).forEach( ( field ) => {
		fields[ field.dataset.caption ] = field;

		field.addEventListener( 'keyup', () => {
			caption.textContent = field.value ? prefix + field.value : '';
		} );
	} );

	caption.textContent = prefix + fields.content.value;

	if ( checkbox.checked ) {
		caption.textContent = prefix + fields.title.value;
	}

	if ( caption.textContent === prefix ) {
		caption.textContent = '';
	}
}

/**
 * Text layer more options fields manager.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createTextMoreFields( layer, name, data ) {
	const fields = [];

	fields[ fields.length ] = createFontField( layer, name, data );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-hidden' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-color' ],
				attributes: {
					type: 'color',
					name: name + '[color]',
					value: data.color || '#ffffff',
				},
				label: wp.i18n.__( 'Text color', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	fields[ fields.length ] = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-series', 'control-hidden' ],
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-editor-control-select' ],
				options: {
					left: wp.i18n.__( 'Left', 'sharing-image' ),
					center: wp.i18n.__( 'Center', 'sharing-image' ),
					right: wp.i18n.__( 'Right', 'sharing-image' ),
				},
				attributes: {
					name: name + '[horizontal]',
				},
				label: wp.i18n.__( 'Horizontal alignment', 'sharing-image' ),
				selected: data.horizontal,
			},
			{
				group: 'select',
				classes: [ 'sharing-image-editor-control-select' ],
				options: {
					top: wp.i18n.__( 'Top', 'sharing-image' ),
					center: wp.i18n.__( 'Center', 'sharing-image' ),
					bottom: wp.i18n.__( 'Bottom', 'sharing-image' ),
				},
				attributes: {
					name: name + '[vertical]',
				},
				label: wp.i18n.__( 'Vertical alignment', 'sharing-image' ),
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
		text: wp.i18n.__( 'More options', 'sharing-image' ),
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

	// Open more fields for existing layers.
	if ( Object.keys( data ).length > 0 ) {
		button.click();
	}
}

/**
 * Create font field in text layer.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createFontField( layer, name, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-upload', 'control-hidden' ],
		append: layer,
	} );

	const select = Build.select(
		{
			classes: [ 'sharing-image-editor-control-select' ],
			options: params.fonts,
			attributes: {
				name: name + '[fontname]',
			},
			label: wp.i18n.__( 'Font family', 'sharing-image' ),
			selected: data.fontname,
		},
		control
	);

	const media = Build.media( {
		name: name + '[fontfile]',
		classes: [ 'sharing-image-editor-control-media' ],
		value: data.fontfile,
		link: params.links.uploads,
		labels: {
			button: wp.i18n.__( 'Upload custom font', 'sharing-image' ),
			heading: wp.i18n.__( 'Upload custom font', 'sharing-image' ),
			details: wp.i18n.__( 'Font attachment', 'sharing-image' ),
			remove: wp.i18n.__( 'Remove font', 'sharing-image' ),
		},
		remove: true,
		mime: [ 'font/ttf', 'font/otf' ],
		append: control,
	} );

	Build.element( 'small', {
		text: wp.i18n.__( 'Custom font can only be in .ttf or .otf format.', 'sharing-image' ),
		append: control,
	} );

	if ( data.fontfile ) {
		select.disabled = true;
	}

	// Find media attachment input.
	const input = media.querySelector( 'input' );

	input.addEventListener( 'change', () => {
		select.disabled = false;

		if ( input.value ) {
			select.disabled = true;
		}
	} );

	return control;
}

/**
 * Rectangle layer outline option.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createRectangleOutline( layer, name, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		append: layer,
	} );

	const checkbox = Build.checkbox(
		{
			classes: [ 'sharing-image-editor-control-checkbox' ],
			attributes: {
				name: name + '[outline]',
				value: 'outline',
			},
			label: wp.i18n.__( 'Outline rectangle.', 'sharing-image' ),
			checked: data.outline,
		},
		control
	);

	const range = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-hidden' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[thickness]',
					min: 0,
					max: 50,
					step: 1,
					value: data.thickness || '0',
				},
				label: wp.i18n.__( 'Border width', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	if ( data.outline ) {
		range.classList.remove( 'control-hidden' );
	}

	checkbox.addEventListener( 'change', () => {
		range.classList.add( 'control-hidden' );

		if ( checkbox.checked ) {
			range.classList.remove( 'control-hidden' );
		}
	} );
}

/**
 * Boundary options for multuple layers.
 *
 * @param {HTMLElement} layer Current layer element.
 * @param {string}      name  Fields name attribute prefix.
 * @param {Object}      data  Layer data object.
 */
function createBoundaryOptions( layer, name, data ) {
	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-extend', 'control-pulled', 'control-upnext' ],
		label: wp.i18n.__( 'Relative boundaries', 'sharing-image' ),
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-editor-control-select' ],
				options: {
					absolute: wp.i18n.__( 'No Relative Positioning', 'sharing-image' ),
					vertically: wp.i18n.__( 'Vertical Only', 'sharing-image' ),
					horizontally: wp.i18n.__( 'Horizontal Only', 'sharing-image' ),
					both: wp.i18n.__( 'Both Directions Alignment', 'sharing-image' ),
				},
				attributes: {
					name: name + '[boundary]',
				},
				selected: data.boundary,
			},
		],
		help: wp.i18n.__( 'Using offset from previous layer.', 'sharing-image' ),
		append: layer,
	} );
}

/**
 * Create catalog button in footer.
 *
 * @param {HTMLElement} footer Footer HTML element.
 */
function createCatalogButton( footer ) {
	const link = new URL( document.location.href );
	link.searchParams.delete( 'template' );

	Build.element( 'a', {
		classes: [ 'button' ],
		text: wp.i18n.__( '← Back to Catalog', 'sharing-image' ),
		attributes: {
			href: link.href,
		},
		append: footer,
	} );
}

/**
 * Create template deletion button in footer.
 *
 * @param {HTMLElement} footer Footer HTML element.
 */
function createDeleteButton( footer ) {
	const href = new URL( document.location.href );

	// Get template index from current link.
	const index = href.searchParams.get( 'template' );

	// Set template index to delete link.
	const link = new URL( params.links.action );

	link.searchParams.set( 'action', 'sharing_image_delete' );
	link.searchParams.set( 'template', index );
	link.searchParams.set( 'nonce', params.nonce );

	const button = Build.element( 'a', {
		classes: [ 'sharing-image-editor-delete' ],
		text: wp.i18n.__( 'Delete template', 'sharing-image' ),
		attributes: {
			href: link.href,
		},
		append: footer,
	} );

	button.addEventListener( 'click', ( e ) => {
		const message = wp.i18n.__( 'Are you sure you want to delete this template?', 'sharing-image' );

		if ( ! confirm( message ) ) { // eslint-disable-line
			e.preventDefault();
		}
	} );
}

/**
 * Create preview element.
 *
 * @param {HTMLElement} viewport Monitor viewport element.
 * @param {Object}      data     Template data object.
 */
function createPreview( viewport, data ) {
	preview = Build.element( 'div', {
		classes: [ 'sharing-image-editor-preview', 'preview-blank' ],
		append: viewport,
	} );

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

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: params.name + '[preview]',
			value: data.preview,
		},
		append: preview,
	} );

	return preview;
}

/**
 * Create button to collapse layer.
 *
 * @param {HTMLElement} layer
 * @param {Object}      data  Current template data.
 * @param {string}      name  Layer name id.
 */
function createCollapseButton( layer, data, name ) {
	const label = layer.querySelector( 'h2' );

	const button = Build.element( 'button', {
		classes: [ 'sharing-image-editor-collapse' ],
		attributes: {
			type: 'button',
			title: wp.i18n.__( 'Collapse layer', 'sharing-image' ),
		},
		prepend: label,
	} );

	let collapsed = data.collapsed === 1;

	if ( collapsed ) {
		layer.classList.add( 'layer-collapsed' );
	}

	const input = Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[collapsed]',
			value: Number( collapsed ),
		},
		append: layer,
	} );

	button.addEventListener( 'click', ( e ) => {
		e.preventDefault();

		collapsed = ! collapsed;

		// Collapse/expand layer.
		layer.classList.toggle( 'layer-collapsed', collapsed );

		// Change button title.
		button.setAttribute( 'title', wp.i18n.__( 'Collapse layer', 'sharing-image' ) );

		if ( collapsed ) {
			button.setAttribute( 'title', wp.i18n.__( 'Expand layer', 'sharing-image' ) );
		}

		input.value = Number( collapsed );
	} );
}

/**
 * Create button inside layer box to change order.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */
function createOrderLayersButton( designer, layer ) {
	Build.element( 'button', {
		classes: [ 'sharing-image-editor-order' ],
		attributes: {
			type: 'button',
			title: wp.i18n.__( 'Change layer position', 'sharing-image' ),
		},
		append: layer,
	} );

	Sortable.create( designer, {
		handle: '.sharing-image-editor-order',
		onUpdate: () => {
			if ( editor.classList.contains( 'editor-suspend' ) ) {
				return;
			}

			generateTemplate();
		},
	} );
}

/**
 * Create button to delete layer.
 *
 * @param {HTMLElement} designer Layers designer HTML element.
 * @param {HTMLElement} layer    Current layer HTML emelemt.
 */
function createDeleteLayerButton( designer, layer ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-footer' ],
		append: layer,
	} );

	const button = Build.element( 'button', {
		classes: [ 'sharing-image-editor-delete' ],
		text: wp.i18n.__( 'Delete layer', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: control,
	} );

	button.addEventListener( 'click', () => {
		designer.removeChild( layer );

		if ( editor.classList.contains( 'editor-suspend' ) ) {
			return;
		}

		generateTemplate();
	} );
}

/**
 * Create image layer.
 *
 * @param {Object} data Current template layer data.
 * @param {string} name Layer name id.
 */
function createLayerImage( data, name ) {
	const description = [];

	description.push( wp.i18n.__( 'Use jpg, gif or png image formats.', 'sharing-image' ) );

	description.push(
		wp.i18n.__( 'Leave width and height fields blank to use the original image size.', 'sharing-image' )
	);

	description.push( wp.i18n.__( 'Sizes are calculated proportionally if not filled.', 'sharing-image' ) );
	description.push( wp.i18n.__( 'You can use negative position and dimensions.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-image' ],
		label: wp.i18n.__( 'Image', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'image',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-extend' ],
		help: wp.i18n.__( 'Only visible on the admin side.', 'sharing-image' ),
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: name + '[title]',
					value: data.title,
				},
				dataset: {
					caption: 'title',
				},
				label: wp.i18n.__( 'Field name', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Create static/dynamic image fields.
	createImageDynamicFields( layer, name, data );

	// Create static/dynamic image fields.
	createImageSizesFields( layer, name, data );

	return layer;
}

/**
 * Create text layer.
 *
 * @param {Object} data Current template data.
 * @param {string} name Layer name id.
 */
function createLayerText( data, name ) {
	const description = [];

	description.push( wp.i18n.__( 'Write a text to the current image.', 'sharing-image' ) );

	description.push(
		wp.i18n.__( 'If the font does not fit within your limits, its size will decrease.', 'sharing-image' )
	);
	description.push(
		wp.i18n.__( 'Avoid using large font sizes for long text – this affects performance.', 'sharing-image' )
	);

	description.push( wp.i18n.__( 'You can use negative position and dimensions.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: wp.i18n.__( 'Text', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'text',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-sizes' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[x]',
					value: data.x,
					placeholder: '10',
				},
				label: wp.i18n.__( 'X', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[y]',
					value: data.y,
					placeholder: '10',
				},
				label: wp.i18n.__( 'Y', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[width]',
					value: data.width,
					placeholder: '1000',
				},
				label: wp.i18n.__( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[height]',
					value: data.height,
				},
				label: wp.i18n.__( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Add boundary options.
	createBoundaryOptions( layer, name, data );

	// Create static/dynamic text fields.
	createTextDynamicFields( layer, name, data );

	// Create more options.
	createTextMoreFields( layer, name, data );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-series' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[fontsize]',
					min: 10,
					max: 200,
					step: 1,
					value: data.fontsize || '48',
				},
				label: wp.i18n.__( 'Font size', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[lineheight]',
					min: 0,
					max: 4,
					step: 0.125,
					value: data.lineheight || '1.5',
				},
				label: wp.i18n.__( 'Line height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[separator]',
			value: ', ',
		},
		append: layer,
	} );

	return layer;
}

/**
 * Create filter layer.
 *
 * @param {Object} data Current template data.
 * @param {string} name Layer name id.
 */
function createLayerFilter( data, name ) {
	const description = [];

	description.push(
		wp.i18n.__( 'Filters are applied one after another to the entire editor image.', 'sharing-image' )
	);

	description.push( wp.i18n.__( 'If you want to control their order, create multiple layers.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: wp.i18n.__( 'Filter', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

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
				classes: [ 'sharing-image-editor-control-checkbox' ],
				attributes: {
					name: name + '[grayscale]',
					value: 'grayscale',
				},
				label: wp.i18n.__( 'Turns image into a grayscale version', 'sharing-image' ),
				checked: data.grayscale,
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'checkbox',
				classes: [ 'sharing-image-editor-control-checkbox' ],
				attributes: {
					name: name + '[blur]',
					value: 'blur',
				},
				label: wp.i18n.__( 'Blur image by Gaussian effect', 'sharing-image' ),
				checked: data.blur,
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[contrast]',
					min: -50,
					max: 50,
					step: 5,
					value: data.contrast || '0',
				},
				label: wp.i18n.__( 'Contrast', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[brightness]',
					min: -50,
					max: 50,
					step: 5,
					value: data.brightness || '0',
				},
				label: wp.i18n.__( 'Brightness', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[blackout]',
					min: 0,
					max: 100,
					step: 5,
					value: data.blackout || '0',
				},
				label: wp.i18n.__( 'Blackout', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	return layer;
}

/**
 * Create rectangle layer.
 *
 * @param {Object} data Current template data.
 * @param {string} name Layer name id.
 */
function createLayerRectangle( data, name ) {
	const description = [];

	description.push( wp.i18n.__( 'Draw a colored rectangle on current image.', 'sharing-image' ) );

	description.push(
		wp.i18n.__( 'You can get filled or outlined figure with custom color and opacity.', 'sharing-image' )
	);

	description.push( wp.i18n.__( 'Use small height to draw the line.', 'sharing-image' ) );
	description.push( wp.i18n.__( 'You can use negative position and dimensions.', 'sharing-image' ) );

	const layer = Build.layer( {
		classes: [ 'sharing-image-editor-layer', 'layer-text' ],
		label: wp.i18n.__( 'Rectangle', 'sharing-image' ),
		description: description.join( ' ' ),
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: name + '[type]',
			value: 'rectangle',
		},
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-color' ],
				attributes: {
					type: 'color',
					name: name + '[color]',
					value: data.color || '#ffffff',
				},
				label: wp.i18n.__( 'Rectangle color', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-sizes' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[x]' || '10',
					value: data.x,
				},
				label: wp.i18n.__( 'X', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[y]' || '10',
					value: data.y,
				},
				label: wp.i18n.__( 'Y', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[width]',
					value: data.width,
				},
				label: wp.i18n.__( 'Width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					type: 'text',
					name: name + '[height]',
					value: data.height,
				},
				label: wp.i18n.__( 'Height', 'sharing-image' ),
			},
		],
		append: layer,
	} );

	// Add boundary options.
	createBoundaryOptions( layer, name, data );

	createRectangleOutline( layer, name, data );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-range' ],
				attributes: {
					type: 'range',
					name: name + '[opacity]',
					min: 0,
					max: 100,
					step: 5,
					value: data.opacity || '0',
				},
				label: wp.i18n.__( 'Opacity', 'sharing-image' ),
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
 * @param {string}      type     New layer type.
 * @param {Object}      data     New layer data.
 */
function createLayer( designer, type, data = {} ) {
	let layer = null;

	// Get layer id from data.
	const uniqid = data.uniqid || Helper.uniqid();

	// Form fields name for this layer.
	const name = params.name + `[layers][${ uniqid }]`;

	switch ( type ) {
		case 'text':
			layer = createLayerText( data, name );
			break;

		case 'image':
			layer = createLayerImage( data, name );
			break;

		case 'filter':
			layer = createLayerFilter( data, name );
			break;

		case 'rectangle':
			layer = createLayerRectangle( data, name );
			break;

		default:
			return null;
	}

	designer.appendChild( layer );

	// Button to delete layer.
	createDeleteLayerButton( designer, layer );

	// Button to collapse layer.
	createCollapseButton( layer, data, name );

	// Drag-n-drop button.
	createOrderLayersButton( designer, layer );

	return layer;
}

/**
 * Create layers designer control.
 *
 * @param {HTMLElement} fieldset Fieldset HTML element.
 * @param {Object}      data     Current template data.
 */
function createDesigner( fieldset, data ) {
	const control = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-select', 'control-compact' ],
		fields: [
			{
				group: 'select',
				classes: [ 'sharing-image-editor-control-select' ],
				options: {
					text: wp.i18n.__( 'Text', 'sharing-image' ),
					image: wp.i18n.__( 'Image', 'sharing-image' ),
					filter: wp.i18n.__( 'Filter', 'sharing-image' ),
					rectangle: wp.i18n.__( 'Rectangle', 'sharing-image' ),
				},
			},
		],
		append: fieldset,
	} );

	const button = Build.element( 'button', {
		classes: [ 'button' ],
		text: wp.i18n.__( 'Add new', 'sharing-image' ),
		attributes: {
			type: 'button',
		},
		append: control,
	} );

	button.addEventListener( 'click', () => {
		const select = control.querySelector( 'select' );

		if ( null === select ) {
			return;
		}

		const layer = createLayer( designer, select.value );

		layer.scrollIntoView( {
			behavior: 'smooth',
		} );
	} );

	const designer = Build.element( 'div', {
		classes: [ 'sharing-image-editor-designer' ],
		append: fieldset,
	} );

	data.layers = data.layers || {};

	for ( const uniqid in data.layers ) {
		const item = data.layers[ uniqid ];

		item.uniqid = uniqid;

		if ( item.hasOwnProperty( 'type' ) ) {
			const created = createLayer( designer, item.type, item );

			if ( ! created ) {
				return;
			}
		}
	}
}

/**
 * Create common settings on template editor screen.
 *
 * @param {Object} data Current template data.
 */
function createFieldset( data ) {
	const fieldset = Build.element( 'div', {
		classes: [ 'sharing-image-editor-fieldset' ],
		append: editor,
	} );

	// Create template title control.
	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-compact', 'control-extend' ],
		help: wp.i18n.__( 'Used only in the admin panel', 'sharing-image' ),
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: params.name + '[title]',
					value: data.title,
				},
				dataset: {
					persistent: true,
					editor: 'title',
				},
				label: wp.i18n.__( 'Template title', 'sharing-image' ),
			},
		],
		append: fieldset,
	} );

	Build.control( {
		classes: [ 'sharing-image-editor-control' ],
		label: wp.i18n.__( 'Fill color', 'sharing-image' ),
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-color' ],
				attributes: {
					name: params.name + '[fill]',
					type: 'color',
					value: data.fill,
				},
				dataset: {
					editor: 'fill',
				},
			},
		],
		append: fieldset,
	} );

	// Create width/height settings control.
	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-compact', 'control-sizes' ],
		fields: [
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: params.name + '[width]',
					value: data.width || '1200',
					placeholder: '1200',
					maxlength: 4,
				},
				dataset: {
					editor: 'width',
				},
				label: wp.i18n.__( 'Editor width', 'sharing-image' ),
			},
			{
				group: 'input',
				classes: [ 'sharing-image-editor-control-input' ],
				attributes: {
					name: params.name + '[height]',
					value: data.height || '630',
					placeholder: '630',
					maxlength: 4,
				},
				dataset: {
					editor: 'height',
				},
				label: wp.i18n.__( 'Editor height', 'sharing-image' ),
			},
		],
		append: fieldset,
	} );

	const description = [];

	description.push( wp.i18n.__( 'You can add multiple layers on your editor.', 'sharing-image' ) );
	description.push( wp.i18n.__( 'Note that the stacking order of the layers is important.', 'sharing-image' ) );

	description.push(
		wp.i18n.__( 'You can change the order using the icon in the corner of each box.', 'sharing-image' )
	);

	Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-reduced' ],
		label: wp.i18n.__( 'Add layers', 'sharing-image' ),
		description: description.join( ' ' ),
		append: fieldset,
	} );

	// Create layers designer block.
	createDesigner( fieldset, data );

	const footer = Build.control( {
		classes: [ 'sharing-image-editor-control', 'control-footer' ],
		append: fieldset,
	} );

	// Create back to catalog button.
	createCatalogButton( footer );

	// Create template deletion button.
	createDeleteButton( footer );

	fieldset.addEventListener( 'change', ( e ) => {
		if ( editor.classList.contains( 'editor-suspend' ) ) {
			return;
		}

		const target = e.target;

		// Skip fields that don't affect the poster.
		if ( target.hasAttribute( 'data-persistent' ) ) {
			return;
		}

		if ( ! target.hasAttribute( 'name' ) ) {
			return;
		}

		generateTemplate();
	} );
}

/**
 * Create button to submit editor form.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createSubmitButton( manager ) {
	Build.element( 'button', {
		text: wp.i18n.__( 'Save changes', 'sharing-image' ),
		classes: [ 'button', 'button-primary' ],
		attributes: {
			type: 'submit',
		},
		append: manager,
	} );
}

/**
 * Create button to generate new template manually.
 *
 * @param {HTMLElement} manager Manager element.
 */
function createGenerateButton( manager ) {
	const button = Build.element( 'button', {
		text: wp.i18n.__( 'Generate preview', 'sharing-image' ),
		classes: [ 'button' ],
		attributes: {
			type: 'button',
		},
		append: manager,
	} );

	button.addEventListener( 'click', () => {
		generateTemplate();
	} );
}

/**
 * Create debug text checkbox.
 *
 * @param {HTMLElement} manager Manager element.
 * @param {Object}      data    Template data.
 */
function createDebugCheckbox( manager, data ) {
	const checkbox = Build.checkbox(
		{
			classes: [ 'sharing-image-editor-debug' ],
			attributes: {
				name: params.name + '[debug]',
				value: 'debug',
			},
			label: wp.i18n.__( 'Show debug frames', 'sharing-image' ),
			checked: data.debug,
		},
		manager
	);

	checkbox.addEventListener( 'change', () => {
		generateTemplate();
	} );
}

/**
 * Create template settings preview.
 *
 * @param {Object} data Current template data.
 */
function createMonitor( data ) {
	const monitor = Build.element( 'div', {
		classes: [ 'sharing-image-editor-monitor' ],
		append: editor,
	} );

	const viewport = Build.element( 'div', {
		classes: [ 'sharing-image-editor-viewport' ],
		append: monitor,
	} );

	createPreview( viewport, data );

	Build.element( 'div', {
		classes: [ 'sharing-image-editor-warning' ],
		append: viewport,
	} );

	const manager = Build.element( 'div', {
		classes: [ 'sharing-image-editor-manager' ],
		append: viewport,
	} );

	// Create debug only checkbox.
	createDebugCheckbox( manager, data );

	// Create submit form button.
	createSubmitButton( manager );

	// Create template generator button.
	createGenerateButton( manager );
}

/**
 * Create form hidden settings fields.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {string}      index   Current option index.
 */
function prepareEditor( content, index ) {
	params.name = 'sharing_image_editor';

	const form = Build.element( 'form', {
		classes: [ 'sharing-image-editor' ],
		attributes: {
			action: params.links.action,
			method: 'POST',
		},
		append: content,
	} );

	if ( params.config.suspend ) {
		form.classList.add( 'editor-suspend' );
	}

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'action',
			value: params.name,
		},
		append: form,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_index',
			value: index,
		},
		append: form,
	} );

	Build.element( 'input', {
		attributes: {
			type: 'hidden',
			name: 'sharing_image_nonce',
			value: params.nonce,
		},
		append: form,
	} );

	form.addEventListener( 'submit', ( e ) => {
		e.preventDefault();

		saveTemplate();
	} );

	return form;
}

/**
 * Create template editor page.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 * @param {number}      index    Current option index.
 * @param {Object}      data     Template data.
 */
function createEditor( content, settings, index, data = {} ) {
	params = settings;

	// Prepare form with hidden fields and events.
	editor = prepareEditor( content, index );

	// Create monitor section part.
	createMonitor( data );

	// Create fieldset section part.
	createFieldset( data );
}

export default createEditor;
