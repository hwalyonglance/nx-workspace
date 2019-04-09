import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { XConfigService } from '../../services';

@Component({
	selector: 'x-topnav',
	template: `
		<mat-toolbar color='primary'>
			<!-- <button class='no-border-radius' (click)='$iconClick$.next()' mat-button mat-icon-button>
				<mat-icon>menu</mat-icon>
			</button> -->
			<span class='pointer' routerLink='/'>{{ $_xConfig.appName }}</span>
			<span class='flex-auto'></span>
			<ng-content></ng-content>
		</mat-toolbar>
	`,
	styles: []
})
export class XTopnavComponent implements OnInit {
	@Output() $iconClick$: EventEmitter<any> = new EventEmitter<any>();
	constructor(
		public $_xConfig: XConfigService
	) {}
	ngOnInit() {}
}
