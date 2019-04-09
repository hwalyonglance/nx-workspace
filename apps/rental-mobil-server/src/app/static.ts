declare var __dirname: any,
			require: any,
			process: any;

import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as io from 'socket.io';
const { createServer } = require('http');
const { join } = require('path');
const { readFileSync } = require('fs');

import { enableProdMode, StaticProvider } from '@angular/core';
enableProdMode()
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Import the AOT compiled factory for your AppServerModule.
const { Pp2ServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./main.bundle`);

const app = express();
const port = process.env.PORT || 4136;
const baseUrl = `http://localhost:${port}`;

// Set the engine

app.engine('html', (_, options, callback) => {
	console.log('engine ', options.req.url)
	renderModuleFactory(Pp2ServerModuleNgFactory, {
		document: (readFileSync(join(__dirname, 'public', 'index.html'), 'utf8')) as string,
		url: (options.req.url) as string,
		extraProviders: (([
			provideModuleMap(LAZY_MODULE_MAP)
		]) as StaticProvider[])
	}).then(html => {
		callback(null, html);
	});
});

app.set('view engine', 'html');

app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));

// ---------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err['status'] = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	res.render('index', {req, res})
});
// ---------------------------------------------

app.listen(port, (err) => {
	console.log(baseUrl)
})
