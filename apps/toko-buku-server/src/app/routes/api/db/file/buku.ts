import { Router } from 'express';

import * as Buku from '../../../../db/file/buku';

declare var module: any,
			__dirname: any,
			require: any;

const BukuRouter: Router = Router();

BukuRouter
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/buku/post')
		const buku: Buku.Buku = JSON.parse(req.body.data);
		res.json({
			data: Buku.add(buku),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/buku/get/'+id)
		res.json(Buku.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/buku/gets')
		res.json(Buku.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/buku/put')
		const buku: Buku.Buku = JSON.parse(req.body.data);
		res.json({
			data: Buku.update(buku),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/buku/delete/' + id)
		Buku.remove(id)
		res.json({success: true})
	})

export { BukuRouter }
