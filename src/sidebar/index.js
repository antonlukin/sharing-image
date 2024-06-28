import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { SelectControl, Button, Flex, Spinner, Dashicon } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';

import TemplateFields from './components/template-fields';
import styles from './styles.module.scss';

const SharingImageSidebar = ( { meta, templates, autogenerate } ) => {
	const { createErrorNotice, removeNotice } = useDispatch( noticesStore );

	/**
	 * Retrieve post id.
	 */
	const postId = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostId();
	} );

	/**
	 * Retrieve post meta.
	 */
	const postMeta = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
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

	const updateFieldset = ( key, value ) => {
		setFieldset( ( prevFieldset ) => ( { ...prevFieldset, [ key ]: value } ) );
	};

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
	 * Display icon for auto generated poster.
	 */
	const displayModeAutoIcon = () => {
		const title = __( 'Poster was generated automatically and will update on post saving.', 'sharing-image' );

		return <Dashicon icon="awards" className={ styles.modeAuto } title={ title } />;
	};

	/**
	 * Update post meta on fieldset changes.
	 */
	useEffect( () => {
		editPost( {
			meta: { [ meta.fieldset ]: fieldset },
		} );
	}, [fieldset]); // eslint-disable-line

	/**
	 * Set template on load.
	 */
	useEffect( () => {
		if ( templates[ template ] ) {
			return;
		}

		if ( autogenerate && templates[ autogenerate ] ) {
			setTemplate( autogenerate );
			return;
		}

		const [ index ] = Object.keys( templates );

		if ( index ) {
			setTemplate( index );
		}
	}, [ templates, template, autogenerate ] );

	return (
		<Flex direction={ 'column' } gap={ 2 } style={ { position: 'relative' } }>
			{ postMeta[ meta.source ]?.poster && (
				<img src={ postMeta[ meta.source ].poster } alt={ __( 'Sharing Image poster', 'sharing-image' ) } />
			) }

			{ postMeta[ meta.source ]?.mode === 'auto' && displayModeAutoIcon() }

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
						mode={ postMeta[ meta.source ]?.mode }
						fieldset={ fieldset }
						updateFieldset={ updateFieldset }
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
	);
};

registerPlugin( 'sharing-image-sidebar', {
	render: () => {
		const params = window.sharingImageSidebar || {};

		if ( ! params.meta?.source || ! params.meta?.fieldset ) {
			return;
		}

		return (
			<PluginDocumentSettingPanel name="sharing-image-sidebar" title={ __( 'Sharing Image', 'sharing-image' ) }>
				<SharingImageSidebar { ...params } />
			</PluginDocumentSettingPanel>
		);
	},
} );
