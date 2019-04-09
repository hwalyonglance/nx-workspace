import { Component, OnInit } from '@angular/core';

import { ConfigService } from './modules/_dry/index';

@Component({
	selector: 'pp2-root',
	template: '<router-outlet></router-outlet>',
	styles: []
})
export class Pp2Component implements OnInit {
	title = 'pp2';
	constructor(
		private $_pp2Conf: ConfigService
	) {}
	ngOnInit() {}
}
