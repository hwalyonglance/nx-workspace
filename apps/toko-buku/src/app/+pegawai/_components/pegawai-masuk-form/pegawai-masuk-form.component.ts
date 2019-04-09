import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { includes } from 'lodash';

import { DatabaseService } from '../../../+x';

import { Pegawai } from '../../interfaces';

import { PegawaiAuthChildrenService } from '../../services';

@Component({
	selector: 'pegawai-masuk-form',
	templateUrl: './pegawai-masuk-form.component.html',
	styles: [],
	host:{
		class:'pegawai-masuk-form'
	}
})
export class PegawaiMasukFormComponent implements OnInit {
	get valid(){ return this.pegawaiMasukForm.valid; }
	_passwordType: 'password' | 'text' = 'password';
	_passwordSuffixTooltip: 'Tampilkan' | 'Sembunyikan' = 'Tampilkan';
	_passwordVisibility: 'visibility' | 'visibility_off' = 'visibility';
	pegawaiMasukForm: FormGroup;
	get Pegawai$_(){ return this.$_ilmDatabase.data('pegawai'); }
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_ilmPegawaiAuthChildren: PegawaiAuthChildrenService,
		private $_matSnackBar: MatSnackBar,
		private $_ngFormBuilder: FormBuilder,
		private $_ngRouter: Router
	) {
		this.$_ilmDatabase.pullDatas('pegawai');
		this.pegawaiMasukForm = this.$_ngFormBuilder.group({
			email: [''],
			password: ['']
		})
	}
	ngOnInit() {}
	masuk(pegawai: Pegawai = this.pegawaiMasukForm.value){
		this.$_ilmDatabase.pullDatas('pegawai');
		setTimeout(() => {
			const Pegawai: Pegawai[] = this.Pegawai$_.filter((_pegawai: Pegawai) => {
				return (_pegawai.email == pegawai.email) && (_pegawai.password == pegawai.password)
			});
			if ( Pegawai.length > 0 ) {
				this.$_ilmPegawaiAuthChildren.$pegawai = Pegawai[0];
				localStorage['signInPegawai'] = JSON.stringify(Pegawai[0]);
				this.$_ngRouter.navigate(['pegawai', 'keranjang'])
				this.$_matSnackBar.open('Selamat Datang ' + Pegawai[0].nama)
			} else {
				this.$_matSnackBar.open('Email atau Password Salah')
			}
			setTimeout(() => {
				this.$_matSnackBar.dismiss()
			}, 4000)
			this.pegawaiMasukForm.reset({
				email: pegawai.email,
				password: ''
			})
		}, 1000)
	}
	togglePassword(){
		this._passwordType = this._passwordType == 'password' ? 'text' : 'password';
		this._passwordSuffixTooltip = this._passwordSuffixTooltip == 'Tampilkan' ? 'Sembunyikan' : 'Tampilkan';
		this._passwordVisibility = this._passwordVisibility == 'visibility' ? 'visibility_off' : 'visibility';
	}
}
