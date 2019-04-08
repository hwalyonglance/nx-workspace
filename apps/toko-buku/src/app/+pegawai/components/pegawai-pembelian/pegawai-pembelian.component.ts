import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pegawai-pembelian',
	template: `
		<div style='margin: 64px auto; width: 95%'>
			<buku-pembelian-view-table></buku-pembelian-view-table>
		</div>
	`,
	styles: [],
	host: {
		class: 'pegawai-pembelian'
	}
})
export class PegawaiPembelianComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}
