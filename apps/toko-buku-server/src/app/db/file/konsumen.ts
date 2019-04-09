import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Konsumen {
	idKonsumen?: string;
	foto?: string;
	nama?: string;
	kodePos?: string;
	telepon?: string;
	jenisKelamin?: string;
	email?: string;
	password?: string;
	alamat?: string;
	tanggalDaftar?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Konsumen$: Konsumen[];
try{
	Konsumen$ = require('./Konsumen.json');
}catch(e){
	Konsumen$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'Konsumen.json'), JSON.stringify(Konsumen$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Konsumen[] {
	console.log('[db]Konsumen: gets');
	return Konsumen$;
}
export function get(id: string): Konsumen {
	console.log('[db]Konsumen: get');
	return Konsumen$.filter((konsumen: Konsumen) => konsumen.idKonsumen === id)[0];
}
export function add(konsumen: Konsumen): Konsumen {
	const _konsumen = Object.assign(konsumen, {
		idKonsumen: v4(),
		tanggalDaftar: Date.now()
	})
	Konsumen$.unshift(_konsumen);
	save();
	return _konsumen;
}
export function update(konsumen: Konsumen): Konsumen {
	console.log('[db]Konsumen: update');
	let _konsumen;
	for(let i in Konsumen$){
		if( Konsumen$[i].idKonsumen == konsumen.idKonsumen ){
			_konsumen = Konsumen$[i] = konsumen;
		}
	}
	save();
	return _konsumen;
}
export function remove(id: string): Konsumen {
	console.log('[db]Konsumen: remove');
	Konsumen$ = Konsumen$.filter((konsumen: Konsumen) => {
		return id !== konsumen.idKonsumen;
	});
	save();
	return get(id);
}
