import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../+x';

@Component({
	selector: 'ilm-dev',
	templateUrl: './dev.component.html',
	styles: [`
		.demo-nav-bar, .demo-tab-group {
			border: 1px solid #e8e8e8;
			margin-bottom: 40px;
			.unicorn-dark-theme & {
				border-color: #464646;
			}
		}
		.demo-nav-bar {
			foo, bar, baz {
				display: block;
				padding: 12px;
			}
		}
		.demo-tab-group {
			flex-grow: 1;
		}
	`]
})
export class DevComponent implements OnInit {
	tabLinks = [
		{label: 'Foo', link: '/dev/foo'},
		{label: 'Bar', link: '/dev/bar'},
		{label: 'Baz', link: '/dev/baz'},
	];
	tabNavBackground: any = undefined;
	activeTabIndex = 0;
	addTabPosition = 0;
	gotoNewTabAfterAdding = false;
	createWithLongContent = false;
	constructor(
		private $_ilmDatabase: DatabaseService
		) {}
	ngOnInit() {}
}
