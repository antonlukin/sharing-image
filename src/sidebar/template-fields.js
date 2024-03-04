import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

const TemplateFields = ( { layers, template, updateFieldset, fields } ) => {
	const presets = {};

	/**
	 * Retrieve post title.
	 */
	presets.title = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'title' );
	} );

	/**
	 * Retrieve post excerpt.
	 */
	presets.excerpt = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'excerpt' );
	} );

	/**
	 * Local states.
	 */
	const [ init, setInit ] = useState( false );

	/**
	 * Display dynamic text field
	 *
	 * @param {Object} layer
	 * @param {string} key
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayTextField = ( layer, key ) => {
		// if ( ! init && ! fields[ key ] ) {
		// 	fields[ key ] = presets[ layer.preset ] || '';
		// 	setInit( true );
		// }

		return (
			<TextareaControl
				key={ key }
				label={ layer.title }
				value={ fields[ key ] || presets[ layer.preset ] }
				onChange={ ( value ) => updateFieldset( key, value ) }
			/>
		);
	};

	for ( const key in layers ) {
		const layer = layers[ key ];

		if ( 'text' === layer.type && layer.dynamic ) {
			return displayTextField( layer, key );
		}
	}
};

export default TemplateFields;
