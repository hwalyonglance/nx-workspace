import { Router } from 'express';
import * as multer from 'multer';

import * as Mobil from '../../../../db/file/mobil';

declare var module: any,
			__dirname: any,
			require: any;

const { join } = require('path')
const { mkdirSync, unlinkSync } = require('fs')

const MobilRouter: Router = Router();
const dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'mobil');
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

MobilRouter
	// .use((req, res, next) => {
	// 	res.set('Access-Control-Allow-Origin', '*')
	// 	next()
	// })
	.post('/post', upload.single('photo'), (req, res) => {
		console.log('POST: /api/db/file/mobil/post')
		const mobil: Mobil.Mobil = JSON.parse(req.body.data);
		mobil.image = req.file.filename;
		res.json({
			data: Mobil.add(mobil),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/mobil/get/'+id)
		res.json(Mobil.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/mobil/gets')
		res.json(Mobil.gets())
	})
	.put('/put', upload.single('photo'), (req, res) => {
		console.log('PUT: /api/db/file/mobil/put')
		const mobil: Mobil.Mobil = JSON.parse(req.body.data);
		if ( req.file ) mobil.image = req.file.filename
		res.json({
			data: Mobil.update(mobil),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/mobil/delete/'+id)
		unlinkSync(join(dest, Mobil.remove(id).image))
		res.json({success: true})
	})

export { MobilRouter }
