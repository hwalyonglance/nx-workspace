import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'konsumen-pendaftaran',
	template: `
		<div style='margin: 64px auto; width: 500px'>
			<konsumen-form></konsumen-form>
		</div>
	`,
	styles: []
})
export class KonsumenPendaftaranComponent implements OnInit {
	constructor(
	) {}
	ngOnInit() {}
}
