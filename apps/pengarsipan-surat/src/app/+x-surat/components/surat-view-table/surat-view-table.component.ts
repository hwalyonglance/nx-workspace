import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDrawer, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { includes } from 'lodash';
import * as moment from 'moment';
import 'moment/locale/id';

import { XConfigService, XFirebase, XFirebaseService, XFormDialog } from '../../../+x';
import { SuratFormDialogComponent } from '../surat-form/surat-form.component';
import { SuratReportDialogComponent } from '../surat-report/surat-report.component';

import { Jenis$_ } from '../../consts';

export type SuratTableProperties = 'suratId' | 'noAgenda' | 'jenisSurat' | 'tglKirim' | 'tglTerima' | 'noSurat' | 'pengirim' | 'perihal' | 'createdAt' | 'updatedAt' | 'actions';

@Component({
	selector: 'surat-view-table',
	templateUrl: './surat-view-table.component.html',
	styles: [],
	host: {
		class: 'surat-view-table'
	}
})
export class SuratViewTableComponent implements AfterViewInit, OnInit {
	private _$db: XFirebase;
	private _$dialog: XFormDialog;
	private HT_a: HTMLAnchorElement;
	private mouseEvent_click: MouseEvent = new MouseEvent('click');

	@Input('tabel') _tabel: 'keluar' | 'masuk' = 'keluar';
	set tabel(v){
		if ( !includes(['keluar', 'masuk'], v) ) {
			console.error('property tabel harus salah satu dari "keluar" atau "masuk"')
			this._tabel = 'keluar';
		}
	}
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	get Surat$_(){ return this._$db._bsCol.getValue().filter(surat=> surat.tabel == this.tabel) || []; }
	get columnToDisplay(): SuratTableProperties[] {
		if ( this._tabel == 'masuk' ) {
			return ['noAgenda', 'jenisSurat', 'tglKirim', 'tglTerima', 'pengirim', 'perihal', 'actions']
		}
		return ['noAgenda', 'jenisSurat', 'tglKirim', 'pengirim', 'perihal', 'actions']
	}
	matTableDataSource_Surat: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	constructor(
		@Optional() @Inject(DOCUMENT) private doc: Document,
		private $_matDialog: MatDialog,
		private $_ngRenderer2: Renderer2,
		private $_xConfig: XConfigService,
		private $_xFirebase: XFirebaseService
	) {
		this._$db = $_xFirebase.create('surat');
		this._$dialog = new XFormDialog($_matDialog);
		this._$db._bsCol.subscribe(Surat$_ => {
			this.matTableDataSource_Surat!.data = Surat$_.filter(surat=> surat.tabel == this._tabel)
		})
		this.HT_a = $_ngRenderer2.createElement('a');
		this.matTableDataSource_Surat.sortingDataAccessor = (surat: any, prop: string) => {
			switch (prop) {
				case 'id': return +surat.id;
				case 'noAgenda': return +surat.noAgenda;
				case 'jenisSurat': return +surat.jenisSurat;
				case 'tglKirim': return +surat.tglKirim;
				case 'tgTerima': return +surat.tgTerima;
				case 'pengirim': return +surat.pengirim;
				case 'perihal': return +surat.perihal;
				default: return '';
			}
		}
		this.matTableDataSource_Surat.filterPredicate = (surat: any, filter: string) => {
			const val: string = surat.noAgenda + this.cariJenis(surat.jenisSurat) + this.formatWaktu(surat.tglKirim) + this.formatWaktu(surat.tglTerima) + surat.pengirim + surat.perihal;
			return val.toLowerCase().indexOf(filter.toLowerCase()) != -1
		};
	}
	ngAfterViewInit(){
		this.matTableDataSource_Surat!.paginator = this.C_Mat_Paginator;
		this.matTableDataSource_Surat!.sort = this.C_Mat_Sort;
	}
	ngOnInit() {
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.distinctUntilChanged()
			.subscribe((v) => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.matTableDataSource_Surat.filter = this.filter.nativeElement.value;
			});
	}
	bukaFormReport(){
		const dialog = this._$dialog.buka<SuratReportDialogComponent>(SuratReportDialogComponent, {
			disableClose: true,
			data: {}
		})
		dialog.componentInstance.$on$.subscribe((val) => {
			console.log(val)
			if ( val.cetak === 'semua' ) {
				this.HT_a.href = this.$_xConfig.url + 'cetak/surat/' + this.tabel;
			} else {
				const { kd, ks, td, ts } = val.periode;
				this.HT_a.href = this.$_xConfig.url + `cetak/surat/${this.tabel}/${kd}/${ks}/${td}/${ts}`;
			}
			this.HT_a.dispatchEvent(this.mouseEvent_click);
			dialog.close();
		});
	}
	cariJenis(index: number): string {
		return Jenis$_.filter((v, i) => {
			return i == index;
		})[0]
	}
	cetak(id: string): void {
		this.HT_a.href = this.$_xConfig.url +'cetak/surat/' + this.tabel + '/' + id;
	}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
	hapus(id: string) {
		this._$dialog.hapus({jenis: 'Surat Keluar'}, () => {
			this._$db.remove(id);
		})
	}
	tambah(){
		this._$dialog.buka(SuratFormDialogComponent, {
			disableClose: true,
			data: {mode: 'tambah'}
		})
	}
	ubah(surat): void {
		this._$dialog.buka(SuratFormDialogComponent, {
			disableClose: true,
			data: {mode: 'perbarui', surat}
		})
	}
}
