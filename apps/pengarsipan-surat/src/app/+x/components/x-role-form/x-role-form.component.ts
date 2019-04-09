import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { XFirebase } from '../../classes';
import { XFirebaseService } from '../../services';

@Component({
	selector: 'x-role-form',
	templateUrl: './x-role-form.component.html',
	host: {
		class: 'x-role-form'
	}
})
export class XRoleFormComponent implements OnInit {
	private _$db: XFirebase;
	@Input('btnSubmitText') _btnSubmitText_: string = 'Tambahkan';
	@Input('dialogData') _dialogData_: any = {};
	set dialogData(v){
		setTimeout(() => {
			if (this.roleForm) { this.roleForm.patchValue(v.role) }
		}, 10)
	}
	@Input('mode') _mode: 'add' | 'edit' = 'add';
	@Output() $on$: EventEmitter<string> = new EventEmitter();
	get valid(): boolean { return this.roleForm.valid; }
	get value(): any { return this.roleForm.value; }
	roleForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_xFirebase: XFirebaseService,
	) {
		this._$db = $_xFirebase.create('hakAkses');
		this.roleForm = $_ngFormBuilder.group({
			id: $_xFirebase.id,
			nama: ['', [Validators.maxLength(16), Validators.required]],
			level: [2, [Validators.max(1), Validators.required]],
			createdAt: [$_xFirebase.timestamp, Validators.required],
			updatedAt: [$_xFirebase.timestamp, Validators.required]
		})
	}
	ngOnInit() {}
	reset(id: string = this.$_xFirebase.id){
		this.roleForm.reset({
			id: id,
			nama: '',
			createdAt: this.value.createdAt,
			updatedAt: this.$_xFirebase.timestamp,
		});
	}
	submit(){
		const _role = this.value;
		this._$db.upsert(_role.id, _role).then(() => {
			this.$on$.next('close');
		})
	}
}

@Component({
	selector: 'x-role-form-dialog',
	template:`
		<x-form-toolbar ($on$)='$on$.next("close")'>{{ toolbarText }}</x-form-toolbar>
		<x-role-form [btnSubmitText]='btnSubmitText' [dialogData]='_$dialogData' ($on$)='$on$.next("close")'></x-role-form>
	`,
	host: {
		class:'x-role-form-dialog'
	}
})
export class XRoleFormDialogComponent {
	$on$: EventEmitter<any> = new EventEmitter<any>();
	get btnSubmitText(){ return this._$dialogData.mode == 'tambah' ? 'Tambahkan' : 'Perbarui' }
	get toolbarText(){ return this._$dialogData.mode == 'tambah' ? 'Tambah Hak Akses Baru' : 'Perbarui Hak Akses: ' + this._$dialogData.role.uid }
	constructor(
		@Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		public $_matDialogRef: MatDialogRef<XRoleFormComponent>
	){}
}
