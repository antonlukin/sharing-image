import buildElement from './element.js';

/**
 * Helper to create input field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildTextarea( args, parent ) {
	const field = buildElement( 'div', {
		classes: args.classes || [],
		append: parent,
	} );

	if ( args.hasOwnProperty( 'label' ) ) {
		const label = buildElement( 'h4', {
			text: args.label,
		} );

		if ( null !== args.label ) {
			field.appendChild( label );
		}
	}

	const textarea = buildElement( 'textarea', {
		dataset: args.dataset || {},
		append: field,
	} );

	// Set attributes
	if ( args.hasOwnProperty( 'attributes' ) ) {
		for ( const key in args.attributes ) {
			const value = args.attributes[ key ];

			if ( undefined === value ) {
				continue;
			}

			textarea.setAttribute( key, value );
		}
	}

	// Set content
	if ( args.hasOwnProperty( 'content' ) ) {
		const content = args.content;

		if ( undefined !== content ) {
			textarea.innerHTML = content;
		}
	}

	return textarea;
}

export default buildTextarea;
