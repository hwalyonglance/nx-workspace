import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'x-footer',
	template: `
		<p>
			<a href='https://github.com/hwalyonglance'>Rusman Wahab</a>
		</p>
	`,
	styles: []
})
export class XFooterComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}
