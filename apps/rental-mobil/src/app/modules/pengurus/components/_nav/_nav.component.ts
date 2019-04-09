import { Component, isDevMode, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'pp2-pengurus-nav',
	templateUrl: '_nav.component.html',
	styles: [``]
})
export class NavComponent_ implements OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	isDevMode = isDevMode;
	constructor(
		public $_ngRouter: Router
	){}
	ngOnInit() {}
	keluar(){
		localStorage.removeItem('masukPengurus')
		this.$_ngRouter.navigate([''])
	}
}
