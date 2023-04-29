module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
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
