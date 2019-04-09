import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { KonsumenAuthChildrenService } from '../../services';

@Component({
	selector: 'konsumen-topnav',
	templateUrl: './konsumen-topnav.component.html',
	styles: []
})
export class KonsumenTopnavComponent implements OnInit {
	constructor(
		private $_ilmKonsumenAuthChildren: KonsumenAuthChildrenService,
		private $_ngRouter: Router
	) {}
	ngOnInit() {}
	keluar(){
		localStorage.removeItem('signInKonsumen')
		this.$_ilmKonsumenAuthChildren.$konsumen = {};
		this.$_ngRouter.navigate(['/'])
	}
}
