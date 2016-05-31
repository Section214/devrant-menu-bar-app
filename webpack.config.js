'use strict';

const path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/js/devrant.js'),

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'build.js'
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015', 'stage-0' ]
				}
			}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx' ],
		fallback: path.join(__dirname, 'node_modules')
	},

	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	}
};
