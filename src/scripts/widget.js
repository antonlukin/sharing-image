import Picker from './sections/picker.js';

/**
 * Init metabox handler.
 */
( function() {
	if ( typeof 'undefined' === wp ) {
		return;
	}

	const object = window.sharingImageWidget || {};

	// Set default templates empty list.
	object.templates = object.templates || [];

	// Find metabox element.
	const widgets = document.querySelectorAll( '.sharing-image-widget' );

	widgets.forEach( ( widget ) => {
		if ( object.context ) {
			widget.classList.add( `widget-${ object.context }` );
		}

		Picker( widget, object );
	} );
}() );
