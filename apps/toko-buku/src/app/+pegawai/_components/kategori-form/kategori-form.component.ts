import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatabaseService, InputFileComponent } from '../../../+x';

import { Kategori } from '../../interfaces';

@Component({
	selector: 'kategori-form',
	templateUrl: './kategori-form.component.html',
	styles: [],
	host: {
		class:'kategori-form'
	}
})
export class KategoriFormComponent implements OnInit {
	$aksi : 'Tambahkan' | 'Perbarui' = 'Tambahkan';
	$kategori: Kategori;
	$event$: EventEmitter<'perbarui' | 'simpan' | 'tutup'> = new EventEmitter<'perbarui' | 'simpan' | 'tutup'>();
	get valid(){ return this.kategoriForm.valid }
	get value(){ return this.kategoriForm.value }
	kategoriForm: FormGroup;
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_ngFormBuilder: FormBuilder
	) {
		this.kategoriForm = $_ngFormBuilder.group({
			idKategori: [''],
			kategori: ['']
		})
		this.$event$.subscribe((act) => {
			if ( act === 'perbarui' ) {
				this.kategoriForm.setValue({
					idKategori: this.$kategori.idKategori,
					kategori: this.$kategori.kategori
				})
			}
		})
	}
	ngOnInit() {}
	simpan(kategori: Kategori = this.kategoriForm.value) {
		console.log(this.$aksi)
		if ( this.$aksi === 'Tambahkan' ) {
			this.$_ilmDatabase.add('kategori', kategori)
		} else {
			this.$_ilmDatabase.update('kategori', kategori)
		}
		this.$event$.next('simpan')
	}
}
