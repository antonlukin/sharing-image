import Helper from './helpers';
import Section from './sections';

/**
 * Init premium settings tab.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings object.
 */
function initPremiumTab( content, settings ) {
	Section.premium( content, settings );
}

/**
 * Init config settings tab.
 */
function initConfigTab() {}

/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content Settings content element.
 * @param {Object} settings Global settings object.
 */
function initTemplatesTab( content, settings ) {
	// Get index from URL search parameter.
	let index = null;

	// Set default templates empty list.
	settings.templates = settings.templates || [];

	if ( Helper.param( 'template' ) ) {
		index = parseInt( Helper.param( 'template' ) ) - 1;
	}

	const data = settings.templates[ index ];

	// Create editor for existing template.
	if ( undefined !== data ) {
		return Section.editor( content, settings, index, data );
	}

	// Create editor for new template.
	if ( settings.templates.length === index ) {
		return Section.editor( content, settings, index );
	}

	Section.catalog( content, settings );
}

/**
 * Init settings page handler.
 */
( function () {
	if ( typeof 'undefined' === wp ) {
		return;
	}

	let object = window.sharingImageSettings || {};

	// Add default required values to object.
	object = Helper.defaults( object, [ 'links', 'fonts', 'config', 'templates', 'license' ] );

	// Find settings content element.
	const content = document.querySelector( '#sharing-image-settings .sharing-image-content' );

	if ( null === content ) {
		return;
	}

	content.classList.add( 'content-visible' );

	switch ( Helper.param( 'tab' ) ) {
		case 'config':
			initConfigTab( content, object );

			break;

		case 'premium':
			initPremiumTab( content, object );

			break;

		default:
			initTemplatesTab( content, object );
	}
} )();
