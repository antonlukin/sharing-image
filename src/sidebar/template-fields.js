import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { BaseControl, TextareaControl, Flex } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import ThumbnailField from './thumbnail-field';

const TemplateFields = ( { layers, fieldset, setFieldset } ) => {
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
	 * Get preset Featured thumbnail.
	 */
	presets.featured = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	} );

	/**
	 * Get preset categories.
	 */
	presets.categories = useSelect( ( select ) => {
		const list = [];

		// Get checked categories ids.
		const categories = select( 'core/editor' ).getEditedPostAttribute( 'categories' );

		categories.forEach( ( id ) => {
			const category = select( 'core' ).getEntityRecord( 'taxonomy', 'category', id );

			if ( category ) {
				list.push( category.name );
			}
		} );

		return list.join( ', ' );
	} );

	/**
	 * Get preset tags.
	 */
	presets.tags = useSelect( ( select ) => {
		const list = [];

		// Get checked categories ids.
		const tags = select( 'core/editor' ).getEditedPostAttribute( 'tags' );

		tags.forEach( ( id ) => {
			const tag = select( 'core' ).getEntityRecord( 'taxonomy', 'post_tag', id );

			if ( tag ) {
				list.push( tag.name );
			}
		} );

		return list.join( ', ' );
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
	const changeFieldset = ( name, value ) => {
		setFieldset( { ...fieldset, [ name ]: value } );

		// Mark this field as manually changed by user.
		setChanged( { ...changed, [ name ]: true } );
	};

	/**
	 * Prepare changed object on first load.
	 */
	useEffect( () => {
		const updated = { ...changed };

		for ( const key in layers ) {
			const layer = layers[ key ];

			if ( fieldset[ key ] && fieldset[ key ] !== presets[ layer.preset ] ) {
				updated[ key ] = true;
			}
		}

		setChanged( updated );

		// Show template fields.
		setLoaded( true );
	}, []); // eslint-disable-line

	/**
	 * Display dynamic text field.
	 *
	 * @param {Object} layer
	 * @param {string} name
	 *
	 * @return {JSX.Element} Textarea control component.
	 */
	const displayTextField = ( layer, name ) => {
		let field = fieldset[ name ];

		// if ( ! changed[ name ] && layer.preset in presets ) {
		// 	field = presets[ layer.preset ];
		// }

		console.log( 'rerender' );

		return (
			<TextareaControl
				name={ name }
				label={ layer.title }
				value={ field }
				onChange={ ( value ) => changeFieldset( name, value ) }
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
		if ( ! changed[ name ] && layer.preset in presets ) {
			fieldset[ name ] = presets[ layer.preset ];
		}

		const styles = { border: 'solid 1px #ccc', padding: '4px', borderRadius: '4px' };

		return (
			<BaseControl id={ null } label={ layer.title }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) => {
							changeFieldset( name, media.id );
						} }
						allowedTypes={ [ 'image' ] }
						value={ fieldset[ name ] }
						render={ ( { open } ) => (
							<Flex justify={ 'flex-start' } style={ styles }>
								<ThumbnailField
									fieldset={ fieldset }
									open={ open }
									changeFieldset={ changeFieldset }
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
