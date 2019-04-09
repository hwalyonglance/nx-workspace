import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'ilm-home',
	templateUrl: './home.component.html',
	styles: [`
		@media (max-width: 992px) {
			.s2{
				display: none !important;
			}
		}
	`]
})
export class HomeComponent implements OnInit {
	constructor(
	) {}
	ngOnInit() {}
}
