import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'x-loading',
	template: `
		<mat-progress-spinner color='primary' mode='indeterminate' diameter='250' strokeWidth='16' style='margin: 50px'></mat-progress-spinner>
	`,host: {
		style:`
			text-align: center;
			overflow: hidden !important;
		`
	}
})
export class LoadingComponent implements OnInit {
	constructor(
	    @Inject(MAT_DIALOG_DATA) public dialogData: any,
		public dialogRef: MatDialogRef<LoadingComponent>
	) {}
	ngOnInit(){}
}
