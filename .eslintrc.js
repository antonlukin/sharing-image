module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		'linebreak-style': [ 'error', 'unix' ],
		quotes: [ 'error', 'single' ],
		semi: [ 'error', 'always' ],
		'max-len': [ 'error', { code: 120 } ],
	},
	ignorePatterns: [ 'docs/*.js', 'assets/scripts/*.js' ],
};
