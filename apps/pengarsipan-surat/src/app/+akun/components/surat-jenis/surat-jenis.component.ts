import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'surat-jenis',
	template: `
		<x-container>
			<h1>Surat Jenis</h1>
			<div style='margin: 16px auto; width: 95%'>
				<jenis-form ($submit$)='submit($event)'></jenis-form>
				<br><br>
				<jenis-view-table></jenis-view-table>
			</div>
		</x-container>
	`
})
export class SuratJenisComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
	submit(e){

	}
}
