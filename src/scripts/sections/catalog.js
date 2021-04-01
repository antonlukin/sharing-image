import Build from '../builders';

const { __ } = wp.i18n;

/**
 * Create template card in catalog.
 *
 * @param {HTMLElement} form Form HTML element.
 * @param {number} index Current card index.
 * @param {Object} option List of template options.
 */
function createCard( form, index, option ) {
	const card = Build.element( 'div', {
		classes: [ 'sharing-image-catalog-card' ],
		append: form,
	} );

	const preview = Build.element( 'figure', {
		classes: [ 'sharing-image-catalog-preview' ],
		append: card,
	} );

	if ( option.preview ) {
		Build.element( 'img', {
			attributes: {
				src: option.preview,
				alt: '',
			},
			append: preview,
		} );
	}

	const footer = Build.element( 'footer', {
		classes: [ 'sharing-image-catalog-footer' ],
		append: card,
	} );

	Build.element( 'h2', {
		text: option.title || __( 'Untitled', 'sharing-image' ),
		append: footer,
	} );

	const link = new URL( document.location.href );
	link.searchParams.set( 'template', index );

	Build.element( 'a', {
		classes: [ 'button' ],
		text: __( 'Edit template', 'sharing-image' ),
		attributes: {
			href: link,
		},
		append: footer,
	} );
}

/**
 * Create new template button in catalog.
 *
 * @param {HTMLElement} form Form HTML element.
 * @param {number} index New card index.
 */
function createNewButton( form, index ) {
	const link = new URL( document.location.href );
	link.searchParams.set( 'template', index );

	const button = Build.element( 'a', {
		classes: [ 'sharing-image-catalog-new' ],
		attributes: {
			href: link,
		},
		append: form,
	} );

	Build.element( 'h2', {
		text: __( 'Add new template', 'sharing-image' ),
		append: button,
	} );
}

/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} form Settings form element.
 * @param {Object} settings Global settings field.
 */
function createCatalog( form, settings ) {
	form.classList.add( 'sharing-image-catalog' );

	let index = 1;

	settings.templates.forEach( ( template ) => {
		createCard( form, index++, template );
	} );

	createNewButton( form, index );
}

export default createCatalog;
