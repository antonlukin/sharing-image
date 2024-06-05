import buildElement from './element.js';
import Build from './index.js';

/**
 * Helper to create input field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildInput( args, parent ) {
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

	const input = buildElement( 'input', {
		attributes: {
			type: 'text',
		},
		dataset: args.dataset || {},
		append: field,
	} );

	// Set attributes.
	if ( args.hasOwnProperty( 'attributes' ) ) {
		for ( const key in args.attributes ) {
			const value = args.attributes[ key ];

			if ( undefined === value ) {
				continue;
			}

			input.setAttribute( key, value );
		}
	}

	if ( input.type === 'range' ) {
		const counter = Build.element( 'em', {
			text: input.value,
			attributes: {
				title: wp.i18n.__( 'Click to change the input view.', 'sharing-image' ),
			},
			append: field,
		} );

		input.addEventListener( 'change', () => {
			counter.textContent = input.value;
		} );

		input.addEventListener( 'input', () => {
			counter.textContent = input.value;
		} );

		counter.addEventListener( 'click', () => {
			input.type = input.type === 'text' ? 'range' : 'text';
		} );
	}

	return input;
}

export default buildInput;
