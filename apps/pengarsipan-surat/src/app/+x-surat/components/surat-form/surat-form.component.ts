import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { includes } from 'lodash';

import { XFirebase, XFirebaseObject, XFirebaseService, XFormAutocomplete, XInputComponent } from '../../../+x';

import { Jenis$_ } from '../../consts';

@Component({
	selector: 'surat-form',
	templateUrl: './surat-form.component.html',
	styles: [],
	host: {
		class: 'surat-form'
	}
})
export class SuratFormComponent implements AfterViewInit, OnInit {
	private _$db: XFirebaseObject = {};
	private _$afterViewInit: boolean = false;

	@Input() inDisposisi: boolean = false;
	@Input('dialogData') _dialogData_: any = {};
	set dialogData(v){
		setTimeout(() => {
			if (this.suratForm) { this.suratForm.patchValue(v.surat) }
		}, 10)
	}
	@Input('btnSubmitText') _btnSubmitText_: string = 'Tambahkan';
	@Input() tabel: 'keluar' | 'masuk' = 'keluar';
	@Input() submitText: string = '';
	@Output() $on$: EventEmitter<string> = new EventEmitter<string>();
	@ViewChild(XInputComponent) C_XInput: XInputComponent;
	get id(){ return this.suratForm.value.id_autocomplete }
	get Surat$_(){ return this._$db.surat.docs(); }
	get Jenis$_(): string[] { return Jenis$_; };
	get valid(){ return this.suratForm.valid && this.value.photo.base64 != ''; }
	get value(){ return this.suratForm.value; }
	_$tglMaxDate = new Date();
	_$Rules: {[key: string]: any} = {
		id: { maxLength: 20 },
		tabel: { maxLength: 6 },
		jenisId: { maxLength: 20 },
		noSurat: { maxLength: 20 },
		noAgenda: { maxLength: 20 },
		pengirim: { maxLength: 20 },
		kepada: { maxLength: 20 },
		perihal: { maxLength: 20 },
		tglKirim: { max: new Date() },
		tglTerima: { max: new Date() }
	}
	_$Validator: {[key: string]: any} = {
		tabel: [
			Validators.maxLength(this._$Rules.tabel),
			Validators.required
		],
		jenisId: [
			Validators.maxLength(this._$Rules.jenisId),
			Validators.required
		],
		noSurat: [
			Validators.maxLength(this._$Rules.noSurat),
			Validators.required
		],
		noAgenda: [
			Validators.maxLength(this._$Rules.noAgenda),
			Validators.required
		],
		pengirim: [
			Validators.maxLength(this._$Rules.pengirim),
			Validators.required
		],
		kepada: [
			Validators.maxLength(this._$Rules.kepada),
			Validators.required
		],
		perihal: [
			Validators.maxLength(this._$Rules.perihal),
			Validators.required
		]
	}
	photo = {
		base64: '',
		URL: '',
		name: ''
	};
	suratForm: FormGroup;
	suratForm_photo: any = {};
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.surat = $_xFirebase.create('surat');
		this._$db.photoSurat = $_xFirebase.create('photoSurat');
		this.suratForm = $_ngFormBuilder.group({
			id: [this._$db.surat.id],
			photo: [this.photo],
			tabel: [this.tabel, Validators.required],
			jenisId: [this.inDisposisi ? '' : 0, Validators.required],
			noSurat: ['', Validators.required],
			noAgenda: ['', Validators.required],
			pengirim: ['', [Validators.maxLength(32), Validators.required]],
			kepada: ['', Validators.maxLength(32)],
			perihal: ['', [Validators.maxLength(32), Validators.required]],
			tglKirim: ['', [Validators.maxLength(16), Validators.required]],
			tglTerima: [new Date()],
			createdAt: [$_xFirebase.timestamp, Validators.required],
			updatedAt: [$_xFirebase.timestamp, Validators.required]
		});
		this.$on$.subscribe(() => {this.reset();})
	}
	ngAfterViewInit(){
		this._$afterViewInit = true;
		this.C_XInput.$change$.subscribe((data) => {
			this.suratForm_photo = data;
			this.suratForm.get('photo').patchValue({
				base64: data.base64,
				URL: this.suratForm.get('photo').value.URL,
				name: this.suratForm.get('photo').value.name
			})
			this.storePhoto();
		})
	}
	ngOnInit() {}
	finish(){
		this.inDisposisi ? this.$on$.next('next') : this.submit() ;
	}
	reset(id: string = this._$db.surat.id){
		this.suratForm.reset({
			id: id,
			photo: [this.photo],
			tabel: this._dialogData_.tabel,
			jenisId: this.inDisposisi ? '' : 0,
			noSurat: '',
			noAgenda: '',
			pengirim: '',
			perihal: '',
			tglKirim: new Date(),
			tglTerima: new Date(),
			createdAt: this.value.createdAt,
			updatedAt: this.$_xFirebase.timestamp
		})
	}
	storePhoto(){
		const photo = this._$db.photoSurat.uploadFile(this.suratForm_photo.files[0])
		photo.downloadURL().subscribe((e) => {
			this.suratForm.get('photo').setValue({
				base64: this.suratForm_photo.base64,
				URL: e,
				name: this.suratForm.get('photo').value.name
			})
			this.suratForm_photo.URLFinish = true;
		})
		photo.snapshotChanges().subscribe((e) => {
			this.suratForm.get('photo').setValue({
				base64: this.suratForm_photo.base64,
				URL: this.suratForm.get('photo').value.URL,
				name: e.ref.name
			})
			this.suratForm_photo.nameFinish = true;
		})
	}
	submit() {
		this.storePhoto();
		this.suratForm.get('photo').valueChanges.subscribe(() => {
			if ( this.suratForm_photo.URLFinish && this.suratForm_photo.nameFinish ) {
				let _surat = this.value;
				if ( this._dialogData_.tabel != 'masuk' ){
					delete _surat.tglTerima;
				}
				this._$db.surat.upsert(this.value.id, this.value).then(() => {
					this.$on$.next('close');
				})
			}
		})
	}
}

@Component({
	selector: 'surat-form-dialog',
	template: `
		<x-form-toolbar ($on$)='$on$.emit("close")'>{{ toolbarText }}</x-form-toolbar>
		<surat-form ($on$)='$on$.emit("close")' tabel='keluar' [dialogData]='_$dialogData' [submitText]='btnSubmitText'></surat-form>
	`,
	host: {
		class: 'surat-form-dialog'
	}
})
export class SuratFormDialogComponent{
	get btnSubmitText(){ return this._$dialogData.mode == 'tambah' ? 'Tambahkan' : 'Perbarui' }
	get toolbarText(){ return this._$dialogData.mode == 'tambah' ? 'Tambah Surat Keluar' : 'Perbarui Surat Keluar' }
	$on$: EventEmitter<string> = new EventEmitter<string>();
	constructor(
		@Optional() @Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		private $_matDialogRef: MatDialogRef<SuratFormComponent>
	){}
}
