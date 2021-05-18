import buildElement from './element.js';
import Build from './index.js';

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
		const label = buildElement( 'strong', {
			text: args.label,
		} );

		if ( null !== args.label ) {
			field.appendChild( label );
		}
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
			const value = args.attributes[ key ];

			if ( undefined === value ) {
				continue;
			}

			input.setAttribute( key, value );
		}
	}

	if ( 'range' === input.type ) {
		const counter = Build.element( 'em', {
			text: input.value,
			append: field,
		} );

		input.addEventListener( 'change', () => {
			counter.textContent = input.value;
		} );

		input.addEventListener( 'input', () => {
			counter.textContent = input.value;
		} );
	}

	return input;
}

export default buildInput;
