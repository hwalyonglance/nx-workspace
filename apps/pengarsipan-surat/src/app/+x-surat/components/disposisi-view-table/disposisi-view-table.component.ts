import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable, fromEvent } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { includes } from 'lodash';
import * as moment from 'moment';
import 'moment/locale/id';

import { DisposisiFormDialogComponent } from '../disposisi-form/disposisi-form.component';
import { SuratReportDialogComponent } from '../surat-report/surat-report.component';

import { Akun, XConfigService, XFirebase, XFirebaseObject, XFirebaseService, XFormDialog } from '../../../+x';

export type DisposisiTableProperties =
	'id' | 'keterangan' | 'statusSurat' | 'tanggapan' | 'createdAt' | 'updatedAt' |
	'surat_id' | 'surat_no' | 'surat_noAgenda' | 'surat_jenisSurat' | 'surat_tglKirim' | 'surat_tglTerima' | 'surat_pengirim' | 'surat_perihal' |
	'akun_UID' | 'akun_displayName' | 'akun_hak' |
	'actions';

@Component({
	selector: 'disposisi-view-table',
	templateUrl: './disposisi-view-table.component.html',
	styles: [],
	host: {
		class: 'disposisi-view-table'
	}
})
export class DisposisiViewTableComponent implements AfterViewInit, OnInit {
	private _$db: XFirebaseObject = {};
	private _$dialog: XFormDialog;
	private HT_a: HTMLAnchorElement;
	private mouseEvent_click: MouseEvent = new MouseEvent('click');

	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	get Akun$_(){ return this._$db.akun._bsCol.getValue() as Akun<any>[]; }
	get Disposisi$_(){ return this._$db.disposisi._bsCol.getValue(); }
	get Surat$_(){ return this._$db.surat._bsCol.getValue(); }

	$disposisi: any = {};
	columnToDisplay: DisposisiTableProperties[] = [
		'surat_pengirim',
		'surat_perihal',
		'akun_displayName',
		'surat_tglTerima',
		'actions'
	];
	matTableDataSource_Disposisi: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	constructor(
		@Optional() @Inject(DOCUMENT) private doc: Document,
		private $_matDialog: MatDialog,
		private $_ngRenderer2: Renderer2,
		private $_ngRouter: Router,
		private $_xConfig: XConfigService,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.akun = $_xFirebase.create('akun');
		this._$db.surat = $_xFirebase.create('surat');
		this._$db.disposisi = $_xFirebase.create('disposisi');
		this._$dialog = new XFormDialog($_matDialog);
		this._$db.disposisi._bsCol.subscribe(Disposisi$_ => {
			this.matTableDataSource_Disposisi!.data = Disposisi$_.map(disposisi => {
				const akun = this.Akun$_.filter(akun => akun.email == disposisi.akun_email)
				disposisi.$akun = akun.length > 0 ? akun[0] : {};
				const surat = this.Surat$_.filter(surat => surat.id == disposisi.surat_id)
				disposisi.$surat = surat.length > 0 ? surat[0] : {};
				return disposisi;
			});
		})

		this.HT_a = $_ngRenderer2.createElement('a');
		this.HT_a.download = 'download';

		this.matTableDataSource_Disposisi.sortingDataAccessor = (disposisi: any, prop: string) => {
			switch (prop) {
				case 'surat_pengirim': return +disposisi.surat.pengirim;
				case 'surat_tglTerima': return +disposisi.surat.tglTerima;
				case 'keterangan': return +disposisi.keterangan;
				case 'tanggapan': return +disposisi.tanggapan;
				default: return '';
			}
		}
		this.matTableDataSource_Disposisi.filterPredicate = (disposisi: any, filter: string) => {
			return Object.values(disposisi).join('').toLowerCase().indexOf(filter.toLowerCase()) != -1
		};
	}
	ngAfterViewInit(){
		this.matTableDataSource_Disposisi!.paginator = this.C_Mat_Paginator;
		this.matTableDataSource_Disposisi!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		fromEvent(this.filter.nativeElement, 'keyup').pipe(
				distinctUntilChanged()
			).subscribe((v) => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.matTableDataSource_Disposisi.filter = this.filter.nativeElement.value;
			});
	}
	bukaFormReport(){
		const dialog = this._$dialog.buka<SuratReportDialogComponent>(SuratReportDialogComponent, {
			disableClose: true,
			data: {}
		})
		dialog.componentInstance.$on$.subscribe((val) => {
			if ( val.cetak === 'semua' ) {
				this.HT_a.href = this.$_xConfig.url + 'cetak/disposisi';
			} else {
				const { kd, ks, td, ts } = val.periode;
				this.HT_a.href = this.$_xConfig.url + `cetak/disposisi/${kd}/${ks}/${td}/${ts}`;
			}
			this.HT_a.dispatchEvent(this.mouseEvent_click);
			dialog.close();
		});
	}
	cetak(id: string): void {
		this.HT_a.href = this.$_xConfig.url + 'cetak/disposisi/' + id;
		this.HT_a.dispatchEvent(this.mouseEvent_click);
	}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
	hapus(id: string): void {
		this._$dialog.hapus({jenis: 'Disposisi'}, () => {
			this._$db.disposisi.remove(id);
		})
	}
	tambah(){
		this._$dialog.buka<DisposisiFormDialogComponent>(DisposisiFormDialogComponent, {
			disableClose: true,
			minWidth: '500px',
			maxHeight: '90vh',
			data: {
				mode: 'tambah'
			}
		})
	}
}
