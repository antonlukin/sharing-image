/**
 * Get current location search parameter.
 *
 * @param {string} key URL parameter key.
 */
function getSearchParam( key ) {
	const params = new URL( document.location.href );

	return params.searchParams.get( key );
}

export default getSearchParam;
