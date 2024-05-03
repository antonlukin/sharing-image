import { BaseControl, TextareaControl, Flex } from '@wordpress/components';

import PresetField from './preset-field';
import PresetTaxonomy from './preset-taxonomy';
import ThumbnailField from './thumbnail-field';

const TemplateFields = ( { layers, fieldset, setFieldset } ) => {
	/**
	 * Display dynamic text field.
	 *
	 * @param {Object} layer
	 * @param {string} name
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayTextField = ( layer, name ) => {
		const props = { name, layer, fieldset, setFieldset };

		switch ( layer.preset ) {
			case 'title':
				return <PresetField { ...props } attribute={ 'title' } />;

			case 'excerpt':
				return <PresetField { ...props } attribute={ 'excerpt' } />;

			case 'categories':
				return <PresetTaxonomy { ...props } attribute={ 'categories' } entity={ 'category' } />;

			case 'tags':
				return <PresetTaxonomy { ...props } attribute={ 'post_tags' } entity={ 'tag' } />;
		}

		return (
			<TextareaControl
				name={ name }
				label={ layer.title }
				defaultValue={ fieldset[ name ] }
				onChange={ ( value ) => setFieldset( { ...fieldset, [ name ]: value } ) }
			/>
		);
	};

	/**
	 * Display dynamic image field.
	 *
	 * @param {Object} layer
	 * @param {string} name
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayImageField = ( layer, name ) => {
		const props = { name, layer, fieldset, setFieldset };

		// Thumbnail field custom styles.
		const styles = { border: 'solid 1px #ccc', padding: '4px', borderRadius: '4px' };

		return (
			<BaseControl id={ null } label={ layer.title }>
				<Flex justify={ 'flex-start' } style={ styles }>
					<ThumbnailField { ...props } />
				</Flex>
			</BaseControl>
		);
	};

	const composeControls = () => {
		const controls = [];

		for ( const key in layers ) {
			const layer = layers[ key ];

			if ( ! layer.dynamic ) {
				continue;
			}

			switch ( layer.type ) {
				case 'text':
					controls.push( displayTextField( layer, key ) );
					break;

				case 'image':
					controls.push( displayImageField( layer, key ) );
					break;
			}
		}

		return controls;
	};

	return composeControls();
};

export default TemplateFields;
