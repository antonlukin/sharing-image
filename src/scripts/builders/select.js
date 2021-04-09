import buildElement from './element.js';

/**
 * Helper to create select field.
 *
 * @param {Object} args List of control options.
 * @param {HTMLElement} parent Parent HTML element to append this field.
 */
function buildSelect( args, parent ) {
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

	const select = buildElement( 'select', {
		append: field,
	} );

	// Set attributes
	if ( args.hasOwnProperty( 'attributes' ) ) {
		for ( const key in args.attributes ) {
			select.setAttribute( key, args.attributes[ key ] );
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
