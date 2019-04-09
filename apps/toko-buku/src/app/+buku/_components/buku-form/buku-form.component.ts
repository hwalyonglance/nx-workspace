import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatabaseService, InputFileComponent } from '../../../+x';

import { Buku } from '../../interfaces';

@Component({
	selector: 'buku-form',
	templateUrl: './buku-form.component.html',
	styles: [],
	host: {
		class:'buku-form'
	}
})
export class BukuFormComponent implements OnInit {
	@ViewChild('inputFile') C_Ilm_X_InputFileComponent: InputFileComponent;
	get valid(){
		return this.bukuForm.valid;
	}
	Kategori$_ = this.$_ilmDatabase.data('kategori');
	Penerbit$_ = this.$_ilmDatabase.data('penerbit');
	$aksi : 'Tambahkan' | 'Perbarui' = 'Tambahkan';
	$buku: Buku;
	$event$: EventEmitter<'perbarui' | 'simpan' | 'tutup'> = new EventEmitter<'perbarui' | 'simpan' | 'tutup'>();
	_disableId = false;
	bukuForm: FormGroup;
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_ngFormBuilder: FormBuilder
	) {
		this.$_ilmDatabase.$data$.subscribe(() => {
			this.Kategori$_ = this.$_ilmDatabase.data('kategori');
			this.Penerbit$_ = this.$_ilmDatabase.data('penerbit');
		})
		this.bukuForm = $_ngFormBuilder.group({
			noIsbn: [''], // PRIMARY KEY
			idPenerbit: [''],
			idKategori: [''],
			judul: [''],
			sinopsis: [''],
			gambar: [''],
			tahunTerbit: [''],
			stok: ['1'],
			harga: ['1000']
		})
		this.$event$.subscribe((act) => {
			if ( act === 'perbarui' ) {
				this.bukuForm.setValue({
					gambar: this.$buku.gambar,
					noIsbn: this.$buku.noIsbn,
					idPenerbit: this.$buku.idPenerbit,
					idKategori: this.$buku.idKategori,
					judul: this.$buku.judul,
					tahunTerbit: this.$buku.tahunTerbit,
					stok: this.$buku.stok,
					harga: this.$buku.harga,
					sinopsis: this.$buku.sinopsis
				})
				this.C_Ilm_X_InputFileComponent.image = this.$buku.gambar
				this._disableId = true;
			}
		})
	}
	ngOnInit() {}
	setGambar(gambar: string) { this.bukuForm.get('gambar').setValue(gambar); }
	simpan(buku: Buku = this.bukuForm.value) {
		if ( this.$aksi === 'Tambahkan' ) {
			this.$_ilmDatabase.add('buku', buku)
		} else {
			this.$_ilmDatabase.update('buku', buku)
		}
		this.$event$.next('simpan')
	}
}
