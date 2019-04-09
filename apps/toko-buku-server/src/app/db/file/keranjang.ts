import { v4 } from 'uuid';
import { includes } from 'lodash';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import * as Buku from './buku';
import * as Konsumen from './konsumen';
import * as Pegawai from './pegawai';

declare var require: any;
declare var __dirname: any;

export interface IsiKeranjang{
	noIsbn?: string;
	$buku?: Buku.Buku;
	beli?: number;
	subtotal?: number;
}

export interface Keranjang{
	idKeranjang?: string;
	idKonsumen?: string;
	$konsumen?: Konsumen.Konsumen;
	idPegawai?: string;
	$pegawai?: Pegawai.Pegawai;
	isi?: IsiKeranjang[];
	status: 'Dibawa' | 'Selesai';
	total?: number;
}

const { writeFile } = require('fs');
const { join } = require('path');

let Keranjang$: Keranjang[];
try{
	Keranjang$ = require('./Keranjang.json');
}catch(e){
	Keranjang$ = [];
}

function save(): void {
	writeFile(join(__dirname, 'Keranjang.json'), JSON.stringify(Keranjang$), 'utf8', (err) => {
		if (err) {throw new Error(err)}
		console.log('file saved !!!');
	});
}

export function gets(): Keranjang[] {
	console.log('[db]Keranjang: gets');
	return Keranjang$.length === 0 ? [] : Keranjang$.slice()
		.filter(keranjang => {
			return keranjang.isi ? keranjang.isi.filter(isi => {
				return includes(Buku.gets().map(buku => buku.noIsbn), isi.noIsbn)
			}) : [] ;
		}).map(keranjang => {
			let _keranjang = Object.assign(keranjang, {$konsumen: Konsumen.get(keranjang.idKonsumen) })
			_keranjang.isi = _keranjang.isi ? _keranjang.isi.map(isi => {
				let _buku = Buku.get(isi.noIsbn)
				if ( _buku ) {
					return Object.assign(isi, {
						$buku: _buku,
						subtotal: isi.beli * _buku.harga
					})
				}
				return isi;
			}) : [];
			if ( keranjang.idPegawai ) {
				_keranjang = Object.assign(_keranjang, { $pegawai: Pegawai.get(keranjang.idPegawai) })
			}
			return _keranjang;
		});
}
export function get(id: string): Keranjang {
	console.log('[db]Keranjang: get');
	return gets().filter((keranjang: Keranjang) => keranjang.idKeranjang === id)[0];
}
export function add(keranjang: Keranjang): Keranjang {
	Keranjang$.unshift(Object.assign(keranjang, { idKeranjang: v4() }));
	save();
	return keranjang;
}
export function update(keranjang: Keranjang): Keranjang {
	console.log('[db]Keranjang: update');
	let _keranjang;
	for(let i in Keranjang$){
		if( Keranjang$[i].idKeranjang == keranjang.idKeranjang ){
			_keranjang = Keranjang$[i] = keranjang;
		}
	}
	save();
	return _keranjang;
}
export function remove(id: string): Keranjang {
	console.log('[db]Keranjang: remove');
	Keranjang$ = Keranjang$.filter((keranjang: Keranjang) => {
		return id !== keranjang.idKeranjang;
	});
	save();
	return get(id);
}
export function uuid(): string {
	return v4();
}
