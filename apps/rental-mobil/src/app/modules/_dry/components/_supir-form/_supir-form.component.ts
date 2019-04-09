import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Upload } from '../../classes/upload.class';

import { _FileImageComponent } from '../../components/_file-image/_file-image.component';

import { SupirId } from '../../interfaces/supir.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';

@Component({
	selector: "pp2-dry-supirForm",
	templateUrl: "_supir-form.component.html",
	styles: [``]
})
export class _SupirFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;

	get disable() { return !this.supirForm.valid; }

	$_pp2Upload: UploadService = new UploadService(this.$_ngfFirestore);
	$_pp2Database: DatabaseService<SupirId> = new DatabaseService<SupirId>(this.$_ngfFirestore);
	cities: string[] = ["Bandung", "Cirebon", "Jakarta", "Padang"];
	label: string;
	sembunyikan = false;
	supirForm: FormGroup;
	type: 'tambah' | 'ubah';
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngRouter: Router,
		private $_ngfFirestore: AngularFirestore,
		private $_pp2Config: ConfigService,
	) {
		this.$_pp2Database.table = 'supir';
		this.$_pp2Upload.basePath = 'supir';
		this.type = $_ngActivatedRoute.data['value']['type'];
		this.label = this.type === 'tambah' ? 'Tambah Supir' : 'Ubah Data Supir';
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
		this.supirForm = this.$_ngFormBuilder.group(this.supirFormObject());
		this.C_Pp2_Dry_FI.img.nativeElement.src = '/assets/img/placeholder-supir.png';
		if ( id ) {
			this.$_pp2Database.$data$.subscribe(($supir) => {
				const supir = $supir.filter(supir => supir.Id == id)[0]
				this.supirForm.setValue(this.supirFormObject(supir))
				this.C_Pp2_Dry_FI.img.nativeElement.src = supir.image;
			})
		}
	}
	tooltipMsg(): string {
		return this.disable ? 'Pilih Foto terlebih dahulu' : 'Simpan perubahan';
	}
	pp2OnSubmit(e: Event, supir: SupirId): void {
		e.preventDefault();
		if ( this.type == 'tambah' || (this.type == 'ubah' && this.C_Pp2_Dry_FI.fileExist) ) {
			this.$_pp2Upload.$upload$.subscribe((e: Upload)=>{
				delete supir.id;
				this.$_pp2Database.create(Object.assign(supir, { image: e.url }));
				this.$_pp2Upload.$upload$.unsubscribe()
			})
			let image = this.$_pp2Upload.pushUpload();
		} else if ( this.type == 'ubah' && !this.C_Pp2_Dry_FI.fileExist ) {
			const {id} = supir;
			delete supir.id;
			this.$_pp2Database.update(id, supir)
		}
	}
	supirFormObject(supir: SupirId = {}){
		return {
			id: supir.id || [''],
			nama: supir.nama || [''],
			noSIM: supir.noSIM || [''],
			jk: supir.jk || [''],
			noHP: supir.noHP || [''],
			hargaSewa: supir.hargaSewa || [''],
			alamat: supir.alamat || [''],
			email: supir.email || [''],
			image: supir.image || [''],
			_status: supir._status || ['Tersedia'],
			_disewa: supir._disewa || ['0'],
			_disewaSampai: supir._disewaSampai || ['0'],
			createdAt: supir.createdAt || ['0'],
			updatedAt: supir.updatedAt || ['0']
		}
	}
}
