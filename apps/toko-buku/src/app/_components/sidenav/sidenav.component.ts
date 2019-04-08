import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../+x';

@Component({
	selector: 'sidenav',
	templateUrl: './sidenav.component.html',
	styles: [`
		.mat-list-item.active{
			background-color: #29B6F6 !important;
		}
	`],
	host: {
		class: 'sidenav'
	}
})
export class SidenavComponent implements OnInit {
	Kategori$_: any;
	constructor(
		private $_ilmDatabase: DatabaseService
	) {
		$_ilmDatabase.pullDatas('kategori', (res) => {
			this.Kategori$_ = res
		})
	}
	ngOnInit() {}
}
