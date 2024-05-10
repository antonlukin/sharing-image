import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { SelectControl, Button, Flex, Spinner } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';

import TemplateFields from './components/template-fields';

const SharingImageSidebar = ( { meta, templates } ) => {
	const { createErrorNotice, removeNotice } = useDispatch( noticesStore );

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

	/**
	 * Dispatchers.
	 */
	const { editPost } = useDispatch( 'core/editor', [ postMeta ] );

	/**
	 * Local states.
	 */
	const [ template, setTemplate ] = useState( postMeta[ meta.source ]?.template );
	const [ fieldset, setFieldset ] = useState( postMeta[ meta.fieldset ] );
	const [ loading, setLoading ] = useState( false );

	/**
	 * Change Template.
	 *
	 * @param {string} index Template ID.
	 */
	const changeTemplate = ( index ) => {
		editPost( {
			meta: { [ meta.source ]: { ...postMeta[ meta.source ], template: index } },
		} );

		setTemplate( index );
	};

	/**
	 * Send REST API request to generate new poster.
	 */
	const generatePoster = async () => {
		if ( loading ) {
			return;
		}

		removeNotice( 'sharing-image-generate' );

		const options = {
			path: 'sharing-image/v1/poster/' + postId,
			method: 'POST',
			data: {
				fieldset: fieldset,
				template: template,
			},
		};

		setLoading( true );

		try {
			const result = await apiFetch( options );

			if ( ! result.data ) {
				throw new Error();
			}

			editPost( {
				meta: { [ meta.source ]: { ...result.data, template: template } },
			} );
		} catch ( error ) {
			createErrorNotice( __( 'An unexpected error occurred', 'sharing-image' ), {
				id: 'sharing-image-generate',
				type: 'snackbar',
			} );
		}

		setLoading( false );
	};

	/**
	 * Remove poster handler button.
	 */
	const removePoster = () => {
		editPost( {
			meta: { [ meta.source ]: {} },
		} );
	};

	/**
	 * Update post meta on fieldset changes.
	 */
	useEffect( () => {
		editPost( {
			meta: { [ meta.fieldset ]: fieldset },
		} );
	}, [ fieldset ] ); // eslint-disable-line

	/**
	 * Set template.
	 */
	useEffect( () => {
		const [ index ] = Object.keys( templates );

		if ( ! templates[ template ] && index ) {
			setTemplate( index );
		}
	}, [ templates, template ] );

	return (
		<PluginDocumentSettingPanel name="sharing-image-setting" title={ __( 'Sharing Image', 'sharing-image' ) }>
			<Flex direction={ 'column' } gap={ 2 }>
				{ postMeta[ meta.source ]?.poster && (
					<img src={ postMeta[ meta.source ].poster } alt={ __( 'Sharing Image poster', 'sharing-image' ) } />
				) }

				<SelectControl
					value={ template }
					options={ Object.keys( templates ).map( ( index ) => ( {
						label: templates[ index ].title || __( 'Untitled', 'sharing-image' ),
						value: index,
					} ) ) }
					onChange={ changeTemplate }
				/>

				{ templates[ template ] && (
					<Flex direction={ 'column' } gap={ 2 }>
						<TemplateFields
							layers={ templates[ template ].layers || [] }
							fieldset={ fieldset }
							setFieldset={ setFieldset }
						/>
					</Flex>
				) }

				<Flex justify={ 'flex-start' }>
					<Button variant="secondary" type={ 'button' } onClick={ () => generatePoster() }>
						{ __( 'Generate', 'sharing-image' ) }
					</Button>

					<Button variant="tertiary" isDestructive={ true } onClick={ () => removePoster() }>
						{ __( 'Remove', 'sharing-image' ) }
					</Button>

					{ loading && <Spinner /> }
				</Flex>
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
			return <SharingImageSidebar { ...params } />;
		}
	},
} );
