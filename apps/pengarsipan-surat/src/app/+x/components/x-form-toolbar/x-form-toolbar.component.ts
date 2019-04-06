import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'x-form-toolbar',
	template: `
		<mat-toolbar>
			<span><ng-content></ng-content></span>
			<span fxFlex='auto'></span>
			<button class='no-border-radius' (click)='$on$.next("close")' color='warn' mat-raised-button mat-icon-button matTooltip='Tutup Form'>
				<mat-icon>close</mat-icon>
			</button>
		</mat-toolbar>
	`,
	styles: [],
	host: {
		class: 'x-form-toolbar'
	}
})
export class XFormToolbarComponent implements OnInit {
	@Output() $on$: EventEmitter<any> = new EventEmitter<any>();
	constructor() { }
	ngOnInit() {}
}
