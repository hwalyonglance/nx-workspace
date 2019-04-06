import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	host: {
		class: 'dashboard'
	}
})
export class DashboardComponent implements OnInit {
	constructor(
	) {}
	ngOnInit() {}
}
