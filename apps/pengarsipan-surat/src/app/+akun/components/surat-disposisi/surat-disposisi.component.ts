import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'surat-disposisi',
	template: `
		<x-container>
			<div style='margin: 16px auto; width: 95%'>
				<disposisi-view-table></disposisi-view-table>
			</div>
		</x-container>
	`,
	styles: [],
	host: {
		class: 'surat-disposisi'
	}
})
export class SuratDisposisiComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
	submit(e) {
		console.log(e)
	}
}
