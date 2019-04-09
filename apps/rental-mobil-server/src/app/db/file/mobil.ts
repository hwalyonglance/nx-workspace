import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Mobil {
	id?: string;
	nama?: string;
	platNo?: string;
	kursi?: number;
	bensin?: string;
	hargaSewa?: number;
	image?: string;
	kondisi?: string;
	_status?: 'Tersedia' | 'Dipesan' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: number;
	createdAt?: number;
	updatedAt?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Mobil$: Mobil[];
try{
	Mobil$ = require('./mobil.json');
}catch(e){
	Mobil$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'mobil.json'), JSON.stringify(Mobil$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Mobil[] {
	console.log('[db]Mobil: gets');
	return Mobil$;
}
export function get(id: string): Mobil {
	console.log('[db]Mobil: get');
	return Mobil$.filter((Mobil: Mobil) => Mobil.id === id)[0];
}
export function add(mobil: Mobil): Mobil {
	const _mobil = Object.assign(mobil, {
		id: v4(),
		_status: 'Tersedia',
		_disewa: 0,
		createdAt: Date.now(),
		updatedAt: Date.now()
	})
	Mobil$.unshift(_mobil);
	save();
	return _mobil;
}
export function update(mobil: Mobil): Mobil {
	console.log('[db]Mobil: update');
	let _mobil;
	for(let i in Mobil$){
		if( Mobil$[i].id == mobil.id ){
			_mobil = Mobil$[i] = Object.assign(mobil, { updatedAt: Date.now() });
		}
	}
	save();
	return _mobil;
}
export function remove(id: string): Mobil {
	console.log('[db]Mobil: remove');
	Mobil$ = Mobil$.filter((Mobil: Mobil) => {
		return id !== Mobil.id;
	});
	save();
	return get(id);
}
