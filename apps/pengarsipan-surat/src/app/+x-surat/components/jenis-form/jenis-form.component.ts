import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { XFirebase, XFirebaseService } from '../../../+x';

@Component({
	selector: 'jenis-form',
	templateUrl: './jenis-form.component.html'
})
export class JenisFormComponent implements OnInit {
	private _$db: XFirebase;
	@Input('btnSubmitText') _btnSubmitText_: string = 'Tambahkan';
	@Input('dialogData') _dialogData_: any = {};
	set dialogData(v){
		setTimeout(() => {
			if (this.jenisForm) { this.jenisForm.patchValue(v.jenis) }
		}, 10)
	}
	@Output() $on$: EventEmitter<string> = new EventEmitter();
	get valid(): boolean { return this.jenisForm.valid; }
	get value(): any { return this.jenisForm.value; }
	jenisForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_xFirebase: XFirebaseService,
	) {
		this._$db = $_xFirebase.create('jenisSurat');
		this.jenisForm = $_ngFormBuilder.group({
			id: $_xFirebase.id,
			nama: ['', [Validators.maxLength(16), Validators.required]],
			createdAt: [$_xFirebase.timestamp, Validators.required],
			updatedAt: [$_xFirebase.timestamp, Validators.required]
		});
	}
	ngOnInit() {}
	reset(id: string = this.$_xFirebase.id){
		this.jenisForm.reset({
			id: id,
			nama: '',
			createdAt: this.value.createdAt,
			updatedAt: this.$_xFirebase.timestamp,
		});
	}
	submit(){
		const _jenis = this.value;
		this._$db.upsert(_jenis.id, _jenis).then(() => {
			this.$on$.next('close');
		})
	}
}

@Component({
	selector: 'jenis-form-dialog',
	template:`
		<x-form-toolbar ($on$)='$on$.next("close")'>{{ toolbarText }}</x-form-toolbar>
		<jenis-form [btnSubmitText]='btnSubmitText' [dialogData]='_$dialogData' mode='_$dialogData.edit' ($on$)='$on$.next("close")'></jenis-form>
	`,
	host: {
		class:'jenis-form-dialog'
	}
})
export class JenisFormDialogComponent {
	$on$: EventEmitter<any> = new EventEmitter<any>();
	get btnSubmitText(){ return this._$dialogData.mode == 'tambah' ? 'Tambahkan' : 'Perbarui' }
	get toolbarText(){ return this._$dialogData.mode == 'tambah' ? 'Tambah Jenis Surat' : 'Perbarui Jenis Surat: ' + this._$dialogData.role.uid }
	constructor(
		@Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		public $_matDialogRef: MatDialogRef<JenisFormComponent>
	){}
}
