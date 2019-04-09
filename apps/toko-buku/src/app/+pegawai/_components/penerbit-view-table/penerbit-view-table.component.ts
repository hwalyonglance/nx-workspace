import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { ConfigService, DatabaseService, KonfirmasiHapusDialogComponent } from '../../../+x';

import { PenerbitFormComponent } from '../penerbit-form/penerbit-form.component';
import { Penerbit } from '../../interfaces';

export type PenerbitProperties = 'idpenerbit' | 'penerbit'| 'penulis' | 'telepon' | 'alamat' | 'action';

@Component({
	selector: 'penerbit-view-table',
	templateUrl: './penerbit-view-table.component.html',
	styles: [],
	host:{
		class:'penerbit-view-table'
	}
})
export class PenerbitViewTableComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	get length(): number {let v=0;try{this.$_ilmDatabase.data('penerbit').length}catch(e){}return v }
	dialogRef_penerbitForm: MatDialogRef<PenerbitFormComponent>;
	dialogRef_KonfirmasiHapusDialog: MatDialogRef<KonfirmasiHapusDialogComponent>;
	displayedColumns: PenerbitProperties[] = ['penerbit', 'penulis', 'telepon', 'alamat', 'action'];
	penerbit: Penerbit = {idPenerbit: ''};
	penerbitMatTableDataSource = new MatTableDataSource<Penerbit>();
	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ilmConfig: ConfigService,
		private $_ilmDatabase: DatabaseService
	) {
		this.$_ilmDatabase.dataChange.penerbit.subscribe((Penerbit$_: Penerbit[])=>{
			this.penerbitMatTableDataSource!.data = Penerbit$_;
		})
		$_matDialog.afterOpen.subscribe(() => { if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll'); });
		$_matDialog.afterAllClosed.subscribe(() => { doc.body.classList.remove('no-scroll'); });
		this.penerbitMatTableDataSource.sortingDataAccessor = (penerbit: Penerbit, prop: string) => {
			switch (prop) {
				case 'idPenerbit': return +penerbit.idPenerbit;
				case 'penerbit': return +penerbit.penerbit;
				case 'penulis': return +penerbit.penulis;
				case 'telepon': return +penerbit.telepon;
				case 'alamat': return +penerbit.alamat;
				default: return '';
			}
		}
		this.penerbitMatTableDataSource.filterPredicate = (penerbit: Penerbit, filter: string) => JSON.stringify(penerbit).indexOf(filter) != -1;
	}
	ngAfterViewInit(){
		this.penerbitMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.penerbitMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		fromEvent(this.filter.nativeElement, 'keyup')
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.penerbitMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	openPenerbitFormDialog(aksi: 'Tambahkan' | 'Perbarui' = 'Tambahkan', penerbit?: Penerbit){
		this.dialogRef_penerbitForm = this.$_matDialog.open(PenerbitFormComponent, {width: '300px', disableClose: true})
		this.dialogRef_penerbitForm.componentInstance.$aksi = aksi;
		if ( aksi === 'Perbarui' ) {
			this.dialogRef_penerbitForm.componentInstance.$penerbit = penerbit;
			this.dialogRef_penerbitForm.componentInstance.$event$.next('perbarui');
		}
		this.dialogRef_penerbitForm.componentInstance
			.$event$.subscribe((res) => {
				this.dialogRef_penerbitForm.close()
				this.dialogRef_penerbitForm = null
			})
	}
	remove(id: string = '') {
		this.dialogRef_KonfirmasiHapusDialog = this.$_matDialog.open(KonfirmasiHapusDialogComponent, { width: '250px', disableClose: true, data: {jenis: 'Penerbit'} })
		this.dialogRef_KonfirmasiHapusDialog.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') {
					this.$_ilmDatabase.remove('penerbit', id)
				}
				this.dialogRef_KonfirmasiHapusDialog.close()
				this.$_ilmDatabase.pullDatas('penerbit')
				this.dialogRef_KonfirmasiHapusDialog = null;
			});
	}
	rowClick(row) {
		this.penerbit = this.penerbit == row ? null : row;
	}
}
