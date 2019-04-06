import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'not-found',
	template: `
		<x-container>
			activatedRoute: {{ $_ngActivatedRoute.url | async }} <br>
			$_ngRouter: {{ $_ngRouter.url }} <br>
		</x-container>
	`
})
export class NotFoundComponent implements OnInit {
	constructor(
		public $_ngActivatedRoute: ActivatedRoute,
		public $_ngRouter: Router
	) {}
	ngOnInit() {}
}
