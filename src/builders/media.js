import buildElement from './element';
import buildControl from './control';

import Helper from '../helpers';

/**
 * Display image by it ID in figure tag.
 *
 * @param {HTMLElement} media Media element.
 * @param {number}      value Image attachment value.
 */
function displayImage( media, value ) {
	let figure = media.querySelector( 'figure' );

	if ( figure ) {
		media.removeChild( figure );
	}

	if ( ! value && ! wp.media ) {
		return;
	}

	// figure = buildElement( 'figure' );

	// console.log( media.querySelector( 'h4' ) );

	// if ( media.querySelector( 'h4' ) ) {
	// 	media.insertBefore( figure, figure.nextSibling );
	// }

	const image = buildElement( 'img', { append: figure } );

	const frame = wp.media.attachment( value ).fetch();

	frame.then( ( data ) => {
		image.src = data.sizes?.thumbnail?.url || data.url;
	} );
}

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

	if ( args.hasOwnProperty( 'label' ) ) {
		const label = buildElement( 'h4', {
			text: args.label,
		} );

		if ( null !== args.label ) {
			media.appendChild( label );
		}
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

	if ( args.hasOwnProperty( 'help' ) ) {
		buildElement( 'small', {
			text: args.help,
			append: media,
		} );
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

		if ( args.image ) {
			displayImage( media, id );
		}

		details.classList.remove( 'hidden' );
	};

	// Helper function to remove attachment value.
	const removeAttachment = () => {
		attachment.setAttribute( 'value', '' );
		attachment.dispatchEvent( new Event( 'change', { bubbles: true } ) );

		// Set default button title.
		upload.textContent = args.labels.button;

		if ( args.image ) {
			displayImage( media, 0 );
		}

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

		const options = {
			title: args.labels.heading,
		};

		if ( args.hasOwnProperty( 'mime' ) ) {
			options.library = {};
			options.library.type = args.mime;
		}

		Helper.attachment( options, ( id ) => {
			setAttachment( id );
		} );
	} );

	return media;
}

export default buildMedia;
