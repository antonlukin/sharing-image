import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { Button, BaseControl, TextareaControl, Flex } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

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
	 * Local states.
	 */
	const [ changed, setChanged ] = useState( {} );

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
				const media = select( 'core' ).getMedia( fields[ key ] );

				images[ key ] = media?.media_details?.sizes?.thumbnail?.source_url || '';
			}

			return images;
		},
		[ fields ]
	);

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
		return (
			<BaseControl id={ null } label={ layer.title }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => {
							updateFieldset( key, media.id );
						} }
						allowedTypes={ [ 'image' ] }
						value={ fields[ key ] }
						render={ ( { open } ) => (
							<Flex justify={ 'flex-start' }>
								{ ! Boolean( fields[ key ] ) && (
									<Button variant="secondary" onClick={ open }>
										{ __( 'Upload layer image', 'sharing-image' ) }
									</Button>
								) }
								{ Boolean( fields[ key ] ) && (
									<>
										<img
											src={ thumbnails[ key ] }
											width={ '36' }
											height={ '36' }
											alt={ '' }
											style={ { borderRadius: '2px' } }
										/>
										<Button variant="secondary" onClick={ () => updateFieldset( key, 0 ) }>
											{ __( 'Remove layer image', 'sharing-image' ) }
										</Button>
									</>
								) }
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
