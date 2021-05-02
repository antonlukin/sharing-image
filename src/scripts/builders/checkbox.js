import buildElement from './element.js';

/**
 * Helper to create radio field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildCheckbox( args, parent ) {
	const field = buildElement( 'label', {
		classes: args.classes || [],
		append: parent,
	} );

	const checkbox = buildElement( 'input', {
		attributes: {
			type: 'checkbox',
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

			checkbox.setAttribute( key, value );
		}
	}

	if ( args.hasOwnProperty( 'checked' ) ) {
		const checked = args.checked;

		if ( checked && checked === checkbox.value ) {
			checkbox.setAttribute( 'checked', 'checked' );
		}
	}

	if ( args.hasOwnProperty( 'label' ) ) {
		const label = buildElement( 'span', {
			text: args.label,
		} );

		if ( null !== args.label ) {
			field.appendChild( label );
		}
	}

	return checkbox;
}

export default buildCheckbox;
