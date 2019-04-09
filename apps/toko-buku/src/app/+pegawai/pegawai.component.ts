import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pegawai',
	template: `
		<pegawai-container>
			<div class="demo-nav-bar">
				<nav aria-label='pegawai navigation links' color='primary' mat-stretch-tabs mat-tab-nav-bar>
					<a mat-tab-link *ngFor="let tabLink of tabLinks; let i = index" [routerLink]="tabLink.link" routerLinkActive #rla="routerLinkActive" [active]="rla.isActive">
						{{tabLink.label}}
					</a>
				</nav>
				<router-outlet></router-outlet>
			</div>
		</pegawai-container>
	`,
	styles: []
})
export class PegawaiComponent implements OnInit {
	tabLinks = [
		{label: 'Penerbit', link: '/pegawai/penerbit'},
		{label: 'Kategori', link: '/pegawai/kategori'},
		{label: 'Buku', link: '/pegawai/buku'},
		{label: 'Keranjang', link: '/pegawai/keranjang'},
		{label: 'Pembelian', link: '/pegawai/pembelian'},
		{label: 'Pendaftaran', link: '/pegawai/pendaftaran'},
		{label: 'Masuk', link: '/pegawai/masuk'}
	];
	constructor() {}
	ngOnInit() {}
}
