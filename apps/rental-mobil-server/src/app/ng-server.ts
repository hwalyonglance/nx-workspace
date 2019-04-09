declare var __dirname: any,
	require: any,
	process: any;

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import { v4 } from 'uuid';
import * as csp from 'helmet-csp';

import * as express from 'express';
import * as io from 'socket.io';
const { join } = require('path');
const { createServer } = require('http');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

app.use((req, res, next) => {
	res.locals.nonce = v4();
	next();
});
app.use(csp({
	directives: {
		scriptSrc: [`'self'`, (req, res) => `'nonce-${res.locals.nonce}'`]
 	}
}));

const PORT = process.env.PORT || 4136;
const PUBLIC = join(__dirname, 'public');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
	bootstrap: AppServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}));

app.set('view engine', 'html');
app.set('views', join(PUBLIC));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
	res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(PUBLIC)));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
	res.render(join(PUBLIC, 'index.html'), {
		req,
		res,
		providers: [
			provideModuleMap(LAZY_MODULE_MAP)
		]
	},(err, html) => {
		console.log('err => ', err)
		console.log('html => ', html)
		res.send(html)
	});
});

// Start up the Node server
app.listen(PORT, () => {
	console.log(`Node server listening on http://localhost:${PORT}`);
});

const server = createServer(app);
const SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router)

const $Socket = io(server);

require('./socket.io/core')($Socket)

server.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
	// console.log('LAZY_MODULE_MAP => ', LAZY_MODULE_MAP)
});