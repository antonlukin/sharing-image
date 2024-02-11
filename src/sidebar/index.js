import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

const SharingImageSidebar = () => {
	return (
		<PluginDocumentSettingPanel
			name="sharing-image-setting"
			title={ __( 'Sharing Image', 'sharimg-image' ) }
		>
			<p>Test message</p>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'sharing-image-sidebar', {
	render: () => {
		return (
			<SharingImageSidebar />
		);
	},
} );
