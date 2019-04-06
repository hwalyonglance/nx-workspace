import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatDrawer, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { includes } from 'lodash';
import * as moment from 'moment';
import 'moment/locale/id';

import { XFirebase, XFirebaseService, XFormDialog } from '../../../+x';
import { JenisFormDialogComponent } from '../jenis-form/jenis-form.component';

export type JenisTableProperties = 'jenisId' | 'nama' | 'createdAt' | 'updatedAt' | 'actions';

@Component({
	selector: 'jenis-view-table',
	templateUrl: './jenis-view-table.component.html',
	host: {
		class: 'jenis-view-table'
	}
})
export class JenisViewTableComponent implements AfterViewInit, OnInit {
	private _$db: XFirebase;
	private _$dialog: XFormDialog;
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	get Jenis$_(){ return this._$db._bsCol.getValue(); }
	columnToDisplay: JenisTableProperties[] = ['jenisId', 'nama', 'actions'];
	matTableDataSource_Jenis: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	constructor(
		@Optional() @Inject(DOCUMENT) private doc: Document,
		private $_matDialog: MatDialog,
		private $_xfFirebase: XFirebaseService
	) {
		this._$db = $_xfFirebase.create('jenisSurat');
		this._$dialog = new XFormDialog($_matDialog);
		this._$db._bsCol.subscribe(Jenis$_ => {
			this.matTableDataSource_Jenis!.data = Jenis$_;
		})
		this.matTableDataSource_Jenis.sortingDataAccessor = (jenis: any, prop: string) => {
			switch (prop) {
				case 'id': return +jenis.id;
				case 'nama': return +jenis.nama;
				case 'createdAt': return +jenis.createdAt;
				case 'updatedAt': return +jenis.updatedAt;
				default: return '';
			}
		}
		this.matTableDataSource_Jenis.filterPredicate = (jenis: any, filter: string) => {
			return Object.values(jenis).join('').toLowerCase().indexOf(filter.toLowerCase()) != -1
		};
	}
	ngAfterViewInit(){
		this.matTableDataSource_Jenis!.paginator = this.C_Mat_Paginator;
		this.matTableDataSource_Jenis!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe((v) => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.matTableDataSource_Jenis.filter = this.filter.nativeElement.value;
			});
	}
	hapus(id: string): void {
		this._$dialog.hapus({jenis: 'Surat'}, () => {
			this._$db.remove(id);
		})
	}
	tambah(): void {
		this._$dialog.buka(JenisFormDialogComponent, {
			disableClose: true,
			data: {mode: 'tambah'}
		})
	}
	ubah(jenis): void {
		this._$dialog.buka(JenisFormDialogComponent, {
			disableClose: true,
			data: {mode: 'perbarui', jenis}
		})
	}
}
