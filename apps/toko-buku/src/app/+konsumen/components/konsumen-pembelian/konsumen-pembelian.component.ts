import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'konsumen-pembelian',
	template:`
		<div style='margin: 64px auto; width: 500px'>
			<buku-pembelian-view-table></buku-pembelian-view-table>
		</div>
	`,
	styles: []
})
export class KonsumenPembelianComponent implements OnInit {
	constructor(
	) {}
	ngOnInit() {}
}
