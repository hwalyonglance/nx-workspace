import { Router } from 'express';

import * as Kategori from '../../../../db/file/kategori';

declare var module: any,
			__dirname: any,
			require: any;

const KategoriRouter: Router = Router();

KategoriRouter
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/kategori/post')
		const kategori: Kategori.Kategori = JSON.parse(req.body.data);
		res.json({
			data: Kategori.add(kategori),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/kategori/get/'+id)
		res.json(Kategori.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/kategori/gets')
		res.json(Kategori.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/kategori/put')
		const kategori: Kategori.Kategori = JSON.parse(req.body.data);
		res.json({
			data: Kategori.update(kategori),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/kategori/delete/' + id)
		Kategori.remove(id)
		res.json({success: true})
	})

export { KategoriRouter }
