/**
 * Settings script handler.
 */

( function () {
	if ( 'undefined' === typeof wp ) {
		return;
	}

	const { __ } = wp.i18n;

	// Find root settings element.
	const screen = document.getElementById( 'sharing-image-settings' );

	if ( null === screen ) {
		return;
	}

	/**
	 * Parse JSON if valid, otherwise return def value.
	 *
	 * @param {string} input JSON input string to parse
	 * @param {Object|Array|null} fail Default value on fail.
	 */
	function parseJSON( input, fail = null ) {
		try {
			return JSON.parse( input );
		} catch ( e ) {
			return fail;
		}
	}

	/**
	 * Get current location search parameter.
	 *
	 * @param {string} key URL parameter key.
	 */
	function getSearchParam( key ) {
		const params = new URL( document.location.href );

		return params.searchParams.get( key );
	}

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
				element.setAttribute( key, args.attributes[ key ] );
			}
		}

		// Append child
		if ( args.hasOwnProperty( 'parent' ) ) {
			args.parent.appendChild( element );
		}

		return element;
	}

	/**
	 * Create poster card in catalog.
	 *
	 * @param {HTMLElement} catalog Catalog HTML element.
	 * @param {number} index Current card index.
	 * @param {Object} option List of poster options.
	 */
	function createPosterCard( catalog, index, option ) {
		const card = buildElement( 'div', {
			classes: [ 'sharing-image-card' ],
			parent: catalog,
		} );

		const cover = buildElement( 'figure', {
			classes: [ 'sharing-image-cover' ],
			parent: card,
		} );

		cover.classList.add( 'blank' );

		const footer = buildElement( 'footer', {
			classes: [ 'sharing-image-footer' ],
			parent: card,
		} );

		buildElement( 'h2', {
			text: option.title || __( 'Untitled', 'sharing-image' ),
			parent: footer,
		} );

		const link = new URL( document.location.href );
		link.searchParams.set( 'poster', index );

		buildElement( 'a', {
			classes: [ 'button' ],
			text: __( 'Edit poster', 'sharing-image' ),
			attributes: {
				href: link,
			},
			parent: footer,
		} );
	}

	/**
	 * Create append new poster button in catalog.
	 *
	 * @param {HTMLElement} catalog Catalog HTML element.
	 * @param {number} index New card index.
	 */
	function createPosterNew( catalog, index ) {
		const link = new URL( document.location.href );
		link.searchParams.set( 'poster', index );

		const button = buildElement( 'a', {
			classes: [ 'sharing-image-new' ],
			attributes: {
				href: link,
			},
			parent: catalog,
		} );

		buildElement( 'h2', {
			text: __( 'Add new template', 'sharing-image' ),
			parent: button,
		} );
	}

	/**
	 * Create posters catalog from options.
	 *
	 * @param {HTMLElement} wrapper Settings wrapper element.
	 * @param {string} options Posters options from storage field.
	 */
	function createPostersCatalog( wrapper, options ) {
		const catalog = buildElement( 'div', {
			classes: [ 'sharing-image-catalog' ],
			parent: wrapper,
		} );

		let index = 1;

		options.forEach( ( option ) => {
			createPosterCard( catalog, index++, option );
		} );

		createPosterNew( catalog, index );
	}

	/**
	 * Init config settings tab.
	 */
	function initConfigTab() {}

	/**
	 * Init premium settings tab.
	 */
	function initPremiumTab() {}

	/**
	 * Init config settings tab.
	 */
	function initPostersTab() {
		const posters = screen.querySelector( '.sharing-image-posters' );

		if ( null === posters ) {
			return;
		}

		const storage = posters.querySelector( 'textarea' );

		if ( null === storage ) {
			return;
		}

		const index = getSearchParam( 'poster' );

		// Try to parse storage value.
		const options = parseJSON( storage.value, [] );

		if ( options[ index - 1 ] ) {
			return console.log( 'show page with id', index );
		}

		return createPostersCatalog( posters.parentElement, options );
	}

	/**
	 * Route settings by url parameter.
	 */
	const routeSettings = () => {
		const tab = getSearchParam( 'tab' );

		if ( 'config' === tab ) {
			return initConfigTab();
		}

		if ( 'premium' === tab ) {
			return initPremiumTab();
		}

		return initPostersTab();
	};

	routeSettings();
} )();
