import { Component, isDevMode, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'pp2-dry-nav',
	templateUrl: '_nav.component.html',
	styles: [``]
})
export class _NavComponent implements OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	isDevMode = isDevMode;
	links: { url: string, text: string }[] = [];
	constructor() { }

	ngOnInit() {
		this.links = [
			{ url: '/', text: 'Home' },
			{ url: '/dev', text: 'Dev' }
		]
	}
}
