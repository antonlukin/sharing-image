import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

const PresetTaxonomy = ( { name, layer, fieldset, updateFieldset, attribute, entity } ) => {
	const [ changed, setChanged ] = useState( false );

	/**
	 * Subscribe on taxonomy updates.
	 */
	const preset = useSelect( ( select ) => {
		const list = [];

		// Get checked categories ids.
		let checked = select( 'core/editor' ).getEditedPostAttribute( attribute );

		if ( ! checked ) {
			checked = [];
		}

		checked.forEach( ( id ) => {
			const taxonomy = select( 'core' ).getEntityRecord( 'taxonomy', entity, id );

			if ( taxonomy ) {
				list.push( taxonomy.name );
			}
		} );

		return list.join( layer.separator || ', ' );
	} );

	/**
	 * Update fieldset and set current component status as changed.
	 *
	 * @param {string} value
	 */
	const changeFieldset = ( value ) => {
		updateFieldset( name, value );

		// Mark this field as manually changed by user.
		setChanged( true );
	};

	/**
	 * Update fieldset on presets change.
	 */
	useEffect( () => {
		if ( ! changed ) {
			updateFieldset( name, preset );
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
