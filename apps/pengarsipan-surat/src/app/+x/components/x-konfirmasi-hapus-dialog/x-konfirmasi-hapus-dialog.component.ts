import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'x-konfirmasi-hapus-dialog',
	templateUrl: './x-konfirmasi-hapus-dialog.component.html',
	styles: [],
	host: {
		class: 'x-konfirmasi-hapus-dialog'
	}
})
export class XKonfirmasiHapusDialogComponent implements OnInit {
	$on$: EventEmitter<string> = new EventEmitter<string>();
	constructor(
		@Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		public $_matDialogRef: MatDialogRef<XKonfirmasiHapusDialogComponent>
	) {}
	ngOnInit() {}
}
