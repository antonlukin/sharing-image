/**
 * Upload media frame.
 *
 * @param {string} header Frame header text.
 * @param {Function} callback Callback function.
 */
function uploadMedia( header, callback ) {
	const frame = wp.media( {
		title: header,
		multiple: false,
	} );

	frame.on( 'select', () => {
		const selection = frame.state().get( 'selection' ).first().toJSON();

		if ( selection.id ) {
			callback( selection.id );
		}
	} );

	frame.open();
}

export default uploadMedia;
