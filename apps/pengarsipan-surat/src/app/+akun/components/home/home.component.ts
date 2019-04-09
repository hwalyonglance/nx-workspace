import { Component, OnInit } from '@angular/core';

// import { AuthService } from '../../services';

@Component({
	selector: 'home',
	template: `
		<x-container>
			<div style='margin: 12px auto; width: 90%'>
				hello
			</div>
		</x-container>
	`,
	host: {
		class: 'home'
	}
})
export class HomeComponent implements OnInit {
	constructor(
		// private $_xAuthService: AuthService
	) {}
	ngOnInit() {}
}
// <dashboard *ngIf='$_xAuthService.user'></dashboard>
// 				<sign-in *ngIf='!$_xAuthService.user'></sign-in>
