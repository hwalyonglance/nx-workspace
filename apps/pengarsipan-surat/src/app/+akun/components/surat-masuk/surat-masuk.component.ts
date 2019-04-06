import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'surat-masuk',
	template: `
		<x-container>
			<div style='margin: 12px auto; width: 90%'>
				<surat-view-table tabel='masuk'></surat-view-table>
			</div>
		</x-container>
	`,
	styles: []
})
export class SuratMasukComponent implements OnInit {
	constructor() { }
	ngOnInit() {}
}
