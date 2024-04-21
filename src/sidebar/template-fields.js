import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { Button, BaseControl, TextareaControl, Flex } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Icon, image } from '@wordpress/icons';

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
	 *
	 */
	presets.featured = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	} );

	/**
	 * Local changed states.
	 */
	const [ changed, setChanged ] = useState( {} );

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

	// // Get image thumbnails by ID.
	// const thumbnails = useSelect(
	// 	( select ) => {
	// 		const images = {};

	// 		for ( const name in fields ) {
	// 			const layer = layers[ name ];

	// 			// Skip not dynamic image layers.
	// 			if ( ! layer?.dynamic || layer?.type !== 'image' ) {
	// 				continue;
	// 			}

	// 			const media = select( 'core' ).getMedia( fields[ name ] );
	// 			console.log( media );

	// 			images[ name ] = media?.media_details?.sizes?.thumbnail?.source_url;

	// 			if ( ! images[ name ] ) {
	// 				images[ name ] = media?.source_url;
	// 			}
	// 		}

	// 		return images;
	// 	},
	// 	[ fields ]
	// );

	/**
	 * Helper method for image field rendering.
	 *
	 * @param {string}   name Fieldset name.
	 * @param {Function} open MediaUpload open function.
	 */
	const renderImageButton = ( name, open ) => {
		const styles = { borderRadius: '2px', objectFit: 'cover', width: '36px', height: '36px' };

		// if ( fields[ name ] ) {
		return <ThumbnailField fields={ fields } open={ open } changeField={ changeField } name={ name } />;
		// }

		styles.opacity = '0.5';

		return (
			<>
				<Icon icon={ image } style={ styles } />

				<Button variant="link" onClick={ open }>
					{ __( 'Set layer image', 'sharing-image' ) }
				</Button>
			</>
		);
	};

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

	const controls = [];

	for ( const name in layers ) {
		const layer = layers[ name ];

		if ( ! layer.dynamic ) {
			continue;
		}

		switch ( layer.type ) {
			case 'text':
				controls.push( displayTextField( layer, name ) );
				break;

			case 'image':
				controls.push( displayImageField( layer, name ) );
				break;
		}
	}

	return controls;
};

export default TemplateFields;
