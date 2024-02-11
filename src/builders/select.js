import buildElement from './element.js';

/**
 * Helper to create select field.
 *
 * @param {Object}      args   List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildSelect( args, parent ) {
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

	const select = buildElement( 'select', {
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

			select.setAttribute( key, value );
		}
	}

	const options = args.options || {};

	for ( const key in options ) {
		const option = buildElement( 'option', {
			text: options[ key ],
			attributes: {
				value: key,
			},
			append: select,
		} );

		if ( args.hasOwnProperty( 'selected' ) ) {
			const selected = args.selected;

			if ( selected && selected === option.value ) {
				option.setAttribute( 'selected', 'selected' );
			}
		}
	}

	return select;
}

export default buildSelect;
