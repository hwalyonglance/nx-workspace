import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PegawaiAuthChildrenService } from '../../services';

@Component({
	selector: 'pegawai-topnav',
	templateUrl: './pegawai-topnav.component.html',
	styles: [],
	host:{
		class:'pegawai-topnav'
	}
})
export class PegawaiTopnavComponent implements OnInit {
	constructor(
		private $_ilmPegawaiAuthChildren: PegawaiAuthChildrenService,
		private $_ngRouter: Router
	) {}
	ngOnInit() {}
	keluar(){
		this.$_ilmPegawaiAuthChildren.$pegawai = {};
		localStorage.removeItem('signInPegawai');
		this.$_ngRouter.navigate(['/'])
	}
}
