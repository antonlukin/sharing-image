import buildElement from './element';
import buildControl from './control';

import Helper from '../helpers';

/**
 * Helper to create media block.
 *
 * @param {Object} args List of media options.
 */
function buildMedia( args ) {
	const media = buildControl( {
		classes: args.classes || [],
	} );

	if ( args.hasOwnProperty( 'append' ) ) {
		args.append.appendChild( media );
	}

	if ( args.hasOwnProperty( 'prepend' ) ) {
		args.prepend.insertBefore( media, args.prepend.firstChild );
	}

	// Labels are required.
	args.labels = args.labels || {};

	const attachment = buildElement( 'input', {
		attributes: {
			type: 'hidden',
			name: args.name,
		},
		append: media,
	} );

	const upload = buildElement( 'button', {
		classes: [ 'button' ],
		text: args.labels.button,
		attributes: {
			type: 'button',
		},
		append: media,
	} );

	const details = buildElement( 'a', {
		classes: [ 'hidden' ],
		text: args.labels.details,
		attributes: {
			target: '_blank',
		},
		append: media,
	} );

	// Helper function to update attachment value.
	const setAttachment = ( id ) => {
		attachment.setAttribute( 'value', id );
		attachment.dispatchEvent( new Event( 'change', { bubbles: true } ) );

		const link = new URL( args.link );
		link.searchParams.set( 'item', id );

		details.setAttribute( 'href', link );
		details.classList.remove( 'hidden' );
	};

	// Update fields if this layer has attachment.
	if ( args.value ) {
		setAttachment( args.value );
	}

	upload.addEventListener( 'click', () => {
		Helper.attachment( args.labels.heading, ( id ) => {
			setAttachment( id );
		} );
	} );

	return media;
}

export default buildMedia;
