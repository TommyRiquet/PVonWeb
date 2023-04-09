/* eslint-disable no-undef */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'settings': {
		'react': {
			'version': 'detect'
		}
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true
		}
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-extra-semi': 'error',
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {
				delimiter: 'none'
			},
			singleline: {
				delimiter: 'comma'
			}
		}],
		'react/hook-use-state': 'error',
		'react/jsx-props-no-multi-spaces': 'error',
		'react/jsx-curly-newline': ['error', {'multiline': 'consistent', 'singleline': 'consistent'}],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/self-closing-comp': 'error',
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'jsx-quotes': ['error', 'prefer-single'],
		'key-spacing': 'error',
		'no-trailing-spaces': 'error',
		'no-extra-semi': 'off',
		'arrow-spacing': ['error', {'before': true, 'after': true}],
		'eol-last': ['error', 'always'],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'comma-dangle': ['error', 'never']
	}
}
