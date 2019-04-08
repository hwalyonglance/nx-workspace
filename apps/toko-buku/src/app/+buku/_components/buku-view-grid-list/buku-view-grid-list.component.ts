import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ConfigService, DatabaseService, truncate } from '../../../+x';

import { Buku } from '../../interfaces';

@Component({
	selector: 'buku-view-grid-list',
	templateUrl: './buku-view-grid-list.component.html',
	styles: []
})
export class BukuViewGridListComponent implements OnDestroy, OnInit {
	get Buku$_(){
		return this.kategori === '' ? this.$_ilmDatabase.data('buku') : this.$_ilmDatabase.data('buku').filter((buku: Buku) => buku.$kategori.kategori == this.kategori);
	}
	@Output() $pesan$: EventEmitter<any> = new EventEmitter<any>();
	kategori: string = '';
	constructor(
		private $_matSnackBar: MatSnackBar,
		private $_ngHttpClient: HttpClient,
		public $_ngRouter: Router,
		private $_ilmConfig: ConfigService,
		private $_ilmDatabase: DatabaseService
	) {
		this.$_ilmDatabase.pullDatas('buku')
	}
	ngOnDestroy(){}
	ngOnInit() {}
	substring(str: string){
		return truncate(str);
	}
	pesan(noIsbn: string){
		// if ( !localStorage['signInKonsumen'] ) {
		// 	this.$_ngRouter.navigate(['konsumen', 'masuk'])
		// 	this.$_matSnackBar.open('Harap Masuk Sebelum Memesan Buku.')
		// 	setTimeout(() => { this.$_matSnackBar.dismiss() }, 4000)
		// }else{
			this.$_ngRouter.navigate(['konsumen', 'keranjang', noIsbn]);
			this.$pesan$.next(noIsbn)
		// }
	}
}
