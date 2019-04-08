import { Router } from 'express';

import * as Konsumen from '../../../../db/file/konsumen';

declare var module: any,
			__dirname: any,
			require: any;

const KonsumenRouter: Router = Router();

KonsumenRouter
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/konsumen/post')
		const konsumen: Konsumen.Konsumen = JSON.parse(req.body.data);
		res.json({
			data: Konsumen.add(konsumen),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/konsumen/get/'+id)
		res.json(Konsumen.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/konsumen/gets')
		res.json(Konsumen.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/konsumen/put')
		const konsumen: Konsumen.Konsumen = JSON.parse(req.body.data);
		res.json({
			data: Konsumen.update(konsumen),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/konsumen/delete/'+id)
		res.json({success: true})
	})

export { KonsumenRouter }
