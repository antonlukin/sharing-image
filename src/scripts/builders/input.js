import buildElement from './element.js';

/**
 * Helper to create input field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildInput( args, parent ) {
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

	const input = buildElement( 'input', {
		attributes: {
			type: 'text',
		},
		append: field,
	} );

	// Set attributes
	if ( args.hasOwnProperty( 'attributes' ) ) {
		for ( const key in args.attributes ) {
			input.setAttribute( key, args.attributes[ key ] );
		}
	}

	return input;
}

export default buildInput;
