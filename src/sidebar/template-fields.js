import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { Button, BaseControl, TextareaControl, Flex } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Icon, image } from '@wordpress/icons';

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
	presets.thumbnail = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	} );

	/**
	 * Local changed states.
	 */
	const [ changed, setChanged ] = useState( {} );

	/**
	 * Save changed state on field update.
	 *
	 * @param {string} key
	 * @param {string} value
	 */
	const changeField = ( key, value ) => {
		updateFieldset( key, value );

		// Mark this field as manually changed by user.
		setChanged( { ...changed, [ key ]: true } );
	};

	// Get image thumbnails by ID.
	const thumbnails = useSelect(
		( select ) => {
			const images = {};

			for ( const key in fields ) {
				const layer = layers[ key ];

				// Skip not dynamic image layers.
				if ( ! layer?.dynamic || layer?.type !== 'image' ) {
					continue;
				}

				const media = select( 'core' ).getMedia( fields[ key ] );

				images[ key ] = media?.media_details?.sizes?.thumbnail?.source_url;

				if ( ! images[ key ] ) {
					images[ key ] = media?.source_url;
				}
			}

			return images;
		},
		[ fields ]
	);

	/**
	 * Helper method for image field rendering.
	 *
	 * @param {string}   key  Fieldset key.
	 * @param {Function} open MediaUpload open function.
	 */
	const renderImageButton = ( key, open ) => {
		const styles = { borderRadius: '2px', objectFit: 'cover', width: '36px', height: '36px' };

		if ( fields[ key ] ) {
			return (
				<>
					{ thumbnails[ key ] && <img src={ thumbnails[ key ] } alt={ '' } style={ styles } /> }

					<Button variant="link" onClick={ () => changeField( key, 0 ) }>
						{ __( 'Remove image', 'sharing-image' ) }
					</Button>
				</>
			);
		}

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
	 * @param {string} key
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayTextField = ( layer, key ) => {
		if ( ! changed[ key ] && layer.preset in presets ) {
			fields[ key ] = presets[ layer.preset ];
		}

		return (
			<TextareaControl
				key={ key }
				label={ layer.title }
				value={ fields[ key ] }
				onChange={ ( value ) => changeField( key, value ) }
			/>
		);
	};

	/**
	 * Display dynamic image field
	 *
	 * @param {Object} layer
	 * @param {string} key
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayImageField = ( layer, key ) => {
		const styles = { border: 'solid 1px #ccc', padding: '4px', borderRadius: '4px' };

		if ( ! changed[ key ] ) {
			// TODO:
			// changeField( key, presets.thumbnail );
			fields[ key ] = presets.thumbnail;
		}

		return (
			<BaseControl id={ null } label={ layer.title }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => {
							changeField( key, media.id );
						} }
						allowedTypes={ [ 'image' ] }
						value={ fields[ key ] }
						render={ ( { open } ) => (
							<Flex justify={ 'flex-start' } style={ styles }>
								{ renderImageButton( key, open ) }
							</Flex>
						) }
					/>
				</MediaUploadCheck>
			</BaseControl>
		);
	};

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

export default TemplateFields;
