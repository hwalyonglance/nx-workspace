'use strict';

import { tmpdir } from 'os';
import { join } from 'path';

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as puppeteer from 'puppeteer'

const app = functions.https.onRequest((req, res) => {
	res.send('Hello from Firebase!\n\n');
});

const cetak = functions.https.onRequest((req, res) => {
	(async() => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		const filename = join(tmpdir(), Date.now() + '.pdf');
		const url = 'https://ujikom-ng.firebaseapp.com/cetak/' + req.url;
		await page.goto(url, {waitUntil: 'networkidle2'});
		setTimeout(async() => {
			await page.pdf({
				path: filename,
				format: 'letter'
			});

			await browser.close();
			res.sendFile(filename);
		}, 2000)
	})();
});

export { app, cetak };
