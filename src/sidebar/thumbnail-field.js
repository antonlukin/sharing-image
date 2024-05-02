import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Icon, image } from '@wordpress/icons';

const ThumbnailField = ( { fieldset, changeFieldset, open, name } ) => {
	const styles = { borderRadius: '2px', objectFit: 'cover', width: '36px', height: '36px' };

	const thumbnail = useSelect(
		( select ) => {
			const media = select( 'core' ).getMedia( fieldset[ name ] );

			// Try to get thumnail first.
			let url = media?.media_details?.sizes?.thumbnail?.source_url;

			if ( ! url ) {
				url = media?.source_url;
			}

			return url;
		},
		[ fieldset ]
	);

	const removeImage = () => {
		changeFieldset( name, 0 );
	};

	if ( fieldset[ name ] ) {
		return (
			<>
				{ thumbnail && <img src={ thumbnail } alt={ '' } style={ styles } /> }

				<Button variant="link" onClick={ removeImage }>
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

export default ThumbnailField;
