import Build from '../builders';

const { __ } = wp.i18n;

/**
 * Create poster card in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {number} index Current card index.
 * @param {Object} option List of poster options.
 */
function createCard( catalog, index, option ) {
	const card = Build.element( 'div', {
		classes: [ 'sharing-image-catalog-card' ],
		append: catalog,
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
	link.searchParams.set( 'poster', index );

	Build.element( 'a', {
		classes: [ 'button' ],
		text: __( 'Edit poster', 'sharing-image' ),
		attributes: {
			href: link,
		},
		append: footer,
	} );
}

/**
 * Create new poster button in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {number} index New card index.
 */
function createNewButton( catalog, index ) {
	const link = new URL( document.location.href );
	link.searchParams.set( 'poster', index );

	const button = Build.element( 'a', {
		classes: [ 'sharing-image-catalog-new' ],
		attributes: {
			href: link,
		},
		append: catalog,
	} );

	Build.element( 'h2', {
		text: __( 'Add new template', 'sharing-image' ),
		append: button,
	} );
}

/**
 * Create posters catalog from options.
 *
 * @param {HTMLElement} form Settings form element.
 * @param {Object} settings Global settings field.
 */
function createCatalog( form, settings ) {
	const catalog = Build.element( 'div', {
		classes: [ 'sharing-image-catalog' ],
		prepend: form,
	} );

	let index = 1;

	settings.posters.forEach( ( poster ) => {
		createCard( catalog, index++, poster );
	} );

	createNewButton( catalog, index );
}

export default createCatalog;
