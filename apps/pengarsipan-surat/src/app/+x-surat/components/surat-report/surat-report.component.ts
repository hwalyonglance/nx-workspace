import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { XFirebase, XFirebaseService } from '../../../+x';

@Component({
	selector: 'surat-report',
	templateUrl: './surat-report.component.html',
	host: {
		class: 'surat-report'
	}
})
export class SuratReportComponent implements OnInit {
	private _$db: {[key:string]: XFirebase} = {};
	get Jenis$_(): string[] {
		return ['Lamaran', 'Niaga', 'Perintah', 'Permohonan', 'Undangan']
	};
	get Surat$_(){ return this._$db.surat.docs(); }
	get valid(){ return this.suratReportForm.valid }
	get value(){ return this.suratReportForm.value }
	@Output() $on$: EventEmitter<any> = new EventEmitter<any>();
	_$tglMaxDate: Date = new Date();
	_$tglMinDate: Date = new Date(2018);
	suratReportForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.surat = $_xFirebase.create('surat');
		this.suratReportForm = $_ngFormBuilder.group({
			tglKirim_dari: [new Date(), Validators.required],
			tglKirim_sampai: [new Date(), Validators.required],
			tglTerima_dari: [(new Date()).toISOString(), Validators.required],
			tglTerima_sampai: [new Date(), Validators.required],
		})
	}
	ngOnInit() {}
	cetakPeriode(){
		this.$on$.next({
			cetak: 'periode',
			periode: {
				kd: this.timestamp(this.value.tglKirim_dari),
				ks: this.timestamp(this.value.tglKirim_sampai),
				td: this.timestamp(this.value.tglTerima_dari),
				ts: this.timestamp(this.value.tglTerima_sampai)
			}
		})
	}
	cetakSemua(){
		this.$on$.next({
			cetak: 'semua'
		})
	}
	timestamp(date: string): number {
		return new Date(date).getTime();
	}
}

@Component({
	selector: 'surat-report-dialog',
	template:`
		<x-form-toolbar ($on$)='$on$.next("close")'>Cetak surat</x-form-toolbar>
		<surat-report ($on$)='$on$.next($event)'></surat-report>
	`,
	host: {
		class:'surat-report-dialog'
	}
})
export class SuratReportDialogComponent {
	$on$: EventEmitter<any> = new EventEmitter<any>();
	constructor(
		@Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		public $_matDialogRef: MatDialogRef<SuratReportDialogComponent>
	){}
}
