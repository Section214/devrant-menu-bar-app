'use strict';

/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const PORT = 8888;

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'dev.server.html'));
});

app.listen(PORT, 'localhost', function (err) {
	if (err) {
		console.log(`Error: ${err}`);

		process.exit(1);
	}

	console.log(`server running at http://localhost:${PORT}`);
});
