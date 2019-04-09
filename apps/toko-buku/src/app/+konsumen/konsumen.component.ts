import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'konsumen',
	template: `
		<konsumen-container>
			<div class="demo-nav-bar">
				<nav aria-label='konsumen navigation links' color='primary' mat-stretch-tabs mat-tab-nav-bar>
					<a mat-tab-link *ngFor="let tabLink of tabLinks; let i = index" [routerLink]="tabLink.link" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">
						{{tabLink.label}}
					</a>
				</nav>
				<router-outlet></router-outlet>
			</div>
		</konsumen-container>
	`,
	styles: []
})
export class KonsumenComponent implements OnInit {
	tabLinks = [
		{label: 'Keranjang', link: '/konsumen/keranjang'},
		// {label: 'Pembelian', link: '/konsumen/pembelian'}
	];
	constructor() {}
	ngOnInit() {}
}
