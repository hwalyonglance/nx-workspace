import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import * as Mobil from './mobil';
import * as Supir from './supir';
import * as Pengguna from './pengguna';

declare var require: any;
declare var __dirname: any;

export interface Sewa {
	denda?: number;
	id?: string;
	id_pengguna?: string;
	id_mobil?: string;
	id_supir?: string;
	kondisi?: string;
	mobil?: Mobil.Mobil;
	supir?: Supir.Supir;
	pengguna?: Pengguna.Pengguna;
	tglMulai?: number;
	tglSelesai?: number;
	tglSewaMulai?: number;
	tglSewaSelesai?: number;
	totalSewaHari?: number;
	totalSewaMobil?: number;
	totalSewaSupir?: number;
	totalSewa?: number;
	createdAt?: number;
	updatedAt?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Sewa$: Sewa[];
try{
	Sewa$ = require('./sewa.json');
}catch(e){
	Sewa$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'sewa.json'), JSON.stringify(Sewa$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Sewa[] {
	console.log('[db]Sewa: gets');
	let Sewa$_ = Sewa$;
	for (let key in Sewa$_) {
		Sewa$_[key].mobil = Mobil.get(Sewa$_[key].id_mobil)
		Sewa$_[key].pengguna = Pengguna.get(Sewa$_[key].id_pengguna)
		if (Sewa$_[key].id_supir) {
			Sewa$_[key].supir = Supir.get(Sewa$_[key].id_supir)
		}
	}
	return Sewa$_
}
export function get(id: string): Sewa {
	console.log('[db]Sewa: get');
	return gets().filter((sewa: Sewa) => sewa.id === id)[0];
}
export function add(sewa: Sewa): Sewa {
	console.log('[db]Sewa: add');
	let _sewa = Object.assign(sewa, {
		id: v4(),
		createdAt: Date.now(),
		updatedAt: Date.now()
	})
	Sewa$.unshift(_sewa);
	Mobil.update(Object.assign(Mobil.get(_sewa.id_mobil), {_status: 'Dipesan'}))
	if (_sewa.id_supir) Supir.update(Object.assign(Supir.get(_sewa.id_supir), {_status: 'Dipesan'}))
	save();
	return get(_sewa.id);
}
export function update(sewa: Sewa): Sewa {
	console.log('[db]Sewa: update');
	let _sewa;
	for(let i in Sewa$){
		if( Sewa$[i].id == sewa.id ){
			_sewa = Sewa$[i] = Object.assign(sewa, { updatedAt: Date.now() })
		}
	}
	save();
	return _sewa;
}
export function remove(id: string): Sewa {
	console.log('[db]Sewa: remove');
	const sewa = get(id);
	Mobil.update(Object.assign(Mobil.get(sewa.id_mobil), { _status: 'Tersedia' }))
	if (sewa.id_supir) {
		Supir.update(Object.assign(Supir.get(sewa.id_supir), { _status: 'Tersedia' }))
	}
	Sewa$ = Sewa$.filter((sewa: Sewa) => {
		return id !== sewa.id;
	});
	save();
	return get(id);
}
