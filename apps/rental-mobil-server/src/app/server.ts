declare var __dirname: any,
require: any,
process: any;

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IndexRouter } from './routes/index';

const { createServer } = require('http');
const { join } = require('path');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
		'Access-Control-Allow-Origin': '*'
	})
	next()
})
app.use(express.static(join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', IndexRouter);

const PORT = process.env.PORT || 4136;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { Pp2ServerModuleNgFactory, Pp2ServerModule, LAZY_MODULE_MAP } = require('./main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
	bootstrap: Pp2ServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}));

app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));

// Server static files from /browser
app.get('*.*', express.static(join(__dirname, 'public')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
	// res.sendFile(join(__dirname, 'public', 'index.html'))
	res.render('index', { req, res });
});

// // Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node server listening on http://localhost:${PORT}`);
// });

const server = createServer(app)
server.listen(PORT, (err)=>{
	console.log(err, PORT)
})
