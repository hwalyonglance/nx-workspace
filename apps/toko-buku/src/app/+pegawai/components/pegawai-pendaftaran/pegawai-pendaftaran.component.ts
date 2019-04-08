import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pegawai-pendaftaran',
	template: `
		<div style='margin: 64px auto; width: 500px'>
			<pegawai-form></pegawai-form>
		</div>
	`,
	styles: []
})
export class PegawaiPendaftaranComponent implements OnInit {
	constructor() { }
	ngOnInit() {}
}
