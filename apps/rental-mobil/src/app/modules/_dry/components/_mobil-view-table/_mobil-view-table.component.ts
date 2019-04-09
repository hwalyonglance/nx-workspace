import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { _KonfirmasiHapusDialogComponent } from '../_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';

import { TableExpand } from '../../animations/table-expand.animation';

import { MobilId } from '../../interfaces/mobil.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { UploadService } from '../../services/upload.service';

export type MobilTableProperties = 'id' | 'nama' | 'platNo' | 'kursi' | 'bensin' | 'hargaSewa' | 'image' | 'kondisi' | '_status' | '_disewaSampai' | 'createdAt' | 'updatedAt' | 'action' | undefined;

@Component({
	selector: 'pp2-dry-mobilViewTable',
	templateUrl: './_mobil-view-table.component.html',
	animations: [
		...TableExpand
	]
})
export class _MobilViewTableComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	get length(): number {let v=0;try{this.$_pp2Database.data.length}catch(e){}return v }

	$_pp2Database: DatabaseService<MobilId> = new DatabaseService<MobilId>(this.$_ngfFiretore)
	$_pp2Upload: UploadService = new UploadService(this.$_ngfFiretore)
	dialogRef: MatDialogRef<_KonfirmasiHapusDialogComponent>;
	// displayedColumns: MobilProperties[] = ['id', 'nama', 'noSim', 'jk', 'noHP', 'alamat', 'email', 'image', '_status', '_disewaSampai', 'createdAt', 'updatedAt', 'action'];
	displayedColumns: MobilTableProperties[] = ['image', 'nama', '_status'];
	mobil: MobilId = {id: ''};
	mobilMatTableDataSource = new MatTableDataSource<MobilId>();

	constructor(
		@Inject(DOCUMENT) doc: Document,
		public $_matDialog: MatDialog,
		private $_ngRouter: Router,
		private $_ngfFiretore: AngularFirestore,
		public $_pp2Conf: ConfigService
	){
		$_matDialog.afterOpen.subscribe(() => { if (!doc.body.classList.contains('no-scroll')) doc.body.classList.add('no-scroll'); });
		$_matDialog.afterAllClosed.subscribe(() => { doc.body.classList.remove('no-scroll'); });
		this.$_pp2Database.table='mobil';
		this.$_pp2Database.$data$.subscribe(()=>{
			this.mobilMatTableDataSource!.data = this.$_pp2Database.data.slice();
		})
		this.mobilMatTableDataSource.sortingDataAccessor = (mobil: MobilId, prop: string) => {
			switch (prop) {
				case 'id': return +mobil.id;
				case 'nama': return +mobil.nama;
				case 'platNo': return +mobil.platNo;
				case 'kursi': return +mobil.kursi;
				case 'bensin': return +mobil.bensin;
				case 'hargaSewa': return +mobil.hargaSewa;
				case 'kondisi': return +mobil.kondisi;
				case '_status': return +mobil._status;
				default: return '';
			}
		}
		this.mobilMatTableDataSource.filterPredicate = (mobil: MobilId, filter: string) => JSON.stringify(mobil).indexOf(filter) != -1;
	}
	ngAfterViewInit(){
		this.mobilMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.mobilMatTableDataSource!.sort = this.C_Mat_Sort;
	}
	ngOnDestroy(){}
	ngOnInit() {
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.mobilMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	rowClick(row) {
		this.mobil = this.mobil == row ? null : row;
		// this.wasExpanded.has(row) ? this.wasExpanded.delete(row) : this.wasExpanded.add(row);
	}
	remove(id: string = '') {
		this.dialogRef = this.$_matDialog.open(_KonfirmasiHapusDialogComponent, { width: '300px', disableClose: true })
		this.dialogRef.componentInstance
			.$btn$.subscribe((res: 'O' | 'X')=>{
				if (res === 'O') this.$_pp2Database.remove(id)
				this.dialogRef.close()
				this.dialogRef = null;
			});
	}
}
