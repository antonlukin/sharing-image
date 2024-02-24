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
	 * @param {number} n
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayTextField = ( layer, n ) => {
		const key = 'layer-' + template + '-' + n;

		if ( ! init && ! fields[ key ] ) {
			fields[ key ] = presets[ layer.preset ] || '';
			setInit( true );
		}

		return (
			<TextareaControl
				key={ key }
				label={ layer.title }
				value={ fields[ key ] || presets[ layer.preset ] }
				onChange={ ( value ) => updateFieldset( key, value ) }
			/>
		);
	};

	return layers.map( ( layer, n ) => {
		if ( 'text' === layer.type && layer.dynamic ) {
			return displayTextField( layer, n );
		}

		return null;
	} );
};

export default TemplateFields;
