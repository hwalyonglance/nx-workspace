import { Router } from 'express';
import * as multer from 'multer';

import * as Pengguna from '../../../../db/file/pengguna';

declare var module: any,
			__dirname: any,
			require: any;

const { join } = require('path')
const { mkdirSync, unlinkSync } = require('fs')

const PenggunaRouter: Router = Router();
const dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'pengguna');
const upload = multer({
	// dest,
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dest)
		},
		filename: (req, file, cb) => {
			const [name, ext] = file.originalname.split('.');
			cb(null, name.replace(/\s/g, '-') + '-' + Date.now() + '.' + ext)
		}
	})
})

try{
	mkdirSync(dest)
}catch(e){}

PenggunaRouter
	// .use((req, res, next) => {
	// 	res.set({
	// 		'Access-Control-Allow-Origin': '*',
	// 		'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE'
	// 	})
	// 	next()
	// })
	.post('/post', upload.single('photo'), (req, res) => {
		console.log('POST: /api/db/file/pengguna/post')
		const pengguna: Pengguna.Pengguna = JSON.parse(req.body.data);
		pengguna.image = req.file.filename;
		res.json({
			data: Pengguna.add(pengguna),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/pengguna/get/'+id)
		res.json(Pengguna.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/pengguna/gets')
		res.json(Pengguna.gets())
	})
	.put('/put', upload.single('photo'), (req, res) => {
		console.log('PUT: /api/db/file/pengguna/put')
		const pengguna: Pengguna.Pengguna = JSON.parse(req.body.data);
		if ( req.file ) pengguna.image = req.file.filename
		res.json({
			data: Pengguna.update(pengguna),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/pengguna/delete/'+id)
		unlinkSync(join(dest, Pengguna.remove(id).image))
		res.json({success: true})
	})

export { PenggunaRouter }
