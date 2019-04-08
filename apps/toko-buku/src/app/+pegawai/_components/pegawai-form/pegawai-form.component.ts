import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DatabaseService, InputFileComponent } from '../../../+x';

import { Pegawai } from '../../interfaces';

@Component({
	selector: 'pegawai-form',
	templateUrl: './pegawai-form.component.html',
	styles: [],
	host:{
		class:'pegawai-form'
	}
})
export class PegawaiFormComponent implements OnInit {
	@ViewChild('inputFile') C_Ilm_X_InputFileComponent: InputFileComponent;

	get pegawai(){ return this.pegawaiForm.value; }
	get valid(){ return this.pegawaiForm.valid; }

	$aksi : 'Tambahkan' | 'Perbarui' = 'Tambahkan';
	$event$: EventEmitter<'perbarui' | 'simpan' | 'tutup'> = new EventEmitter<'perbarui' | 'simpan' | 'tutup'>();
	_passwordType: 'password' | 'text' = 'password';
	_passwordSuffixTooltip: 'Tampilkan' | 'Sembunyikan' = 'Tampilkan';
	_passwordVisibility: 'visibility' | 'visibility_off' = 'visibility';
	pegawaiForm: FormGroup;
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_matSnackBar: MatSnackBar,
		private $_ngFormBuilder: FormBuilder,
		private $_ngRouter: Router
	) {
		this.pegawaiForm = $_ngFormBuilder.group({
			idPegawai: [''],
			foto: [''],
			nama: [''],
			telepon: [''],
			jenisKelamin: ['Laki Laki'],
			email: [''],
			password: [''],
			akses: ['Kasir'],
			alamat: ['']
		})
	}
	ngOnInit() {}
	setPegawaiFoto(foto: string){
		this.pegawaiForm.get('foto').setValue(foto);
	}
	simpan(pegawai: Pegawai = this.pegawaiForm.value) {
		if ( this.$aksi === 'Tambahkan' ) {
			this.$_ilmDatabase.add('pegawai', pegawai, ()=>{
				this.$_matSnackBar.open('Akun Berhasil Terdaftar')
				setTimeout(() => {
					this.$_matSnackBar.dismiss()
				}, 4000)
			})
			this.$_ngRouter.navigate(['pegawai', 'masuk'])
		} else {
			this.$_ilmDatabase.update('pegawai', pegawai)
		}
		this.$event$.next('simpan')
	}
	togglePassword(){
		this._passwordType = this._passwordType == 'password' ? 'text' : 'password';
		this._passwordSuffixTooltip = this._passwordSuffixTooltip == 'Tampilkan' ? 'Sembunyikan' : 'Tampilkan';
		this._passwordVisibility = this._passwordVisibility == 'visibility' ? 'visibility_off' : 'visibility';
	}
}
