import buildElement from './element.js';

/**
 * Helper to create input field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildTextarea( args, parent ) {
	const field = buildElement( 'div', {
		classes: args.classes || [],
		append: parent,
	} );

	if ( args.hasOwnProperty( 'label' ) ) {
		buildElement( 'strong', {
			text: args.label,
			append: field,
		} );
	}

	const textarea = buildElement( 'textarea', {
		append: field,
	} );

	// Set attributes
	if ( args.hasOwnProperty( 'attributes' ) ) {
		for ( const key in args.attributes ) {
			textarea.setAttribute( key, args.attributes[ key ] );
		}
	}

	// Set content
	if ( args.hasOwnProperty( 'content' ) ) {
		textarea.innerHTML = args.content;
	}

	return textarea;
}

export default buildTextarea;
