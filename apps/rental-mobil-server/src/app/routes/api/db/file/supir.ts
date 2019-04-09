import { Router } from 'express';
import * as multer from 'multer';

import * as Supir from '../../../../db/file/supir';

declare var module: any,
			__dirname: any,
			require: any;

const { join } = require('path')
const { mkdirSync, unlinkSync } = require('fs')

const SupirRouter: Router = Router();
const dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'supir');
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

SupirRouter
	// .use((req, res, next) => {
	// 	res.set('Access-Control-Allow-Origin', '*')
	// 	next()
	// })
	.post('/post', upload.single('photo'), (req, res) => {
		console.log('POST: /api/db/file/supir/post')
		const supir: Supir.Supir = JSON.parse(req.body.data);
		supir.image = req.file.filename;
		res.json({
			data: Supir.add(supir),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/supir/get/'+id)
		res.json(Supir.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/supir/gets')
		res.json(Supir.gets())
	})
	.put('/put', upload.single('photo'), (req, res) => {
		console.log('PUT: /api/db/file/supir/put')
		const supir: Supir.Supir = JSON.parse(req.body.data);
		if ( req.file ) supir.image = req.file.filename;
		res.json({
			data: Supir.update(supir),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/supir/delete/'+id)
		unlinkSync(join(dest, Supir.remove(id).image))
		res.json({success: true})
	})

export { SupirRouter }
