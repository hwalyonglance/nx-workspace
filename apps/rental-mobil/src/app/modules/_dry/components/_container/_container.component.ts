import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

@Component({
	selector: 'pp2-dry-container',
	templateUrl: '_container.component.html',
	styles: [`
		.mat-sidenav-content{
			height: calc(100vh - 64px);
			position: fixed;
			top:64px;
			width:100vw;
		}
		@media (max-width: 600px) {
			.mat-sidenav-content{
				height: calc(100vh - 56px);
				top:56px;
			}
		}
	`]
})
export class _ContainerComponent implements OnInit {
	@ViewChild('C_Mat_Sidenav') C_Mat_Sidenav: MatSidenav;
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService
	) {}
	ngOnDestroy() {}
	ngOnInit() {}
}
