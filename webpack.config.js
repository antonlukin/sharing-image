const path = require( 'path' );
const config = require( '@wordpress/scripts/config/webpack.config.js' );

// Import the utility to auto-generate the entry points in the src directory.
const { getWebpackEntryPoints } = require( '@wordpress/scripts/utils/config' );

config.entry = {
	...getWebpackEntryPoints(),
	'widget/index': './src/widget/index.js',
	'settings/index': './src/settings/index.js',
	'sidebar/index': './src/sidebar/index.js',
};

config.output = {
	path: path.resolve( __dirname, './assets/' ),
	filename: '[name].js',
};

module.exports = config;
