import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Pegawai {
	idPegawai?: string;
	foto?: string;
	nama?: string;
	telepon?: string;
	jenisKelamin?: string;
	email?: string;
	password?: string;
	akses?: 'Kasir' | 'Logistik';
	alamat?: string;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Pegawai$: Pegawai[];
try{
	Pegawai$ = require('./Pegawai.json');
}catch(e){
	Pegawai$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'Pegawai.json'), JSON.stringify(Pegawai$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Pegawai[] {
	console.log('[db]Pegawai: gets');
	return Pegawai$;
}
export function get(id: string): Pegawai {
	console.log('[db]Pegawai: get');
	return Pegawai$.filter((pegawai: Pegawai) => pegawai.idPegawai === id)[0];
}
export function add(pegawai: Pegawai): Pegawai {
	const _pegawai = Object.assign(pegawai, {
		idPegawai: v4()
	})
	Pegawai$.unshift(_pegawai);
	save();
	return _pegawai;
}
export function update(pegawai: Pegawai): Pegawai {
	console.log('[db]Pegawai: update');
	let _pegawai;
	for(let i in Pegawai$){
		if( Pegawai$[i].idPegawai == pegawai.idPegawai ){
			_pegawai = Pegawai$[i] = pegawai;
		}
	}
	save();
	return _pegawai;
}
export function remove(id: string): Pegawai {
	console.log('[db]Pegawai: remove');
	Pegawai$ = Pegawai$.filter((pegawai: Pegawai) => {
		return id !== pegawai.idPegawai;
	});
	save();
	return get(id);
}
