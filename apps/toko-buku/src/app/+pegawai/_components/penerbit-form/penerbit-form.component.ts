import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatabaseService, InputFileComponent } from '../../../+x';

import { Penerbit } from '../../interfaces';

@Component({
	selector: 'penerbit-form',
	templateUrl: './penerbit-form.component.html',
	styles: [],
	host:{
		class:'penerbit-form'
	}
})
export class PenerbitFormComponent implements OnInit {
	$aksi : 'Tambahkan' | 'Perbarui' = 'Tambahkan';
	$penerbit: Penerbit;
	$event$: EventEmitter<'perbarui' | 'simpan' | 'tutup'> = new EventEmitter<'perbarui' | 'simpan' | 'tutup'>();
	get valid(){ return this.penerbitForm.valid }
	get value(){ return this.penerbitForm.value }
	penerbitForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_ilmDatabase: DatabaseService
	) {
		this.penerbitForm = $_ngFormBuilder.group({
			idPenerbit: [''],
			penerbit: [''],
			penulis: [''],
			telepon: [''],
			alamat: ['']
		});
		this.$event$.subscribe((act) => {
			if ( act === 'perbarui' ) {
				this.penerbitForm.setValue({
					idPenerbit: this.$penerbit.idPenerbit,
					penerbit: this.$penerbit.penerbit,
					penulis: this.$penerbit.penulis,
					telepon: this.$penerbit.telepon,
					alamat: this.$penerbit.alamat
				})
			}
		})
	}
	ngOnInit() {}
	simpan(penerbit: Penerbit = this.penerbitForm.value) {
		console.log(this.$aksi)
		console.log(penerbit)
		if ( this.$aksi === 'Tambahkan' ) {
			this.$_ilmDatabase.add('penerbit', penerbit)
		} else {
			this.$_ilmDatabase.update('penerbit', penerbit)
		}
		this.$event$.next('simpan')
	}
}
