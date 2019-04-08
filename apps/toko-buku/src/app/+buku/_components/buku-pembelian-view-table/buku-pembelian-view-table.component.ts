import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Observable, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { sum } from 'lodash';

import { ConfigService, DatabaseService, TableExpand } from '../../../+x';

import { Buku, Keranjang, IsiKeranjang } from '../../interfaces/';

export type BukuPembelianViewTableProperties = 'nama' | 'oleh' | 'total' | 'pada' | 'action';

@Component({
	selector: 'buku-pembelian-view-table',
	templateUrl: './buku-pembelian-view-table.component.html',
	animations:[
		...TableExpand
	],
	styles: [],
	host:{
		class:'buku-pembelian-view-table'
	}
})
export class BukuPembelianViewTableComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	$keranjang: Keranjang;
	displayedColumns: BukuPembelianViewTableProperties[] = ['nama', 'oleh', 'total', 'pada', 'action'];
	isDetailRow = (_index: number, row: Keranjang) => {
		return row == this.$keranjang;
		// return this.keranjangMatTableDataSource.data[2];
		// return true;
	};
	keranjangMatTableDataSource = new MatTableDataSource<Keranjang>();
	constructor(
		private $_ilmDatabase: DatabaseService
	) {
		$_ilmDatabase.dataChange.keranjang.subscribe((Keranjang$_: Keranjang[])=>{
			this.keranjangMatTableDataSource!.data = Keranjang$_;
		})
		$_ilmDatabase.pullDatas('keranjang');
		this.keranjangMatTableDataSource.sortingDataAccessor = (keranjang: Keranjang, prop: string) => {
			switch (prop) {
				case 'nama': return +keranjang.nama;
				case 'oleh': return +(keranjang.idPegawai || keranjang.idKonsumen);
				case 'total': return +this.total(keranjang.isi);
				case 'pada': return +keranjang.createdAt;
				default: return '';
			}
		}
		this.keranjangMatTableDataSource.filterPredicate = (keranjang: Keranjang, filter: string) => Object.values(keranjang).join('').toLowerCase().indexOf(filter) != -1;
	}
	ngAfterViewInit(){
		this.keranjangMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.keranjangMatTableDataSource!.sort = this.C_Mat_Sort;
		setTimeout(() => {
			this.$keranjang = this.keranjangMatTableDataSource.data[0]
		}, 3000)
	}
	ngOnInit() {
		fromEvent(this.filter.nativeElement, 'keyup')
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				this.C_Mat_Paginator.pageIndex = 0;
				this.keranjangMatTableDataSource.filter = this.filter.nativeElement.value;
			});
	}
	rowClick(row: Keranjang, i: number) {
		this.$keranjang = this.$keranjang == row ? null : row;
		alert('row clicked')
	}
	total(isiKeranjang: IsiKeranjang[]){
		return sum(isiKeranjang.map((_isiKeranjang) => _isiKeranjang.subtotal))
	}
}
