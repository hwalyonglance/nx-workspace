import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Kategori {
	idKategori?: string;
	kategori?: string;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Kategori$: Kategori[];
try{
	Kategori$ = require('./Kategori.json');
}catch(e){
	Kategori$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'Kategori.json'), JSON.stringify(Kategori$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Kategori[] {
	console.log('[db]Kategori: gets');
	return Kategori$.slice();
}
export function get(id: string): Kategori {
	console.log('[db]Kategori: get');
	return Kategori$.filter((kategori: Kategori) => kategori.idKategori === id)[0];
}
export function add(kategori: Kategori): Kategori {
	Kategori$.unshift(Object.assign(kategori, { idKategori: v4() }));
	save();
	return kategori;
}
export function update(kategori: Kategori): Kategori {
	console.log('[db]Kategori: update');
	let _kategori;
	for(let i in Kategori$){
		if( Kategori$[i].idKategori == kategori.idKategori ){
			_kategori = Kategori$[i] = kategori;
		}
	}
	save();
	return _kategori;
}
export function remove(id: string): Kategori {
	console.log('[db]Kategori: remove');
	Kategori$ = Kategori$.filter((kategori: Kategori) => {
		return id !== kategori.idKategori;
	});
	save();
	return get(id);
}
