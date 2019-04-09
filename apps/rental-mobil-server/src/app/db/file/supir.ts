import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Supir {
	id?: string;
	nama?: string;
	noSIM?: string;
	noHP?: string;
	jk?: string;
	hargaSewa?: number;
	alamat?: string;
	email?: string;
	image?: string;
	_status?: 'Tersedia' | 'Dipesan' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: number;
	createdAt?: number;
	updatedAt?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Supir$: Supir[];
try{
	Supir$ = require('./supir.json');
}catch(e){
	Supir$ = [];
}

function save(): void {
	console.log(Supir$)
	writeFile(join(__dirname, 'supir.json'), JSON.stringify(Supir$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Supir[] {
	console.log('[db]Supir: gets');
	return Supir$;
}
export function get(id: string): Supir {
	console.log('[db]Supir: get');
	return Supir$.filter((supir: Supir) => supir.id === id)[0];
}
export function add(supir: Supir): Supir {
	const _supir = Object.assign(supir, {
		id: v4(),
		_status: 'Tersedia',
		_disewa: 0,
		createdAt: Date.now(),
		updatedAt: Date.now()
	});
	Supir$.unshift(_supir)
	save();
	return _supir;
}
export function update(supir: Supir): Supir {
	console.log('[db]Supir: update');
	let _supir;
	for(let i in Supir$){
		if( Supir$[i].id == supir.id ){
			_supir = Supir$[i] = Object.assign(supir, { updatedAt: Date.now() })
		}
	}
	save();
	return _supir;
}
export function remove(id: string): Supir {
	console.log('[db]Supir: remove');
	Supir$ = Supir$.filter((Supir: Supir) => {
		return id !== Supir.id;
	});
	save();
	return get(id);
}
