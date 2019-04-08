import { Router } from 'express';

import * as Pegawai from '../../../../db/file/pegawai';

declare var module: any,
			__dirname: any,
			require: any;

const PegawaiRouter: Router = Router();

PegawaiRouter
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/pegawai/post')
		const pegawai: Pegawai.Pegawai = JSON.parse(req.body.data)
		res.json({
			data: Pegawai.add(pegawai),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/pegawai/get/'+id)
		res.json(Pegawai.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/pegawai/gets')
		res.json(Pegawai.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/pegawai/put')
		const pegawai: Pegawai.Pegawai = JSON.parse(req.body.data)
		res.json({
			data: Pegawai.update(pegawai),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/pegawai/delete/'+id)
		Pegawai.remove(id)
		res.json({success: true})
	})

export { PegawaiRouter }
