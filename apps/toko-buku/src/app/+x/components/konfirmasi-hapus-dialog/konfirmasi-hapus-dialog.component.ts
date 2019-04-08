import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'konfirmasi-hapus-dialog',
	templateUrl: './konfirmasi-hapus-dialog.component.html',
	styles: [],
	host: {
		class: 'konfirmasi-hapus-dialog'
	}
})
export class KonfirmasiHapusDialogComponent implements OnInit {
	$btn$ = new EventEmitter<string>();
	constructor(
		@Inject(MAT_DIALOG_DATA) public _dialogData: any,
		public $_matDialogRef: MatDialogRef<KonfirmasiHapusDialogComponent>
	) {}
	ngOnInit() {}
}
