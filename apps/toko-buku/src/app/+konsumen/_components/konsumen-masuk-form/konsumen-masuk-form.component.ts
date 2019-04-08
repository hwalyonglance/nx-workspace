import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { includes } from 'lodash';

import { DatabaseService } from '../../../+x';

import { Konsumen } from '../../interfaces';

import { KonsumenAuthChildrenService } from '../../services';

@Component({
	selector: 'konsumen-masuk-form',
	templateUrl: './konsumen-masuk-form.component.html',
	styles: [],
	host:{
		class:'konsumen-masuk-form'
	}
})
export class KonsumenMasukFormComponent implements OnInit {
	get valid(){ return this.konsumenMasukForm.valid; }
	_passwordType: 'password' | 'text' = 'password';
	_passwordSuffixTooltip: 'Tampilkan' | 'Sembunyikan' = 'Tampilkan';
	_passwordVisibility: 'visibility' | 'visibility_off' = 'visibility';
	konsumenMasukForm: FormGroup;
	get Konsumen$_(){ return this.$_ilmDatabase.data('konsumen'); }
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_ilnKonsumenAuthChildren: KonsumenAuthChildrenService,
		private $_matSnackBar: MatSnackBar,
		private $_ngFormBuilder: FormBuilder,
		private $_ngRouter: Router
	) {
		this.$_ilmDatabase.pullDatas('konsumen');
		this.konsumenMasukForm = this.$_ngFormBuilder.group({
			// email: ['konsumen@domain.com'],
			// password: ['toko buku']
			email: [''],
			password: ['']
		})
	}
	ngOnInit() {}
	masuk(konsumen: Konsumen = this.konsumenMasukForm.value){
		this.$_ilmDatabase.pullDatas('konsumen');
		setTimeout(() => {
			const Konsumen_: Konsumen[] = this.Konsumen$_.filter((_konsumen: Konsumen) => {
				return (_konsumen.email == konsumen.email) && (_konsumen.password == konsumen.password)
			});
			if ( Konsumen_.length > 0 ) {
				this.$_ilnKonsumenAuthChildren.$konsumen = Konsumen_[0];
				localStorage['signInKonsumen'] = JSON.stringify(Konsumen_[0]);
				this.$_ngRouter.navigate(['konsumen', 'pembelian'])
				this.$_matSnackBar.open('Selamat Datang ' + Konsumen_[0].nama)
			} else {
				this.$_matSnackBar.open('Email atau Password Salah')
			}
			setTimeout(() => {
				this.$_matSnackBar.dismiss()
			}, 4000)
			this.konsumenMasukForm.reset({
				email: konsumen.email,
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
