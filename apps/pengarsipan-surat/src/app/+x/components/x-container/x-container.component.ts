import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { XAuthService } from '../../services';

@Component({
	selector: 'x-container',
	template: `
		<mat-sidenav-container fullscreen>
			<!-- <mat-sidenav #C_Mat_Sidenav class='sidenav' [mode]='_mode' [opened]='_opened'> -->
			<!-- <mat-sidenav #C_Mat_Sidenav class='sidenav' mode='over' [opened]='false'>
				<x-sidenav></x-sidenav>
			</mat-sidenav> -->
			<mat-sidenav-content fxLayout='column'>
				<x-topnav ($iconClick$)='toggleSidenav()'>
					<a *ngFor='let n of _nav' routerLink='{{ n.url }}' mat-button>{{ n.text }}</a>
					<a *ngIf='$_xAuth.akun_?.getValue() == null;' mat-button routerLink='/a/masuk'> Masuk </a>
					<a *ngIf='$_xAuth.akun_?.getValue() != null;' mat-button routerLink='/a/keluar'> Keluar </a>
				</x-topnav>
				<div class='container-content'>
					<ng-content></ng-content>
				</div>
				<div class='flex-auto'></div>
				<x-footer></x-footer>
			</mat-sidenav-content>
		</mat-sidenav-container>
	`,
	styles: [`
		.mat-sidenav{
			width: 300px;
		}
		.mat-sidenav-content{
			background-color: #B0BEC5;
		}
	`],
	host: {
		class: 'x-container'
	}
})
export class XContainerComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Mat_Sidenav') private C_Mat_Sidenav: MatSidenav;
	get _nav() {
		return [
			{ text: 'Akun', url: '/akun' },
			// { text: 'Jenis Surat', url: '/surat/jenis' },
			{ text: 'Surat Keluar', url: '/surat/keluar' },
			// { text: 'Surat Masuk', url: '/surat/masuk' },
			{ text: 'Disposisi', url: '/surat/disposisi' },
		]
	}
	_mq = this.$_cdkMediaMatcher.matchMedia('(min-width: 960px)');
	_mode = this._mq.matches ? 'side' : 'over';
	_opened = this._mq.matches;
	akun: any = false;
	constructor(
		private $_cdkMediaMatcher: MediaMatcher,
		public $_xAuth: XAuthService<any>
	) {
		this._mq['onchange'] = (e) => {
			this._mode = e.matches ? 'side' : 'over';
			this._opened = e.matches;
		}
		try{
			this.akun = JSON.parse(localStorage['akun'])
		}catch(e){
			this.akun = false;
		}
	}
	ngAfterViewInit(){}
	ngOnInit() {}
	toggleSidenav(){ this.C_Mat_Sidenav.toggle() }
}
