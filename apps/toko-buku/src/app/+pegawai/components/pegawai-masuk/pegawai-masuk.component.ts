import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'pegawai-masuk',
	template: `
		<div style='margin: 64px auto; width: 500px'>
			<pegawai-masuk-form></pegawai-masuk-form>
		</div>
	`,
	styles: []
})
export class PegawaiMasukComponent implements OnInit {
	constructor(
	) {}
	ngOnInit() {}
}
