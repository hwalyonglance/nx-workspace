declare var __dirname: any,
		require: any,
		process: any;

import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IndexRouter } from './routes/index';

const { createServer, Server } = require('http');
const { join } = require('path');
const { readFileSync } = require('fs');

enableProdMode();

const app = express();

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
		'Access-Control-Allow-Origin': '*'
	})
	next()
})
// app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({
	limit: 1024 * 1024 * 1024 * 1024
}))
app.use('/', IndexRouter);

const PORT = process.env.PORT || 8080;

const { AppServerModuleNgFactory, AppServerModule, LAZY_MODULE_MAP } = require('./main.bundle');

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

let template = readFileSync(join(__dirname,'public', 'index.html')).toString();

import { renderModuleFactory } from '@angular/platform-server';

app.engine('html', ngExpressEngine({
	bootstrap: AppServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}));

// app.engine('html', (_, options, callback) => {
//   const opts = { document: template, url: options.req.url };
//   renderModuleFactory(AppServerModuleNgFactory, opts)
//     .then(html => callback(null, html));
// });

app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));

app.get('*.*', express.static(join(__dirname, 'public')))
app.get('*', (req, res) => {
	// res.sendFile(join(__dirname, 'public', 'index.html'))
	res.render('index', { req, res });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

// const server = Server(app)
// server.listen(PORT, (err)=>{
// 	console.log(err, PORT)
// })

export {
	app,
	PORT,
}
