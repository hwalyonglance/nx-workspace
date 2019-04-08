import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'konsumen-masuk',
	template: `
		<div style='margin: 64px auto; width: 500px'>
			<konsumen-masuk-form></konsumen-masuk-form>
		</div>
	`,
	styles: []
})
export class KonsumenMasukComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}
