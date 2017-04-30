module.exports = {
	entry: {
		main: './@REPLACE__ASSETS__NAME@/scripts/main.js'
	},
	output: {
		path: '@REPLACE__ASSETS@',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				exclude: './node_modules',
				options: {
					configFile: './.eslintrc'
				}
			},
			{
				test: /\.twig$/,
				loader: 'twig-loader'
			}
		]
	}
};