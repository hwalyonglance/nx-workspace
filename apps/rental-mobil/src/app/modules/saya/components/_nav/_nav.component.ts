import { Component, isDevMode, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Pengguna } from '../../../_dry/index';

@Component({
	selector: 'pp2-saya-nav',
	templateUrl: '_nav.component.html',
	styles: [``]
})
export class NavComponent_ implements OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	saya: Pengguna;
	isDevMode = isDevMode;
	constructor(
		public $_ngRouter: Router
	){}
	ngOnInit() {
		try{
			this.saya = JSON.parse(localStorage.ggPengguna);
		}catch(e){}
	}
	keluar(){
		localStorage.removeItem('ezPengguna')
		localStorage.removeItem('ggPengguna')
		localStorage.removeItem('masukPengguna')
		this.$_ngRouter.navigate([''])
	}
}
