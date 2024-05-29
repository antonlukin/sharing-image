import Helper from '../helpers';

import Tools from './tools';
import Catalog from './catalog';
import Premium from './premium';
import Editor from './editor';
import Config from './config';

import './styles.scss';

/**
 * Init premium settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */
function initPremiumTab( content, settings ) {
	Premium( content, settings );
}

/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */
function initConfigTab( content, settings ) {
	Config( content, settings );
}

/**
 * Init tools settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */
function initToolsTab( content, settings ) {
	Tools( content, settings );
}

/**
 * Init config settings tab.
 *
 * @param {HTMLElement} content  Settings content element.
 * @param {Object}      settings Global settings object.
 */
function initTemplatesTab( content, settings ) {
	// Get index from URL search parameter.
	let index = null;

	// Set default templates empty list.
	settings.templates = settings.templates || [];

	if ( Helper.param( 'template' ) ) {
		index = Helper.param( 'template' );
	}

	const data = settings.templates[ index ];

	// Create editor for existing template.
	if ( undefined !== data ) {
		return Editor( content, settings, index, data );
	}

	// Create editor for new template.
	if ( null === index ) {
		return Catalog( content, settings );
	}

	Editor( content, settings, index );
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

		case 'tools':
			initToolsTab( content, object );

			break;

		case 'premium':
			initPremiumTab( content, object );

			break;

		default:
			initTemplatesTab( content, object );
	}
} )();
