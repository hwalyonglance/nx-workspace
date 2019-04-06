import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'surat-keluar',
	template: `
		<x-container>
			<div style='margin: 12px auto; width: 90%'>
				<surat-view-table tabel='keluar'></surat-view-table>
			</div>
		</x-container>
	`,
	styles: []
})
export class SuratKeluarComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}
