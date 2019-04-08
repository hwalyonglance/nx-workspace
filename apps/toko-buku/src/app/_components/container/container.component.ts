import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
	selector: 'container',
	template: `
		<mat-sidenav-container fullscreen>
			<mat-sidenav #C_Mat_Sidenav class='sidenav' [mode]='_mode' [opened]='_opened'>
				<sidenav></sidenav>
			</mat-sidenav>
			<mat-sidenav-content fxLayout='column'>
				<topnav>
					<button (click)='toggleSidenav()' mat-button mat-icon-button><mat-icon>menu</mat-icon></button>
				</topnav>
				<div class='container-content'>
					<ng-content></ng-content>
				</div>
				<div class='flex-auto'></div>
				<foot></foot>
			</mat-sidenav-content>
		</mat-sidenav-container>
	`,
	styles: [],
	host: {
		class: 'container'
	}
})
export class ContainerComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Mat_Sidenav') private C_Mat_Sidenav: MatSidenav;
	_mq = this.$_cdkMediaMatcher.matchMedia('(min-width: 960px)');
	_mode = this._mq.matches ? 'side' : 'over';
	_opened = this._mq.matches;
	constructor(
		private $_cdkMediaMatcher: MediaMatcher
	) {
		this._mq['onchange'] = (e) => {
			this._mode = e.matches ? 'side' : 'over';
			this._opened = e.matches;
		}
	}
	ngAfterViewInit(){}
	ngOnInit() {}
	toggleSidenav(){ this.C_Mat_Sidenav.toggle() }
}
