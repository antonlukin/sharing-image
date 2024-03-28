/**
 * Upload media frame.
 *
 * @param {Object}   options  wp.media options.
 * @param {Function} callback Callback function.
 */
function uploadMedia( options, callback ) {
	if ( ! options.hasOwnProperty( 'multiple' ) ) {
		options.multiple = false;
	}

	const frame = wp.media( options );

	frame.on( 'select', () => {
		const selection = frame.state().get( 'selection' ).first().toJSON();

		if ( selection.id ) {
			callback( selection.id );
		}
	} );

	frame.open();
}

export default uploadMedia;
