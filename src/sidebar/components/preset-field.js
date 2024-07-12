import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';

const PresetField = ( { name, layer, fieldset, updateFieldset, attribute } ) => {
	const [ changed, setChanged ] = useState( false );

	/**
	 * Subscribe on field updates.
	 */
	const preset = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( attribute );
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
			value={ fieldset?.[ name ] || '' }
			onChange={ ( value ) => changeFieldset( value ) }
		/>
	);
};

export default PresetField;
