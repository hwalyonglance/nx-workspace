import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ConfigService, DatabaseService, KonfirmasiHapusDialogComponent } from '../../../+x';

import { KategoriFormComponent } from '../kategori-form/kategori-form.component';
import { Kategori } from '../../interfaces';

export type kategoriProperties = 'idKategori' | 'kategori' | 'action';

@Component({
	selector: 'kategori-view-table',
	templateUrl: './kategori-view-table.component.html',
	styles: [],
	host:{
		class:'kategori-view-table'
	}
})
export class KategoriViewTableComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	get length(): number {let v=0;try{this.$_ilmDatabase.data('kategori').length}catch(e){}return v }
	dialogRef_KategoriForm: MatDialogRef<KategoriFormComponent>;
	dialogRef_KonfirmasiHapusDialog: MatDialogRef<KonfirmasiHapusDialogComponent>;
	displayedColumns: kategoriProperties[] = ['kategori', 'action'];
	kategori: Kategori = {idKategori: ''};
	kategoriMatTableDataSource = new MatTableDataSource<Kategori>();
	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ilmConfig: ConfigService,
		private $_ilmDatabase: DatabaseService
	) {
		this.$_ilmDatabase.dataChange.kategori.subscribe(()=>{ this.kategoriMatTableDataSource!.data = this.$_ilmDatabase.data('kategori'); })
		$_matDialog.afterOpen.subscribe(() => { if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll'); });
		$_matDialog.afterAllClosed.subscribe(() => { doc.body.classList.remove('no-scroll'); });
		this.kategoriMatTableDataSource.sortingDataAccessor = (kategori: Kategori, prop: string) => {
			switch (prop) {
				case 'idKategori': return +kategori.idKategori;
				case 'kategori': return +kategori.kategori;
				default: return '';
			}
		}
		this.kategoriMatTableDataSource.filterPredicate = (kategori: Kategori, filter: string) => JSON.stringify(kategori).indexOf(filter) != -1;
	}
	ngAfterViewInit(){
		this.kategoriMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.kategoriMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		fromEvent(this.filter.nativeElement, 'keyup')
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.kategoriMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	openkategoriFormDialog(aksi: 'Tambahkan' | 'Perbarui' = 'Tambahkan', kategori?: Kategori){
		this.dialogRef_KategoriForm = this.$_matDialog.open(KategoriFormComponent, {width: '300px', disableClose: true})
		this.dialogRef_KategoriForm.componentInstance.$aksi = aksi;
		if ( aksi === 'Perbarui' ) {
			this.dialogRef_KategoriForm.componentInstance.$kategori = kategori;
			this.dialogRef_KategoriForm.componentInstance.$event$.next('perbarui');
		}
		this.dialogRef_KategoriForm.componentInstance
			.$event$.subscribe((res) => {
				this.dialogRef_KategoriForm.close()
				this.dialogRef_KategoriForm = null
			})
	}
	remove(id: string = '') {
		this.dialogRef_KonfirmasiHapusDialog = this.$_matDialog.open(KonfirmasiHapusDialogComponent, { width: '250px', disableClose: true, data: {jenis: 'Kategori'} })
		this.dialogRef_KonfirmasiHapusDialog.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') {
					this.$_ilmDatabase.remove('kategori', id)
				}
				this.dialogRef_KonfirmasiHapusDialog.close()
				this.$_ilmDatabase.pullDatas('kategori')
				this.dialogRef_KonfirmasiHapusDialog = null;
			});
	}
	rowClick(row) {
		this.kategori = this.kategori == row ? null : row;
	}
}
