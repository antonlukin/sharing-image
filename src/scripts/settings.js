import Helper from './helpers';
import Section from './sections';

/**
 * Init premium settings tab.
 */
function initPremiumTab() {}

/**
 * Init config settings tab.
 */
function initConfigTab() {}

/**
 * Init config settings tab.
 *
 * @param {HTMLElement} form Settings form element.
 */
function initPostersTab( form ) {
	const settings = window.sharingImageSettings || {};

	// Get index from URL search parameter.
	const index = parseInt( Helper.param( 'poster' ) ) - 1;

	// Get posters from settings.
	settings.posters = settings.posters || [];

	const data = settings.posters[ index ];

	// Create editor for existing poster.
	if ( undefined !== data ) {
		return Section.editor( form, settings, index, data );
	}

	// Create editor for new poster.
	if ( settings.posters.length === index ) {
		return Section.editor( form, settings, index );
	}

	return Section.catalog( form, settings );
}

/**
 * Route settings by url parameter.
 */
const routeSettings = () => {
	if ( typeof 'undefined' === wp ) {
		return;
	}

	// Find root settings element.
	const screen = document.getElementById( 'sharing-image-settings' );

	if ( null === screen ) {
		return;
	}

	const form = screen.querySelector( '.sharing-image-form' );

	if ( null === form ) {
		return;
	}

	const tab = Helper.param( 'tab' );

	switch ( tab ) {
		case 'config':
			return initConfigTab();

		case 'premium':
			return initPremiumTab();

		default:
			return initPostersTab( form );
	}
};

routeSettings();
