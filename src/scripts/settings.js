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
function initTemplatesTab( form ) {
	const object = window.sharingImageSettings || {};

	// Get index from URL search parameter.
	let index = null;

	// Set default templates empty list.
	object.templates = object.templates || [];

	if ( Helper.param( 'template' ) ) {
		index = parseInt( Helper.param( 'template' ) ) - 1;
	}

	const data = object.templates[ index ];

	// Create editor for existing template.
	if ( undefined !== data ) {
		return Section.editor( form, object, index, data );
	}

	// Create editor for new template.
	if ( object.templates.length === index ) {
		return Section.editor( form, object, index );
	}

	return Section.catalog( form, object );
}

/**
 * Init settings page handler.
 */
( function () {
	if ( typeof 'undefined' === wp ) {
		return;
	}

	// Find settings form element.
	const form = document.querySelector( '#sharing-image-settings > form' );

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
			return initTemplatesTab( form );
	}
} )();
