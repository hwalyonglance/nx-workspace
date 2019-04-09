import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Upload } from '../../classes/upload.class';

import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';

import { PenggunaId } from '../../interfaces/pengguna.interface';

@Component({
	selector: "pp2-dry-penggunaForm",
	templateUrl: "_pengguna-form.component.html",
	styles: [`
		.pp2-dry-penggunaForm-container{
			height: 100%;
			width: 100%;
		}
	`]
})
export class _PenggunaFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;

	cities: string[] = ['Bandung', 'Cirebon', 'Jakarta', 'Padang'];
	get disable() { return !this.penggunaForm.valid; }
	label: string;
	penggunaForm: FormGroup;
	sembunyikan = false;
	type: 'tambah' | 'ubah';
	private _pt = 'password';
	get pt() {
		return this._pt;
	}
	set pt(val) {
		this._pt = val;
		setTimeout(() => {
			this._pt = 'password';
		}, 100)
	}
	$_pp2Upload: UploadService = new UploadService(this.$_ngfFirestore);
	$_pp2Database: DatabaseService<PenggunaId> = new DatabaseService(this.$_ngfFirestore);

	constructor(
		private $_matSnackBar: MatSnackBar,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ngfFirestore: AngularFirestore,
		private $_pp2Config: ConfigService,
	) {
		this.$_pp2Database.table = 'pengguna';
		this.$_pp2Upload.basePath = 'pengguna';
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Daftar Akun Baru' : 'Ubah Data Akun';
	}
	ngAfterViewInit() {
		this.C_Pp2_Dry_FI.change.subscribe((e) => {
			this.$_pp2Upload.selectedFiles = this.C_Pp2_Dry_FI.file;
			this.$_pp2Upload.currentUpload = new Upload(this.$_pp2Upload.selectedFiles.item(0));
		})
	}
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.penggunaForm = this.$_ngFormBuilder.group(this.penggunaFormObject());
		this.C_Pp2_Dry_FI.img.nativeElement.src = '/assets/img/placeholder-pengguna.png';
		if ( id ) {
			this.$_pp2Database.$data$.subscribe(($pengguna) => {
				const pengguna = $pengguna.filter((pengguna: PenggunaId) => pengguna.id == id)[0]
				this.penggunaForm.setValue(this.penggunaFormObject(pengguna))
				this.C_Pp2_Dry_FI.img.nativeElement.src = pengguna.image;
			})
		}
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	penggunaFormObject(pengguna: PenggunaId = {}){
		return {
			id: pengguna.id || [''],
			nama: pengguna.nama || [''],
			username: pengguna.username || [''],
			password: pengguna.password || [''],
			noKTP: pengguna.noKTP || [''],
			noHP: pengguna.noHP || [''],
			jk: pengguna.jk || [''],
			email: pengguna.email || [''],
			alamat: pengguna.alamat || [''],
			image: pengguna.image || [''],
			createdAt: pengguna.createdAt || ['0'],
			updatedAt: pengguna.updatedAt || ['0']
		}
	}
	pp2OnSubmit(e: Event, pengguna: PenggunaId): void {
		e.preventDefault();
		if ( this.type == 'tambah' || (this.type == 'ubah' && this.C_Pp2_Dry_FI.fileExist) ) {
			this.$_pp2Upload.$upload$.subscribe((e: Upload)=>{
				delete pengguna.id;
				this.$_pp2Database.create(Object.assign(pengguna, { image: e.url }));
				this.$_pp2Upload.$upload$.unsubscribe()
			})
			let image = this.$_pp2Upload.pushUpload();
		} else if ( this.type == 'ubah' && !this.C_Pp2_Dry_FI.fileExist ) {
			const {id} = pengguna;
			delete pengguna.id;
			this.$_pp2Database.update(id, pengguna)
		}
	}
}
