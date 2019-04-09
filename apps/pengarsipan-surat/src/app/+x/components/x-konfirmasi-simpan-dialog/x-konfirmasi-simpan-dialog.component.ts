import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
	selector: 'x-konfirmasi-simpan-dialog',
	template: './x-konfirmasi-simpan-dialog.html',
	styles: []
})
export class XKonfirmasiSimpanDialogComponent implements OnInit {
	on: EventEmitter<string> = new EventEmitter<string>();
	constructor() {}
	ngOnInit() {}
}
