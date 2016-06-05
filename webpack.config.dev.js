'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'source-map',

	entry: [
		'babel-polyfill',
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src/js/devrant.js')
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),

		new webpack.NoErrorsPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015', 'stage-0' ]
				}
			},

			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx', '.json' ],
		fallback: path.join(__dirname, 'node_modules')
	},

	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	}
};
