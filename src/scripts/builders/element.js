/**
 * Helper to create new DOM element.
 *
 * @param {string} tag Element tagname.
 * @param {Object} args List of element options.
 */
function buildElement( tag, args ) {
	const element = document.createElement( tag );

	// Set class list
	if ( args.hasOwnProperty( 'classes' ) ) {
		args.classes.forEach( ( cl ) => {
			element.classList.add( cl );
		} );
	}

	// Set textContent
	if ( args.hasOwnProperty( 'text' ) ) {
		element.textContent = args.text;
	}

	// Set innerHTML
	if ( args.hasOwnProperty( 'html' ) ) {
		element.innerHTML = args.html;
	}

	// Set attributes
	if ( args.hasOwnProperty( 'attributes' ) ) {
		for ( const key in args.attributes ) {
			const value = args.attributes[ key ];

			if ( undefined === value ) {
				continue;
			}

			element.setAttribute( key, value );
		}
	}

	// Set data attributes
	if ( args.hasOwnProperty( 'dataset' ) ) {
		for ( const key in args.dataset ) {
			element.setAttribute( 'data-' + key, args.dataset[ key ] );
		}
	}

	// Append child
	if ( args.hasOwnProperty( 'append' ) ) {
		args.append.appendChild( element );
	}

	// Prepend child
	if ( args.hasOwnProperty( 'prepend' ) ) {
		args.prepend.insertBefore( element, args.prepend.firstChild );
	}

	return element;
}

export default buildElement;
