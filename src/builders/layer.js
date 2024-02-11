import buildElement from './element';

/**
 * Helper to create layer.
 *
 * @param {Object} args List of layer options.
 */
function buildLayer( args ) {
	const layer = buildElement( 'div', {
		classes: args.classes || [],
	} );

	if ( args.hasOwnProperty( 'append' ) ) {
		args.append.appendChild( layer );
	}

	if ( args.hasOwnProperty( 'prepend' ) ) {
		args.prepend.insertBefore( layer, args.prepend.firstChild );
	}

	if ( ! args.hasOwnProperty( 'label' ) ) {
		args.label = '';
	}

	const title = buildElement( 'h2', {
		text: args.label,
		append: layer,
	} );

	buildElement( 'span', {
		append: title,
	} );

	if ( args.hasOwnProperty( 'description' ) ) {
		buildElement( 'h5', {
			text: args.description,
			append: layer,
		} );
	}

	return layer;
}

export default buildLayer;
