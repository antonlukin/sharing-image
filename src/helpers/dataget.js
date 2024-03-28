/**
 * Get element by data attribute.
 *
 * @param {HTMLElement} node  Parent node.
 * @param {string}      key   Data key param.
 * @param {string}      value Data value param.
 */
function getElement( node, key, value ) {
	const element = node.querySelector( `[data-${ key }="${ value }"]` );

	if ( element ) {
		return element.value;
	}
}

export default getElement;
