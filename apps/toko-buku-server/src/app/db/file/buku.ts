import { v4 } from 'uuid';
import { includes } from 'lodash';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import * as Kategori from './kategori';
import * as Penerbit from './penerbit';

declare var require: any;
declare var __dirname: any;

export interface Buku{
	noIsbn?: string;
	idPenerbit?: string;
	$penerbit?: Penerbit.Penerbit;
	idKategori?: string;
	$kategori?: Kategori.Kategori;
	judul?: string;
	sinopsis?: string;
	gambar?: string;
	tahunTerbit?: number;
	stok?: number;
	harga?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Buku$: Buku[];
try{
	Buku$ = require('./Buku.json');
}catch(e){
	Buku$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'Buku.json'), JSON.stringify(Buku$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Buku[] {
	console.log('[db]Buku: gets');
	return Buku$.slice()
		.filter(buku => {
			return includes(Kategori.gets().map(kategori => kategori.idKategori), buku.idKategori)
		}).filter(buku => {
			return includes(Penerbit.gets().map(penerbit => penerbit.idPenerbit), buku.idPenerbit)
		}).map(buku => Object.assign(buku, {$kategori: Kategori.get(buku.idKategori)}))
			.map(buku => {
			return Object.assign(buku, {$penerbit: Penerbit.get(buku.idPenerbit)});
		});
}
export function get(id: string): Buku {
	console.log('[db]Buku: get');
	return Buku$.filter((buku: Buku) => buku.noIsbn === id)[0];
}
export function add(buku: Buku): Buku {
	Buku$.unshift(buku);
	save();
	return buku;
}
export function update(buku: Buku): Buku {
	console.log('[db]Buku: update');
	let _buku;
	for(let i in Buku$){
		if( Buku$[i].noIsbn == buku.noIsbn ){
			_buku = Buku$[i] = buku;
		}
	}
	save();
	return _buku;
}
export function remove(id: string): Buku {
	console.log('[db]Buku: remove');
	Buku$ = Buku$.filter((buku: Buku) => {
		return id !== buku.noIsbn;
	});
	save();
	return get(id);
}
