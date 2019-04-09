import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ConfigService } from './config.service';

export type Table = 'buku' | 'kategori' | 'keranjang' | 'konsumen' | 'pegawai' | 'penerbit';

export type CallbackFn = (res: any) => void

@Injectable()
export class DatabaseService {
	$data$: EventEmitter<any> = new EventEmitter<any>();
	dataChange = {
		buku: new BehaviorSubject<any[]>([]),
		kategori: new BehaviorSubject<any[]>([]),
		keranjang: new BehaviorSubject<any[]>([]),
		konsumen: new BehaviorSubject<any[]>([]),
		pegawai: new BehaviorSubject<any[]>([]),
		penerbit: new BehaviorSubject<any[]>([])
	};
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_ilmConfig: ConfigService
	) {
		this.pullDatas('buku');
		this.pullDatas('kategori');
		this.pullDatas('keranjang');
		this.pullDatas('konsumen');
		this.pullDatas('pegawai');
		this.pullDatas('penerbit');
	}
	add<T>(table: Table, data: T, cb?: CallbackFn){
		this.$_ngHttpClient.post(this.$_ilmConfig.baseUrl + '/api/db/file/' + table + '/post', {data: JSON.stringify(data)})
			.subscribe((res) => {
				this.pullDatas(table);
				this.$data$.next()
				if (cb) { cb(Object.assign(res, { table })) }
			})
	}
	data<T>(table: Table): T[] {
		this.$data$.next()
		return this.dataChange[table].value.slice();
	}
	get<T>(table: Table, prop: string, val: string): T {
		this.$data$.next()
		return this.data[table].filter((data: T) => data[prop] == val)[0]
	}
	pullDatas(table: Table, cb?: CallbackFn){
		this.$_ngHttpClient.get(this.$_ilmConfig.baseUrl + '/api/db/file/' + table + '/gets').subscribe((res: any[]) =>{
				this.dataChange[table].next(res)
				this.$data$.next()
				if (cb) { cb(Object.assign(res, { table })) }
			})
	}
	remove(table: Table, $key: string, cb?: CallbackFn){
		this.$_ngHttpClient.delete(this.$_ilmConfig.baseUrl + '/api/db/file/' + table + '/delete/' + $key)
			.subscribe((res) => {
				this.$data$.next()
				this.pullDatas(table);
				if (cb) { cb(Object.assign(res, { table })) }
			})
	}
	update<T>(table: Table, data: T, cb?: CallbackFn){
		this.$_ngHttpClient.put(this.$_ilmConfig.baseUrl + '/api/db/file/' + table + '/put', {data: JSON.stringify(data)})
			.subscribe((res) => {
				this.pullDatas(table);
				this.$data$.next()
				if (cb) { cb(Object.assign(res, { table })) }
			})
	}
}
