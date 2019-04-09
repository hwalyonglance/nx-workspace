import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { XAkunFormComponent, XFirebase, XFirebaseService, XFormAutocomplete } from '../../../+x';

import { SuratFormComponent } from '../surat-form/surat-form.component';

@Component({
	selector: 'disposisi-form',
	templateUrl: './disposisi-form.component.html',
	styles: [``]
})
export class DisposisiFormComponent implements AfterViewInit, OnInit {
	@Input('btnSubmitText') _btnSubmitText_: string = 'Tambahkan';
	@Input('dialogData') _dialogData_: any = {};
	set dialogData(v){
		// setTimeout(() => {
			// if (this.disposisiForm) { this.suratForm.patchValue(v.surat) }
		// }, 10)
	}
	@Input() submitText: string = '';
	@Output() $on$: EventEmitter<string> = new EventEmitter<string>();
	@ViewChild(XAkunFormComponent) C_XAkunForm: XAkunFormComponent;
	@ViewChild(SuratFormComponent) C_SuratForm: SuratFormComponent;

	get valid(){ return this.C_SuratForm.valid && this.C_XAkunForm.valid && this.disposisiForm.valid }
	get value(){ return this.disposisiForm.value }
	$submit$: EventEmitter<any> = new EventEmitter<any>();
	_$db: {[key: string]: XFirebase} = {}
	_$Rules: {[key: string]: any} = {
		id: {
			maxLength: 20
		},
		no: {
			maxLength: 15
		},
		statusSurat: {
			maxLength: 15
		},
		keterangan: {
			maxLength: 30
		},
		tanggapan: {
			maxLength: 30
		}
	};
	_$Validators: {[key: string]: any} = {
		statusSurat: [
			Validators.maxLength(this._$Rules.statusSurat.maxLength)
		],
		keterangan: [
			Validators.maxLength(this._$Rules.keterangan.maxLength)
		],
		tanggapan: [
			Validators.maxLength(this._$Rules.tanggapan.maxLength)
		]
	};
	disposisiForm: FormGroup;
	loading: boolean = false;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.akun = this.$_xFirebase.create('akun');
		this._$db.disposisi = this.$_xFirebase.create('disposisi');
		this._$db.surat = this.$_xFirebase.create('surat');

		this.disposisiForm = $_ngFormBuilder.group({
			id: [$_xFirebase.id], // primary key
			akun_email: ['', Validators.required],
			surat_id: ['', Validators.required],
			no: ['', this._$Validators.no],
			statusSurat: ['', this._$Validators.statusSurat],
			keterangan: ['', this._$Validators.keterangan],
			tanggapan: ['', this._$Validators.tanggapan]
		});
	}
	ngAfterViewInit(){
		this.C_XAkunForm.akunForm.valueChanges.subscribe(v => this.disposisiForm.patchValue({ akun_email: v }))
		this.C_SuratForm.suratForm.valueChanges.subscribe(v => this.disposisiForm.patchValue({ surat_id: v }))
	}
	ngOnInit() {}
	submit(){
		this.loading = true;
		this._$db.surat.upsert(this.C_SuratForm.value.id, this.C_SuratForm.value).then(() => {
			this._$db.disposisi.upsert(this.value.id, {
				...this.value,
				surat_id: this.C_SuratForm.value.id,
				akun_email: this.C_XAkunForm.value.email
			}).then(() => {
				this.C_SuratForm.reset();
				this.C_XAkunForm.reset();
				this.$on$.next('close')
			})
		})
	}
}

@Component({
	selector: 'disposisi-form-dialog',
	template: `
		<x-form-toolbar ($on$)='$on$.emit("close")'>{{ toolbarText }}</x-form-toolbar>
		<disposisi-form ($on$)='$on$.emit("close")' tabel='keluar' [dialogData]='_$dialogData' [submitText]='btnSubmitText'></disposisi-form>
	`,
	host: {
		class: 'disposisi-form-dialog'
	}
})
export class DisposisiFormDialogComponent{
	get btnSubmitText(){ return this._$dialogData.mode == 'tambah' ? 'Tambahkan' : 'Perbarui' }
	get toolbarText(){ return this._$dialogData.mode == 'tambah' ? 'Tambah Disposisi' : 'Perbarui Disposisi: ' + this._$dialogData.id }
	$on$: EventEmitter<string> = new EventEmitter<string>();
	constructor(
		@Optional() @Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		private $_matDialogRef: MatDialogRef<SuratFormComponent>
	){}
}
