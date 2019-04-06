import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'x-sidenav',
	template: `
		<mat-nav-list>
			<mat-list-item *ngFor='let n of _nav' routerLink='/a/{{n}}'>{{n}}</mat-list-item>
		</mat-nav-list>
	`,
	styles: []
})
export class XSidenavComponent implements OnInit {
	_nav = [
		'akun',
		'disposisi',
		'masuk'
	];
	constructor() { }
	ngOnInit() {}
}
