import { __ } from '@wordpress/i18n';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { TextareaControl, SelectControl, Button, Flex } from '@wordpress/components';

import TemplateFields from './template-fields';

const SharingImageSidebar = ( { meta, templates } ) => {
	/**
	 * Retrieve post meta.
	 */
	const postMeta = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	} );

	/**
	 * Retrieve post id.
	 */
	const postId = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostId();
	} );

	const featuredId = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
	} );

	/**
	 * Dispatchers.
	 */
	const { editPost } = useDispatch( 'core/editor', [ postMeta ] );

	/**
	 * Local states.
	 */
	const [ template, setTemplate ] = useState( postMeta[ meta.source ].template || 0 );

	/**
	 * Change Template.
	 *
	 * @param {number} id Template ID.
	 */
	const changeTemplate = ( id ) => {
		editPost( {
			meta: { [ meta.source ]: { ...postMeta[ meta.source ], template: parseInt( id ) } },
		} );

		setTemplate( parseInt( id ) );
	};

	const updateFieldset = ( key, value ) => {
		editPost( {
			meta: { [ meta.fieldset ]: { ...postMeta[ meta.fieldset ], [ key ]: value } },
		} );
	};

	return (
		<PluginDocumentSettingPanel name="sharing-image-setting" title={ __( 'Sharing Image', 'sharimg-image' ) }>
			<SelectControl
				value={ template }
				options={ templates.map( ( item, index ) => ( {
					label: item.title,
					value: index,
				} ) ) }
				onChange={ changeTemplate }
			/>

			<TemplateFields
				layers={ templates[ template ].layers || [] }
				template={ template }
				updateFieldset={ updateFieldset }
				fields={ postMeta[ meta.fieldset ] }
			/>

			<Flex justify={ 'flex-start' }>
				<Button variant="secondary" isDestructive={ false }>
					{ __( 'Generate', 'sharing-image' ) }
				</Button>

				<Button variant="ternary" isDestructive={ true }>
					{ __( 'Remove', 'sharing-image' ) }
				</Button>
			</Flex>
		</PluginDocumentSettingPanel>
	);
};

const checkMeta = ( params ) => {
	if ( ! params.meta?.source || ! params.meta?.fieldset ) {
		return false;
	}

	return true;
};

registerPlugin( 'sharing-image-sidebar', {
	render: () => {
		const params = window.sharingImageSidebar || {};

		if ( checkMeta( params ) ) {
			return <SharingImageSidebar meta={ params.meta } templates={ params.templates } />;
		}
	},
} );
