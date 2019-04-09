import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDrawer, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ConfigService, DatabaseService, KonfirmasiHapusDialogComponent, TableExpand } from '../../../+x';

import { BukuFormComponent } from '../buku-form/buku-form.component';
import { Buku } from '../../interfaces';

export type BukuProperties = 'noIsbn' | 'idPenerbit' | 'idKategori' | 'judul' | 'sinopsis' | 'gambar' | 'penulis' | 'tahunTerbit' | 'stok' | 'harga';

@Component({
	selector: 'buku-view-table',
	templateUrl: './buku-view-table.component.html',
	animations:[
		...TableExpand
	],
	styles: [],
	host:{
		class:'buku-view-table'
	}
})
export class BukuViewTableComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild('C_Mat_Drawer') C_Mat_Drawer: MatDrawer;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	get length(): number {let v=0;try{this.$_ilmDatabase.data('buku').length}catch(e){}return v }
	dialogRef_BukuForm: MatDialogRef<BukuFormComponent>;
	dialogRef_KonfirmasiHapusDialog: MatDialogRef<KonfirmasiHapusDialogComponent>;
	displayedColumns: BukuProperties[] = ['noIsbn', 'judul', 'stok', 'harga'];
	buku: Buku = {noIsbn: ''};
	bukuMatTableDataSource = new MatTableDataSource<Buku>();
	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngRouter: Router,
		private $_ilmDatabase: DatabaseService
	) {
		$_ilmDatabase.dataChange.buku.subscribe((Buku$_: Buku[])=>{ this.bukuMatTableDataSource!.data = Buku$_; })
		$_matDialog.afterOpen.subscribe(() => { if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll'); });
		$_matDialog.afterAllClosed.subscribe(() => { doc.body.classList.remove('no-scroll'); });
		this.bukuMatTableDataSource.sortingDataAccessor = (buku: Buku, prop: string) => {
			switch (prop) {
				case 'noIsbn': return +buku.noIsbn;
				case 'idPenerbit': return +buku.idPenerbit;
				case 'idKategori': return +buku.idKategori;
				case 'judul': return +buku.judul;
				case 'sinopsis': return +buku.sinopsis;
				case 'gambar': return +buku.gambar;
				case 'tahunTerbit': return +buku.tahunTerbit;
				case 'stok': return +buku.stok;
				case 'harga': return +buku.harga;
				default: return '';
			}
		}
		this.bukuMatTableDataSource.filterPredicate = (buku: Buku, filter: string) => JSON.stringify(buku).indexOf(filter) != -1;
	}
	ngAfterViewInit(){
		this.bukuMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.bukuMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		fromEvent(this.filter.nativeElement, 'keyup')
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.bukuMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	openBukuFormDialog(aksi: 'Tambahkan' | 'Perbarui' = 'Tambahkan', buku?: Buku){
		this.dialogRef_BukuForm = this.$_matDialog.open(BukuFormComponent, {width: '450px', disableClose: true})
		this.dialogRef_BukuForm.componentInstance.$aksi = aksi;
		if ( aksi === 'Perbarui' ) {
			this.dialogRef_BukuForm.componentInstance.$buku = buku;
			this.dialogRef_BukuForm.componentInstance.$event$.next('perbarui');
		}
		this.dialogRef_BukuForm.componentInstance
			.$event$.subscribe((res) => {
				this.dialogRef_BukuForm.close()
				this.C_Mat_Drawer.close();
				this.dialogRef_BukuForm = null;
			})
	}
	remove(id: string = '') {
		this.dialogRef_KonfirmasiHapusDialog = this.$_matDialog.open(KonfirmasiHapusDialogComponent, { width: '250px', disableClose: true, data: {jenis: 'Buku'} })
		this.dialogRef_KonfirmasiHapusDialog.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') {
					this.$_ilmDatabase.remove('buku', id)
					this.C_Mat_Drawer.close()
				}
				this.dialogRef_KonfirmasiHapusDialog.close()
				this.$_ilmDatabase.pullDatas('buku')
				this.dialogRef_KonfirmasiHapusDialog = null;
			});
	}
	rowClick(row) {
		this.buku = this.buku == row ? null : row;
	}
}
