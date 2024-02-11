/**
 * Append empty default properties to object if not exist.
 *
 * @param {Object} object   Source object.
 * @param {Array}  defaults Required defaults properties.
 */
function intersectDefaults( object, defaults ) {
	defaults.forEach( ( item ) => {
		if ( undefined === object[ item ] ) {
			object[ item ] = {};
		}
	} );

	return object;
}

export default intersectDefaults;
