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
	} );

	if ( args.hasOwnProperty( 'link' ) ) {
		media.appendChild( details );
	}

	// Helper function to update attachment value.
	const setAttachment = ( id ) => {
		attachment.setAttribute( 'value', id );
		attachment.dispatchEvent( new Event( 'change', { bubbles: true } ) );

		let link = null;

		if ( args.hasOwnProperty( 'link' ) ) {
			link = new URL( args.link );
			link.searchParams.set( 'item', id );

			details.setAttribute( 'href', link.href );
		}

		if ( args.remove ) {
			upload.textContent = args.labels.remove;
		}

		details.classList.remove( 'hidden' );
	};

	// Helper function to remove attachment value.
	const removeAttachment = () => {
		attachment.setAttribute( 'value', '' );
		attachment.dispatchEvent( new Event( 'change', { bubbles: true } ) );

		// Set default button title.
		upload.textContent = args.labels.button;

		details.classList.add( 'hidden' );
	};

	// Update fields if this layer has attachment.
	if ( args.value ) {
		setAttachment( args.value );
	}

	upload.addEventListener( 'click', () => {
		if ( args.remove && attachment.value ) {
			return removeAttachment();
		}

		Helper.attachment( args.labels.heading, ( id ) => {
			setAttachment( id );
		} );
	} );

	return media;
}

export default buildMedia;
