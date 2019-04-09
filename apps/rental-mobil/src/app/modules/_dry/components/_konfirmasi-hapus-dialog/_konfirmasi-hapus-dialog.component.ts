import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'pp2-dry-konfirmasiHapusDialog',
	templateUrl: '_konfirmasi-hapus-dialog.component.html'
})
export class _KonfirmasiHapusDialogComponent implements OnInit {
	$btn$ = new EventEmitter<string>();
	constructor(
	    @Inject(MAT_DIALOG_DATA) public _dialogData: any,
		public $_matDialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>
	) {}
	ngOnInit() {}
}
