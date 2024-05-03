import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

const PresetTaxonomy = ( { name, layer, fieldset, setFieldset, attribute, entity } ) => {
	const [ changed, setChanged ] = useState( false );

	const preset = useSelect( ( select ) => {
		const list = [];

		// Get checked categories ids.
		const checked = select( 'core/editor' ).getEditedPostAttribute( attribute );

		checked.forEach( ( id ) => {
			const category = select( 'core' ).getEntityRecord( 'taxonomy', entity, id );

			if ( category ) {
				list.push( category.name );
			}
		} );

		return list.join( ', ' );
	} );

	/**
	 * Update fieldset and set current component status as changed.
	 *
	 * @param {string} value
	 */
	const changeFieldset = ( value ) => {
		setFieldset( { ...fieldset, [ name ]: value } );

		// Mark this field as manually changed by user.
		setChanged( true );
	};

	/**
	 * Update fieldset on presets change.
	 */
	useEffect( () => {
		if ( ! changed ) {
			setFieldset( { ...fieldset, [ name ]: preset } );
		}
	}, [ preset ] ); // eslint-disable-line

	return (
		<TextareaControl
			name={ name }
			label={ layer.title }
			value={ fieldset[ name ] }
			onChange={ ( value ) => changeFieldset( value ) }
		/>
	);
};

export default PresetTaxonomy;
