'use strict';

/* eslint no-console: 0 */

const path = require('path');
const menubar = require('menubar');
const pjson = require('../../package');

const ENV = process.env.NODE_ENV;

const mb = menubar({
	index: `file://${path.resolve(__dirname, '../index.html')}`,
	icon: path.resolve(__dirname, '../img/icon.png')
});

/**
 * Fires when the app has been created and initialized.
 *
 * @private
 */
function _appReady() {
	console.log('App ready');
	console.log(`NODE_ENV=${ENV}`);
}

/**
 * Fires after the app window was created.
 *
 * @private
 */
function _windowCreated() {
	if (ENV === 'development') {
		const { node, chrome, electron } = process.versions;

		mb.window.openDevTools();

		console.log(`App v${pjson.version}`);
		console.log(`Node v${node}`);
		console.log(`Chromium v${chrome}`);
		console.log(`Electron v${electron}`);
	}
}

mb.on('ready', _appReady);
mb.on('after-create-window', _windowCreated);
