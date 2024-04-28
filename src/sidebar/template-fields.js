import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { BaseControl, TextareaControl, Flex } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import ThumbnailField from './thumbnail-field';

const TemplateFields = ( { layers, updateFieldset, fields } ) => {
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
	 * Featured thumbnail.
	 */
	presets.featured = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	} );

	/**
	 * Local changed states.
	 */
	const [ changed, setChanged ] = useState( {} );
	const [ loaded, setLoaded ] = useState( false );

	/**
	 * Save changed state on field update.
	 *
	 * @param {string} name
	 * @param {string} value
	 */
	const changeField = ( name, value ) => {
		updateFieldset( name, value );

		// Mark this field as manually changed by user.
		setChanged( { ...changed, [ name ]: true } );
	};

	useEffect( () => {
		for ( const key in layers ) {
			const layer = layers[ key ];

			if ( fields[ key ] && fields[ key ] !== presets[ layer.preset ] ) {
				setChanged( { ...changed, [ key ]: true } );
			}
		}

		setLoaded( true );
	}, []); // eslint-disable-line

	/**
	 * Display dynamic text field
	 *
	 * @param {Object} layer
	 * @param {string} name
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayTextField = ( layer, name ) => {
		if ( ! changed[ name ] && layer.preset in presets ) {
			fields[ name ] = presets[ layer.preset ];
		}

		return (
			<TextareaControl
				name={ name }
				label={ layer.title }
				value={ fields[ name ] }
				onChange={ ( value ) => changeField( name, value ) }
			/>
		);
	};

	/**
	 * Display dynamic image field
	 *
	 * @param {Object} layer
	 * @param {string} name
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayImageField = ( layer, name ) => {
		const styles = { border: 'solid 1px #ccc', padding: '4px', borderRadius: '4px' };

		if ( ! changed[ name ] && layer.preset in presets ) {
			fields[ name ] = presets[ layer.preset ];
		}

		return (
			<BaseControl id={ null } label={ layer.title }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => {
							changeField( name, media.id );
						} }
						allowedTypes={ [ 'image' ] }
						value={ fields[ name ] }
						render={ ( { open } ) => (
							<Flex justify={ 'flex-start' } style={ styles }>
								<ThumbnailField
									fields={ fields }
									open={ open }
									changeField={ changeField }
									name={ name }
								/>
							</Flex>
						) }
					/>
				</MediaUploadCheck>
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

	if ( loaded ) {
		return composeControls();
	}
};

export default TemplateFields;
