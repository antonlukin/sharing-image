import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { Button, TextareaControl } from '@wordpress/components';
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

	// get meta data
	const { imageId, image } = useSelect( ( select ) => {
		const id = 0;

		return {
			imageId: id,
			image: select( 'core' ).getMedia( id ),
		};
	} );

	/**
	 * Display dynamic image field
	 *
	 * @param {Object} layer
	 * @param {string} key
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayImageField = ( layer, key ) => {
		console.log( fields );
		return (
			<MediaUploadCheck>
				<MediaUpload
					onSelect={ ( media ) => {
						updateFieldset( key, media.id );
					} }
					allowedTypes={ [ 'image' ] }
					value={ fields[ key ] }
					render={ ( { open } ) => (
						<>
							{ ! fields[ key ] && (
								<Button variant="secondary" onClick={ open }>
									Upload image
								</Button>
							) }
							{ fields[ key ] && (
								<Button isDestructive onClick={ () => updateFieldset( key, 0 ) }>
									Remove image
								</Button>
							) }
						</>
					) }
				/>
			</MediaUploadCheck>
		);
	};

	const controls = [];

	for ( const key in layers ) {
		const layer = layers[ key ];

		// if ( ! layer.dynamic ) {
		// 	continue;
		// }

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
