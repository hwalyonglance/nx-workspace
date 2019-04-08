import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { DatabaseService, InputFileComponent } from '../../../+x';

import { Konsumen } from '../../interfaces';

@Component({
	selector: 'konsumen-form',
	templateUrl: './konsumen-form.component.html',
	styles: [],
	host: {
		class:'konsumen-form'
	}
})
export class KonsumenFormComponent implements OnInit {
	@ViewChild('inputFile') C_Ilm_X_InputFileComponent: InputFileComponent;

	get valid(){ return this.konsumenForm.valid; }
	
	$aksi : 'Tambahkan' | 'Perbarui' = 'Tambahkan';
	$konsumen: Konsumen;
	$event$: EventEmitter<'perbarui' | 'simpan' | 'tutup'> = new EventEmitter<'perbarui' | 'simpan' | 'tutup'>();
	_disableId = false;
	_passwordType: 'password' | 'text' = 'password';
	_passwordSuffixTooltip: 'Tampilkan' | 'Sembunyikan' = 'Tampilkan';
	_passwordVisibility: 'visibility' | 'visibility_off' = 'visibility';
	konsumenForm: FormGroup;
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_matSnackBar: MatSnackBar,
		private $_ngFormBuilder: FormBuilder,
		private $_ngRouter: Router
	) {
		this.konsumenForm = $_ngFormBuilder.group({
			idKonsumen: [''], // PRIMARY KEY
			foto: ['', Validators.required],
			nama: [''],
			kodePos: [''],
			telepon: [''],
			jenisKelamin: ['Laki Laki'],
			email: [''],
			password: [''],
			alamat: [''],
			tanggalDaftar: ['']
		})
		this.$event$.subscribe((act) => {
			if ( act === 'perbarui' ) {
				this.konsumenForm.setValue({
					idKonsumen: this.$konsumen.idKonsumen,
					foto: this.$konsumen.foto,
					nama: this.$konsumen.nama,
					kodePos: this.$konsumen.kodePos,
					telepon: this.$konsumen.telepon,
					jenisKelamin: this.$konsumen.jenisKelamin,
					email: this.$konsumen.email,
					password: this.$konsumen.password,
					alamat: this.$konsumen.alamat,
					tanggalDaftar: this.$konsumen.tanggalDaftar
				})
				this.C_Ilm_X_InputFileComponent.image = this.$konsumen.foto;
				this._disableId = true;
			}
		})
	}
	ngOnInit() {}
	setKonsumenFoto(foto: string){ this.konsumenForm.get('foto').setValue(foto); }
	simpan(konsumen: Konsumen = this.konsumenForm.value) {
		if ( this.$aksi === 'Tambahkan' ) {
			this.$_ilmDatabase.add('konsumen', konsumen)
			this.$_matSnackBar.open('Akun Berhasil Terdaftar')
			setTimeout(() => {
				this.$_matSnackBar.dismiss()
			}, 4000)
			this.$_ngRouter.navigate(['konsumen', 'masuk'])
		} else {
			this.$_ilmDatabase.update('konsumen', konsumen)
		}
		this.$event$.next('simpan')
	}
	togglePassword(){
		this._passwordType = this._passwordType == 'password' ? 'text' : 'password';
		this._passwordSuffixTooltip = this._passwordSuffixTooltip == 'Tampilkan' ? 'Sembunyikan' : 'Tampilkan';
		this._passwordVisibility = this._passwordVisibility == 'visibility' ? 'visibility_off' : 'visibility';
	}
}
