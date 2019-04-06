import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDrawer, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { XFirebase, XFormDialog } from '../../classes';
import { ROLES } from '../../consts';
import { XAkunFormDialogComponent } from '../x-akun-form/x-akun-form.component';
import { Akun } from '../../interfaces';
import { XFirebaseService } from '../../services';

export type XAkunMatTableProperties = 'uid' | 'photo' | 'provider' | 'displayName' | 'email' | 'role' | 'actions';

@Component({
	selector: 'x-akun-view-table',
	templateUrl: './x-akun-view-table.component.html',
	styles: [],
	host:{
		class: 'x-akun-view-table'
	}
})
export class XAkunViewTableComponent implements AfterViewInit, OnInit {
	private C_A: HTMLAnchorElement;
	private _$db: XFirebase;
	private _$clickEvent: MouseEvent = new MouseEvent('click');
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	get Akun$_(){ try{return this._$db._bsCol.getValue().slice()}catch(e){return []}; }
	get ROLES(): string[] { return ROLES }
	_$dialog: XFormDialog;
	$akun: Akun<any> = {} ;
	// columnToDisplay: AkunMatTableProperties[] = ['uid', 'provider', 'displayName', 'email', 'role', 'actions'];
	columnToDisplay: XAkunMatTableProperties[] = ['photo', 'displayName', 'email', 'role', 'actions'];
	matTableDataSource_Akun: MatTableDataSource<Akun<any>> = new MatTableDataSource<Akun<any>>(this.Akun$_);
	constructor(
		@Optional() @Inject(DOCUMENT) private doc: Document,
		private $_matDialog: MatDialog,
		private $_ngRenderer2: Renderer2,
		private $_xFirebase: XFirebaseService
	) {
		this._$db = $_xFirebase.create('akun')
		this._$dialog = new XFormDialog($_matDialog);
		this._$db._bsCol.subscribe(v => { this.matTableDataSource_Akun!.data = v })
		this.C_A = $_ngRenderer2.createComment('a');
		this.C_A.download = '';
		this.matTableDataSource_Akun.sortingDataAccessor = (akun: Akun<any>, prop: string) => {
			switch (prop) {
				case 'uid': return +akun.uid;
				case 'provider': return +akun.provider;
				case 'displayName': return +akun.displayName;
				case 'email': return +akun.email;
				case 'role': return +this.role(akun.role);
				default: return '';
			}
		}
		this.matTableDataSource_Akun.filterPredicate = (akun: Akun<any>, filter: string) => {
			const val: string =  akun.uid + akun.displayName + akun.email + akun.role;
			return val.toLowerCase().indexOf(filter.toLowerCase()) != -1;
		};
	}
	ngAfterViewInit(){
		this.matTableDataSource_Akun!.paginator = this.C_Mat_Paginator;
		this.matTableDataSource_Akun!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe((v) => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.matTableDataSource_Akun.filter = this.filter.nativeElement.value;
			});
	}
	cetak(uid: string): void {
	}
	cetakSemua(): void {

	}
	hapus(id: string) {
		this._$dialog.hapus({jenis: 'Akun'}, () => {
			this._$db.remove(id);
		})
	}
	role(i: number) {
		return ROLES.filter((v, index) => {
			return i == index;
		})[0];
	}
	tambah(){
		this._$dialog.buka(XAkunFormDialogComponent, {
			disableClose: true,
			minWidth: '550px',
			data: {mode: 'tambah'}
		})
	}
	ubah(akun: Akun<any>): void {
		this._$dialog.buka(XAkunFormDialogComponent, {
			disableClose: true,
			data: {mode: 'perbarui', akun}
		})
	}
}
