import { Router } from 'express';
import { includes, sum } from 'lodash';

const { writeFileSync } = require('fs');
const { execSync, spawnSync } = require('child_process');
const { join } = require('path');

import * as Keranjang from '../../../../db/file/keranjang';

declare var module: any,
			__dirname: any,
			require: any;

function currency(number) {
	number = String(number).split('').reverse()
	let I = Math.floor(String(number).split('').reverse().join('').length / 3)
	for ( let i = 0 ; i < I-1 ; i ++ ) {
		switch (i) {
			case 0: number[2]	= (number[2]	+ '.').split('').reverse().join(''); break;
			case 1: number[5]	= (number[5]	+ '.').split('').reverse().join(''); break;
			case 2: number[8]	= (number[8]	+ '.').split('').reverse().join(''); break;
			case 3: number[11]	= (number[11]	+ '.').split('').reverse().join(''); break;
			case 4: number[14]	= (number[14]	+ '.').split('').reverse().join(''); break;
			case 5: number[17]	= (number[17]	+ '.').split('').reverse().join(''); break;
			case 6: number[20]	= (number[20]	+ '.').split('').reverse().join(''); break;
			case 7: number[23]	= (number[23]	+ '.').split('').reverse().join(''); break;
		}
	}
	let rv = number.filter((n, i, r) => {
		let f = 0;
		if (r[i] == undefined) {f += 1;}
		if (r[i] == '.denifednu') {f += 1;}
		return f == 0 ? true : false;
	})
	rv = rv.reverse();
	rv[0] = rv[0].replace('.', '');
	return rv.join('');
}

const KeranjangRouter: Router = Router();

KeranjangRouter
	.post('/post', (req, res) => {
		console.log('POST: /api/db/file/keranjang/post')
		const keranjang: Keranjang.Keranjang = JSON.parse(req.body.data);
		res.json({
			data: Keranjang.add(keranjang),
			success: true
		})
	})
	.post('/cetak-struk', (req, res) => {
		const keranjang: Keranjang.Keranjang = req.body;
		let template: string = `
			<!DOCTYPE html>
			<html>
			<head>
				<title>Struk Pembelian Buku</title>
				<style type="text/css">
					body{ padding: 24px; }
				</style>
			</head>
			<body>
				<center>
					<h1>Struk Pembelian Buku</h1>
					<h2>Jl. Percobaan No.65 Cileunyi Kabupaten Bandung <br>Telp. 022-12345678 Fax. 022-87654321</h2>
				</center>
				<hr>
				<table style='width: 100%'>
					<!-- kasir.nama -->
					<!-- konsumen.nama -->
					<!-- keranjang.isi -->
					<!-- keranjang.total -->
					<tr>
						<td colspan='4' style='text-align: center'>
							~~~~~~~~~~ Terima Kasih ~~~~~~~~~~
						</td>
					</tr>
				</table>
			</body>
			</html>
		`;
		if ( keranjang.idPegawai ) {
			template = template.replace('<!-- kasir.nama -->', `
				<tr>
					<td>Nama Kasir</td>
					<td>${keranjang.$pegawai.nama}</td>
					<td></td>
					<td></td>
				</tr>`)
		}
		if ( keranjang.idKonsumen ) {
			template = template.replace('<!-- konsumen.nama -->', `
				<tr>
					<td>Nama Konsumen</td>
					<td>${keranjang.$konsumen.nama}</td>
					<td></td>
					<td></td>
				</tr>`)
		}
		let template_isiKeranjang = `
			<tr>
				<td><b>Judul</b></td>
				<td style='text-align: right'><b>Harga</b></td>
				<td style='text-align: right'><b>Jumlah</b></td>
				<td style='text-align: right'><b>Subtotal</b></td>
			</tr>
		`;
		for ( let i in keranjang.isi ) {
			template_isiKeranjang += `
				<tr>
					<td>${keranjang.isi[i].$buku.judul}</td>
					<td style='text-align: right'>Rp. ${currency(keranjang.isi[i].$buku.harga)}</td>
					<td style='text-align: right'>${keranjang.isi[i].beli}</td>
					<td style='text-align: right'>Rp. ${currency(keranjang.isi[i].beli * keranjang.isi[i].$buku.harga)}</td>
				</tr>
			`
		}
		template = template.replace('<!-- keranjang.isi -->', template_isiKeranjang)
		let total_beli = sum(keranjang.isi.map((isiKeranjang) => isiKeranjang.beli))
		let total_harga = sum(keranjang.isi.map((isiKeranjang) => isiKeranjang.subtotal))
		template = template.replace('<!-- keranjang.total -->', `
			<tr><td colspan='4'><hr></td></tr>
			<tr style='border-top: 1px solid black'>
				<td></td>
				<td style='text-align: right'><b>Total</b></td>
				<td style='text-align: right'>${currency(total_beli)}</td>
				<td style='text-align: right'>Rp. ${currency(total_harga)}</td>
			</tr>
		`)
		let htmlPath = join(__dirname, '..', '..', '..', '..', 'struk_keranjang_html', 'struk-pembelian-buku-' + keranjang.idKeranjang + '.html')
		let pdfPath = join(__dirname, '..', '..', '..', '..', 'public', 'pdf', 'struk-pembelian-buku-' + keranjang.idKeranjang + '.pdf')
		let execPath = join(__dirname, '..', '..', '..', '..', '..', 'node_modules', '.bin', 'html-pdf');
		writeFileSync(htmlPath, template)
		try{
			execSync(execPath + ' ' + htmlPath + ' ' + pdfPath)
		}catch(e){}
		res.json({
			data: req.body,
			success: true
		})
	})
	.get('/get/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET: /api/db/file/keranjang/get/'+id)
		res.json(Keranjang.get(id))
	})
	.get('/gets', (req, res) => {
		console.log('GET: /api/db/file/keranjang/gets')
		res.json(Keranjang.gets())
	})
	.put('/put', (req, res) => {
		console.log('PUT: /api/db/file/keranjang/put')
		const keranjang: Keranjang.Keranjang = JSON.parse(req.body.data);
		res.json({
			data: Keranjang.update(keranjang),
			success: true
		})
	})
	.delete('/delete/:id', (req, res) => {
		const id = req.params.id;
		console.log('DELETE: /api/db/file/keranjang/delete/' + id)
		Keranjang.remove(id)
		res.json({success: true})
	})

export { KeranjangRouter }
