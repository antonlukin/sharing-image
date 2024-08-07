import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { Icon, image as imageIcon } from '@wordpress/icons';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import styles from '../styles.module.scss';

const ThumbnailField = ( { name, layer, mode, fieldset, updateFieldset } ) => {
	/**
	 * Subscribe on featured media updates.
	 */
	const preset = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	} );

	const thumbnail = useSelect(
		( select ) => {
			if ( ! fieldset?.[ name ] ) {
				return null;
			}

			const media = select( 'core' ).getMedia( fieldset?.[ name ] );

			// Try to get thumbnail first.
			let url = media?.media_details?.sizes?.thumbnail?.source_url;

			if ( ! url ) {
				url = media?.source_url;
			}

			return url;
		},
		[ fieldset ]
	);

	/**
	 * Update fieldset and set current component status as changed.
	 *
	 * @param {string} value
	 */
	const changeFieldset = ( value ) => {
		updateFieldset( name, value );
	};

	/**
	 * Update fieldset on presets change.
	 */
	useEffect( () => {
		if ( mode === 'manual' ) {
			return;
		}

		if ( layer.preset === 'featured' ) {
			updateFieldset( name, preset );
		}
	}, [ preset, name ] ); // eslint-disable-line

	/**
	 * Function to remove layer image.
	 */
	const removeImage = () => {
		updateFieldset( name, 0 );
	};

	const displayThumbnailIcon = ( open ) => {
		return (
			<>
				<Icon icon={ imageIcon } className={ styles.thumbnailIcon } />

				<Button variant="link" onClick={ open }>
					{ __( 'Set layer image', 'sharing-image' ) }
				</Button>
			</>
		);
	};

	const displayThumbnailImage = () => {
		return (
			<>
				{ thumbnail && <img src={ thumbnail } alt={ '' } className={ styles.thumbnailImage } /> }

				<Button variant="link" onClick={ removeImage }>
					{ __( 'Remove image', 'sharing-image' ) }
				</Button>
			</>
		);
	};

	/**
	 * Display thumbnail ot icon according to fieldset data.
	 *
	 * @param {Function} open
	 */
	const displayThumbnail = ( { open } ) => {
		if ( fieldset?.[ name ] ) {
			return displayThumbnailImage();
		}

		return displayThumbnailIcon( open );
	};

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ ( media ) => {
					changeFieldset( media.id );
				} }
				allowedTypes={ [ 'image' ] }
				value={ fieldset?.[ name ] }
				render={ displayThumbnail }
			/>
		</MediaUploadCheck>
	);
};

export default ThumbnailField;
