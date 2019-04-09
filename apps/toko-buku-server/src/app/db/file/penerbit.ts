import { v4 } from 'uuid';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

declare var require: any;
declare var __dirname: any;

export interface Penerbit {
	idPenerbit?: string;
	penerbit?: string;
	penulis?: string;
	telepon?: string;
	alamat?: string;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Penerbit$: Penerbit[];
try{
	Penerbit$ = require('./Penerbit.json');
}catch(e){
	Penerbit$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'Penerbit.json'), JSON.stringify(Penerbit$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Penerbit[] {
	console.log('[db]Penerbit: gets');
	return Penerbit$;
}
export function get(id: string): Penerbit {
	console.log('[db]Penerbit: get');
	return Penerbit$.filter((penerbit: Penerbit) => penerbit.idPenerbit === id)[0];
}
export function add(penerbit: Penerbit): Penerbit {
	Penerbit$.unshift(Object.assign(penerbit, { idPenerbit: v4() }));
	save();
	return penerbit;
}
export function update(penerbit: Penerbit): Penerbit {
	console.log('[db]Penerbit: update');
	let _penerbit;
	for(let i in Penerbit$){
		if( Penerbit$[i].idPenerbit == penerbit.idPenerbit ){
			_penerbit = Penerbit$[i] = penerbit;
		}
	}
	save();
	return _penerbit;
}
export function remove(id: string): Penerbit {
	console.log('[db]Penerbit: remove');
	Penerbit$ = Penerbit$.filter((penerbit: Penerbit) => {
		return id !== penerbit.idPenerbit;
	});
	save();
	return get(id);
}
