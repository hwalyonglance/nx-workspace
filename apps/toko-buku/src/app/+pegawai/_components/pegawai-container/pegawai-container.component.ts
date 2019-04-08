import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
	selector: 'pegawai-container',
	template:`
		<mat-sidenav-container fullscreen>
			<!-- <mat-sidenav #C_Mat_Sidenav class='sidenav' [mode]='_mode' [opened]='_opened'>
				<pegawai-sidenav></pegawai-sidenav>
			</mat-sidenav> -->
			<mat-sidenav-content fxLayout='column'>
				<pegawai-topnav>
					<!-- <button (click)='toggleSidenav()' mat-button mat-icon-button><mat-icon>menu</mat-icon></button> -->
				</pegawai-topnav>
				<div class='flex-auto'>
					<ng-content></ng-content>
				</div>
				<foot></foot>
			</mat-sidenav-content>
		</mat-sidenav-container>
	`,
	styles: [],
	host:{
		class:'pegawai-container'
	}
})
export class PegawaiContainerComponent implements AfterViewInit, OnInit {
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
