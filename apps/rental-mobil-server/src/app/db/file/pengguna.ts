import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Pengguna {
	id?: string;
	nama?: string;
	Penggunaname?: string;
	password?: string;
	noKTP?: string;
	noHP?: string;
	jk?: string;
	email?: string;
	alamat?: string;
	image?: string;
	createdAt?: number;
	updatedAt?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Pengguna$: Pengguna[];
try{
	Pengguna$ = require('./pengguna.json');
}catch(e){
	Pengguna$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'pengguna.json'), JSON.stringify(Pengguna$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Pengguna[] {
	console.log('[db]Pengguna: gets');
	return Pengguna$;
}
export function get(id: string): Pengguna {
	console.log('[db]Pengguna: get');
	return Pengguna$.filter((pengguna: Pengguna) => pengguna.id === id)[0];
}
export function add(pengguna: Pengguna): Pengguna {
	console.log('[db]Pengguna: add');
	const _pengguna = Object.assign(pengguna, {
		id: v4(),
		createdAt: Date.now(),
		updatedAt: Date.now()
	});
	Pengguna$.unshift(_pengguna);
	save();
	return _pengguna;
}
export function update(pengguna: Pengguna): void {
	console.log('[db]Pengguna: update');
	let _pengguna;
	for(let i in Pengguna$){
		if( Pengguna$[i].id == pengguna.id ){
			_pengguna = Pengguna$[i] = Object.assign(pengguna, { updatedAt: Date.now() })
		}
	}
	save();
	return _pengguna;
}
export function remove(id: string): Pengguna {
	console.log('[db]Pengguna: remove');
	Pengguna$ = Pengguna$.filter((pengguna: Pengguna) => {
		return id !== pengguna.id;
	});
	save();
	return get(id);
}
