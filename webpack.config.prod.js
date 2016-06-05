'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'babel-polyfill',
		path.resolve(__dirname, 'src/js/devrant.js')
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),

		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
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
