import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';

import { includes } from 'lodash';

import { XFirebase, XFirebaseObject, XFormAutocomplete, XFormPassword } from '../../classes';
import { XInputComponent } from '../x-input/x-input.component';
import { ROLES } from '../../consts';
import { Akun } from '../../interfaces';
import { XAuthService, XFirebaseService } from '../../services';

@Component({
	selector: 'x-akun-form',
	templateUrl: './x-akun-form.component.html',
	host:{
		class:'x-akun-form'
	}
})
export class XAkunFormComponent implements AfterViewInit, OnInit {
	private _$afterViewInit: boolean = false;
	private _$autoComplete_Akun: XFormAutocomplete<Akun<any>>;
	private _$db: XFirebaseObject = {};
	private _$photoURL: string = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';

	@Input() inDisposisi: boolean = false;
	@Input('dialogData') _dialogData_: any = {};
	set dialogData(v){
		setTimeout(() => {
			if (this.akunForm) { this.akunForm.patchValue(v.akun) }
		}, 10)
	}
	@Input('btnSubmitText') _btnSubmitText_: string = 'Tambahkan';
	@Output() $auth$: EventEmitter<Akun<any>> = new EventEmitter<Akun<any>>();
	@Output() $on$: EventEmitter<string> = new EventEmitter();
	@ViewChild(XInputComponent) C_XInput: XInputComponent;
	get Akun$_(){ return this._$db.akun.docs() as Akun<any>[]; }
	get _Akun$_(){ return this._$autoComplete_Akun.filteredOptions; }
	get uid(){ return this.akunForm.value.email_autocomplete }
	get valid(){ return this.akunForm.valid && this.value.photo.base64 != '' }
	get valid_disposisi(): boolean {
		let _akun = this.value;
		_akun = this.inDisposisi && includes(this.Akun$_.map(v => v.email), this.value.email_autocomplete);
		delete _akun['email_autocomplete'];
		return _akun;
	}
	get value(): Akun<any> | any {
		const _akun = this.akunForm.value;
		// delete _akun['email_autocomplete'];
		delete _akun['password_match'];
		delete _akun['role_autocomplete'];
		return _akun;
	}
	_$hakAkses: string[] = ROLES;
	_$password: XFormPassword = new XFormPassword();
	_$password_match: XFormPassword = new XFormPassword();
	_$Rules: {[key: string]: any } = {
		uid: { maxLength: 20 },
		email_autocomplete: { maxLength: 20 },
		photoId: { maxLength: 20 },
		photoURL: { maxLength: 256 },
		displayName: { maxLength: 32 },
		email: { maxLength: 32 },
		password: { maxLength: 20 },
		password_match: { maxLength: 20 },
		role: { maxLength: 20 },
		role_autocomplete: { maxLength: 20 }
	}
	akunForm: FormGroup;
	akunForm_photo;
	photo = {
		base64: '',
		URL: this._$photoURL,
		name: ''
	};
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_xFirebase: XFirebaseService,
		public $_xAuth: XAuthService<any>
	) {
		this._$db.akun = $_xFirebase.create('akun')
		this._$db.photoAkun = $_xFirebase.create('photoAkun')
		this.akunForm = $_ngFormBuilder.group({
			uid: [this.$_xFirebase.id, Validators.required],
			email_autocomplete: this.inDisposisi ? ['', Validators.required] : [''],
			photo: [this.photo, [ Validators.required ]],
			displayName: ['', [Validators.maxLength(32), Validators.required]],
			email: ['', [Validators.email, Validators.maxLength(32), Validators.required]],
			password: ['', [Validators.maxLength(16), Validators.minLength(6), Validators.required]],
			password_match: ['', [Validators.maxLength(16)]],
			role: [0, Validators.required],
			role_autocomplete: [0],
			createdAt: [$_xFirebase.timestamp, Validators.required],
			updatedAt: [$_xFirebase.timestamp, Validators.required]
		})
		this._$autoComplete_Akun = new XFormAutocomplete<any>(this.akunForm.get('email_autocomplete'), [])
		this._$db.akun._bsCol.subscribe(v => { this._$autoComplete_Akun.dataChange.next(v) })

		this.akunForm.get('email_autocomplete').valueChanges.subscribe(v => {
			const _Akun$_ = this.Akun$_.filter((akun) => akun.email == v);
			if (_Akun$_.length > 0) {
				this.akunForm.patchValue({
					uid: _Akun$_[0].uid,
					displayName: _Akun$_[0].displayName,
					email: _Akun$_[0].email,
					password: _Akun$_[0].password,
					password_match: _Akun$_[0].password,
					photo: _Akun$_[0].photo,
					role_autocomplete: this.hakAkses(_Akun$_[0].role)
				});
				if ( this._$afterViewInit ) {
					this.C_XInput.image = _Akun$_[0].photo.URL
				}
			} else {
				this.akunForm.patchValue({
					uid: '',
					displayName: '',
					email: '',
					password: '',
					password_match: '',
					photo: this.photo,
					role_autocomplete: ''
				})
				if ( this._$afterViewInit ) {
					this.C_XInput.image = this._$photoURL;
				}
			}
		})
	}
	ngAfterViewInit(){
		this._$afterViewInit = true;
		this.C_XInput.image = this._$photoURL;
		if ( this._dialogData_.mode == 'perbarui' ) {
			setTimeout(() => {
				const akun: Akun<any> = this._dialogData_.akun;
				this.akunForm.patchValue({
					uid: akun.uid,
					displayName: akun.displayName,
					photo: akun.photo,
					email: akun.email,
					password: akun.password,
					role: this.hakAkses(akun.role)
				});
				// this.C_XInput.image = akun.photoURL;
				this.C_XInput.fileExist = true;
			}, 1);
		}
		this.C_XInput.$change$.subscribe((e) => {
			this.akunForm_photo = e;
			this.akunForm.get('photo').setValue({
				base64: e.base64,
				URL: this.akunForm.get('photo').value.URL,
				name: this.akunForm.get('photo').value.name,
			});
		});
	}
	ngOnInit() {}
	hakAkses(i: number){
		return ROLES.filter((role, index) => {
			return i == index;
		})[0];
	}
	reset(uid: string = this._$db.akun.id){
		this.akunForm.reset({
			uid: uid,
			displayName:'',
			email: '',
			password: '',
			password_match: '',
			photo:this.photo,
			role_autocomplete:'',
			createdAt: this.value.createdAt,
			updatedAt: this.$_xFirebase.timestamp,
		});
	}
	storePhoto(){
		const photo = this._$db.photoAkun.uploadFile(this.akunForm_photo.files[0])
		// photo.downloadURL().subscribe(e => {
		photo.snapshotChanges().subscribe(e => {
			this.akunForm.get('photo').setValue({
				base64: this.akunForm_photo.base64,
				URL: e.downloadURL,
				name: this.akunForm.get('photo').value.name
			});
			this.akunForm_photo.URLFinish = true;
			const _akun = this.value;
			delete _akun['email_autocomplete'];
			delete _akun['password_match'];
			delete _akun['role_autocomplete'];
			this.$_xAuth.emailSignUp(_akun.email, _akun.password).then((e) => {
				this._$db.akun.upsert(e.uid, {..._akun, uid: e.uid}).then(() => {
					this.$on$.next('close');
				})
			})
		})
		photo.snapshotChanges().subscribe((e) => {
			this.akunForm.get('photo').setValue({
				base64: this.akunForm_photo.base64,
				URL: this.akunForm.get('photo').value.URL,
				name: e.ref.name
			})
			this.akunForm_photo.nameFinish = true;
		});
	}
	submit(){
		this.storePhoto()
	}
}

@Component({
	selector: 'x-akun-form-dialog',
	template:`
		<x-form-toolbar ($on$)='$on$.next("close")'>{{ toolbarText }}</x-form-toolbar>
		<x-akun-form [btnSubmitText]='btnSubmitText' [dialogData]='_$dialogData' ($on$)='$on$.next("close")' mode='edit'></x-akun-form>
	`,
	host: {
		class:'x-akun-form-dialog'
	}
})
export class XAkunFormDialogComponent {
	$on$: EventEmitter<any> = new EventEmitter<any>();
	get btnSubmitText(){ return this._$dialogData.mode == 'tambah' ? 'Tambahkan' : 'Perbarui' }
	get toolbarText(){ return this._$dialogData.mode == 'tambah' ? 'Tambah Akun Baru' : 'Perbarui Akun: ' + this._$dialogData.akun.uid }
	constructor(
		@Inject(MAT_DIALOG_DATA) public _$dialogData: any,
		public $_matDialogRef: MatDialogRef<XAkunFormComponent>
	){}
}
