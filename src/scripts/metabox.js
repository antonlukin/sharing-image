import Section from './sections';

/**
 * Init metabox handler.
 */
( function () {
	if ( typeof 'undefined' === wp ) {
		return;
	}

	// Find metabox element.
	const inside = document.querySelector( '#sharing-image-metabox > .inside' );

	if ( null === inside ) {
		return;
	}

	const object = window.sharingImageMetabox || {};

	// Set default templates empty list.
	object.templates = object.templates || [];

	Section.picker( inside, object );
} )();
