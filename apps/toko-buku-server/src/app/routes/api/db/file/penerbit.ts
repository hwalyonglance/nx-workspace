import { Router } from 'express';

import * as Penerbit from '../../../../db/file/penerbit';

declare var module: any,
			__dirname: any,
			require: any;

const PenerbitRouter: Router = Router();

PenerbitRouter
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/penerbit/post')
		const penerbit: Penerbit.Penerbit = JSON.parse(req.body.data);
		res.json({
			data: Penerbit.add(penerbit),
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/penerbit/get/'+id)
		res.json(Penerbit.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/penerbit/gets')
		res.json(Penerbit.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/penerbit/put')
		const penerbit: Penerbit.Penerbit = JSON.parse(req.body.data);
		res.json({
			data: Penerbit.update(penerbit),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/penerbit/delete/'+id)
		Penerbit.remove(id);
		res.json({success: true})
	})

export { PenerbitRouter }
