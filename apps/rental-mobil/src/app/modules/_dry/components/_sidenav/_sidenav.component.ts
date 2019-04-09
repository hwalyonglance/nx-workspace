import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pp2-dry-sidenav',
	templateUrl: '_sidenav.component.html'
})

export class _SidenavComponent implements OnInit {
	links: { url: string, text: string }[] = [];
	constructor() {}
	ngOnInit() {
		this.links = [
			{ url: '/', text: 'Home' },
			{ url: '/dev', text: 'Dev' },
			{ url: '/masuk', text: 'Masuk' },
			{ url: '/pengurus', text: 'Pengurus' },
			{ url: '/saya', text: 'Saya' },
			{ url: '/saya/sewa', text: 'Sewa' },
		]
	}
}
