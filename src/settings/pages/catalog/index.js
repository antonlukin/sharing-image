import Build from '../../../builders';
import './styles.scss';

// Store global scriot object for settings page.
let params = null;

/**
 * Create template card in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {Object}      option  List of template options.
 * @param {string}      index   Template index.
 */
function createCard( catalog, option, index ) {
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
		text: option.title || wp.i18n.__( 'Untitled', 'sharing-image' ),
		append: footer,
	} );

	const link = new URL( document.location.href );
	link.searchParams.set( 'template', index );

	Build.element( 'a', {
		classes: [ 'button' ],
		text: wp.i18n.__( 'Edit template', 'sharing-image' ),
		attributes: {
			href: link.href,
		},
		append: footer,
	} );
}

/**
 * Create new template button in catalog.
 *
 * @param {HTMLElement} catalog Catalog HTML element.
 * @param {string}      index   Template index.
 */
function createNewButton( catalog, index ) {
	const link = new URL( document.location.href );
	link.searchParams.set( 'template', index );

	const button = Build.element( 'a', {
		classes: [ 'sharing-image-catalog-new' ],
		attributes: {
			href: link.href,
		},
		append: catalog,
	} );

	const title = Build.element( 'h2', {
		append: button,
	} );

	Build.element( 'strong', {
		text: wp.i18n.__( 'Add new template', 'sharing-image' ),
		append: title,
	} );

	// Restrict new template creation for not Premium users.
	if ( params.templates.length === 0 ) {
		return;
	}

	const license = params.license || {};

	if ( license.premium || license.develop ) {
		return;
	}

	Build.element( 'span', {
		text: wp.i18n.__( '(Availible for Premium only)', 'sharing-image' ),
		append: title,
	} );

	if ( params.links.premium ) {
		button.href = params.links.premium;
	}
}

/**
 * Create templates catalog from options.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings field.
 */
function createCatalog( content, settings ) {
	params = settings;

	const catalog = Build.element( 'div', {
		classes: [ 'sharing-image-catalog' ],
		append: content,
	} );

	for ( const index in settings.templates ) {
		createCard( catalog, settings.templates[ index ], index );
	}

	createNewButton( catalog, settings.index );
}

export default createCatalog;
