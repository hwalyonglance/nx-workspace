import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSelect } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/filter';

import { _MobilFormComponent } from '../_mobil-form/_mobil-form.component';
import { _PenggunaFormComponent } from '../_pengguna-form/_pengguna-form.component';
import { _SupirFormComponent } from '../_supir-form/_supir-form.component';

import { MobilId } from '../../interfaces/mobil.interface';
import { PenggunaId } from '../../interfaces/pengguna.interface';
import { SupirId } from '../../interfaces/supir.interface';

import { DatabaseService } from '../../services/database.service';
import { ConfigService } from '../../services/config.service';
import { Pp2Service } from '../../services/pp2.service';

@Component({
	selector: 'pp2-dry-ubah',
	template: `
		<div class='pp2-dry-ubah'>
			<pp2-dry-mobilForm #C_Pp2_Dry_MobilForm *ngIf="jenis == 'mobil'">
				<mat-form-field class='full-width' [formGroup]='pilihMobilForm'>
					<mat-select #C_Mat_Select_Ubah_Mobil formControlName='data' placeholder='Pilih Mobil'>
						<mat-option *ngFor='let data of $_pp2Database.data' [value]='$_pp2.stringify(data)'>{{ data.nama }}</mat-option>
					</mat-select>
				</mat-form-field>
			</pp2-dry-mobilForm>
			<pp2-dry-penggunaForm #C_Pp2_Dry_PenggunaForm *ngIf="jenis == 'pengguna'">
				<mat-form-field class='full-width' [formGroup]='pilihPenggunaForm'>
					<mat-select #C_Mat_Select_Ubah_Pengguna formControlName='data' placeholder='Pilih Pengguna'>
						<mat-option *ngFor='let data of $_pp2Database.data' [value]='$_pp2.stringify(data)'>{{ data.nama }}</mat-option>
					</mat-select>
				</mat-form-field>
			</pp2-dry-penggunaForm>
			<pp2-dry-supirForm #C_Pp2_Dry_SupirForm *ngIf="jenis == 'supir'">
				<mat-form-field class='full-width' [formGroup]='pilihSupirForm'>
					<mat-select #C_Mat_Select_Ubah_Supir formControlName='data' placeholder='Pilih Supir'>
						<mat-option *ngFor='let data of $_pp2Database.data' [value]='$_pp2.stringify(data)'>{{ data.nama }}</mat-option>
					</mat-select>
				</mat-form-field>
			</pp2-dry-supirForm>
		</div>
	`
})
export class _UbahComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Mat_Select_Ubah_Mobil') C_Mat_Select_Ubah_Mobil: MatSelect;
	@ViewChild('C_Mat_Select_Ubah_Pengguna') C_Mat_Select_Ubah_Pengguna: MatSelect;
	@ViewChild('C_Mat_Select_Ubah_Supir') C_Mat_Select_Ubah_Supir: MatSelect;
	@ViewChild('C_Pp2_Dry_MobilForm') C_Pp2_Dry_MobilForm: _MobilFormComponent;
	@ViewChild('C_Pp2_Dry_PenggunaForm') C_Pp2_Dry_PenggunaForm: _PenggunaFormComponent;
	@ViewChild('C_Pp2_Dry_SupirForm') C_Pp2_Dry_SupirForm: _SupirFormComponent;

	jenis: 'mobil' | 'pengguna' | 'supir' | null | undefined = 'mobil';
	id = '';
	pilihMobilForm: FormGroup;
	pilihPenggunaForm: FormGroup;
	pilihSupirForm: FormGroup;
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngRouter: Router,
		public $_pp2Database: DatabaseService<MobilId | PenggunaId | SupirId>,
		public $_pp2: Pp2Service
	) {
		try{
			this.id = this.$_ngActivatedRoute.params['value']['id'] || '';
			this.jenis = this.$_ngActivatedRoute.data['value']['jenis'] || 'mobil';
		}catch(e){
			console.log('error ', e)
		}
		this.jenis = this.$_ngActivatedRoute.data['value']['jenis'];
		$_pp2Database.table = this.jenis;
	}
	ngAfterViewInit(){
		if (this.jenis === 'mobil') {
			setTimeout(() => {
				this.C_Pp2_Dry_MobilForm.sembunyikan = true;
				if ( this.id != '' ) {
					this.C_Pp2_Dry_MobilForm.sembunyikan = false;
					const mobil: MobilId = this.$_pp2Database.data.filter(mobil => mobil.id == this.id)[0]
					this.mobilSetValue(mobil)
					this.pilihMobilForm.get('data').setValue( JSON.stringify(mobil) )
				}
			}, 10)
			this.C_Mat_Select_Ubah_Mobil.valueChange.subscribe((mobil: string) => {
				this.C_Pp2_Dry_MobilForm.sembunyikan = false;
				const _mobil: MobilId = JSON.parse(mobil);
				this.mobilSetValue(_mobil);
					this.$_ngRouter.navigate(['pengurus', 'mobil', 'ubah', _mobil.id])
			})
		}else if (this.jenis === 'pengguna'){
			setTimeout(() => {
				this.C_Pp2_Dry_PenggunaForm.sembunyikan = true;
				if ( this.id != '' ) {
					this.C_Pp2_Dry_PenggunaForm.sembunyikan = false;
					const pengguna: PenggunaId = this.$_pp2Database.data.filter(pengguna => pengguna.id == this.id)[0]
					this.penggunaSetValue(pengguna)
					this.pilihPenggunaForm.get('data').setValue( JSON.stringify(pengguna) )
				}
			}, 10)
			this.C_Mat_Select_Ubah_Pengguna.valueChange.subscribe((pengguna: string) => {
				this.C_Pp2_Dry_PenggunaForm.sembunyikan = false;
				const _pengguna: PenggunaId = JSON.parse(pengguna);
				this.penggunaSetValue(_pengguna);
					this.$_ngRouter.navigate(['pengurus', 'pengguna', 'ubah', _pengguna.id])
			})
		}else{
			setTimeout(() => {
				this.C_Pp2_Dry_SupirForm.sembunyikan = true;
				if ( this.id != '' ) {
					this.C_Pp2_Dry_SupirForm.sembunyikan = false;
					const supir: SupirId = this.$_pp2Database.data.filter(supir => supir.id == this.id)[0]
					this.supirSetValue(supir)
					this.pilihSupirForm.get('data').setValue( JSON.stringify(supir) )
				}
			}, 10)
			this.C_Mat_Select_Ubah_Supir.valueChange.subscribe((supir: string) => {
				this.C_Pp2_Dry_SupirForm.sembunyikan = false;
				const _supir: SupirId = JSON.parse(supir);
				this.supirSetValue(_supir);
					this.$_ngRouter.navigate(['pengurus', 'supir', 'ubah', _supir.id])
			})
		}
	}
	ngOnInit() {
		this.pilihMobilForm = this.$_ngFormBuilder.group({ data: [''] })
		this.pilihPenggunaForm = this.$_ngFormBuilder.group({ data: [''] })
		this.pilihSupirForm = this.$_ngFormBuilder.group({ data: [''] })
	}
	mobilSetValue(mobil: MobilId){
		this.C_Pp2_Dry_MobilForm.sembunyikan = false;
		this.C_Pp2_Dry_MobilForm.mobilForm.setValue({
			Id: mobil.id,
			nama: mobil.nama,
			platNo: mobil.platNo,
			kursi: mobil.kursi,
			bensin: mobil.bensin,
			hargaSewa: mobil.hargaSewa,
			image: mobil.image,
			kondisi: mobil.kondisi,
			_status: mobil._status,
			_disewa: mobil._disewa,
			_disewaSampai: mobil._disewaSampai,
			createdAt: mobil.createdAt,
			updatedAt: mobil.updatedAt
		})
		this.C_Pp2_Dry_MobilForm.C_Pp2_Dry_FI.img.nativeElement.src = mobil.image;
	}
	penggunaSetValue(pengguna: PenggunaId){
		this.C_Pp2_Dry_PenggunaForm.sembunyikan = false;
		this.C_Pp2_Dry_PenggunaForm.penggunaForm.setValue({
			Id: pengguna.id,
			nama: pengguna.nama,
			username: pengguna.username,
			password: pengguna.password,
			noKTP: pengguna.noKTP,
			noHP: pengguna.noHP,
			jk: pengguna.jk,
			email: pengguna.email,
			alamat: pengguna.alamat,
			image: pengguna.image,
			createdAt: pengguna.createdAt,
			updatedAt: pengguna.updatedAt
		})
		this.C_Pp2_Dry_PenggunaForm.C_Pp2_Dry_FI.img.nativeElement.src = pengguna.image;
	}
	supirSetValue(supir: SupirId){
		this.C_Pp2_Dry_SupirForm.sembunyikan = false;
		this.C_Pp2_Dry_SupirForm.supirForm.setValue({
			Id: supir.id,
			nama: supir.nama,
			noSIM: supir.noSIM,
			jk: supir.jk,
			noHP: supir.noHP,
			hargaSewa: supir.hargaSewa,
			alamat: supir.alamat,
			email: supir.email,
			image: supir.image,
			_status: supir._status,
			_disewa: supir._disewa,
			_disewaSampai: supir._disewaSampai,
			createdAt: supir.createdAt,
			updatedAt: supir.updatedAt
		})
		this.C_Pp2_Dry_SupirForm.C_Pp2_Dry_FI.img.nativeElement.src = supir.image
	}
}
