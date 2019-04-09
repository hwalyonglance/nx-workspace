import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSelect, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { ConfigService, DatabaseService, KonfirmasiHapusDialogComponent, LoadingComponent, sekarang, truncate } from '../../../+x';

import { Buku, Keranjang, IsiKeranjang } from '../../interfaces';

export type KeranjangProperties = 'judul' | 'harga' | 'beli' | 'subtotal' | 'action';

@Component({
	selector: 'buku-keranjang',
	templateUrl: './buku-keranjang.component.html',
	styles: [`
		.m-b80px{ margin-bottom: 80px !important; }
		.m-b40px{ margin-bottom: 40px !important; }
	`],
	host: {
		class: 'buku-keranjang'
	}
})
export class BukuKeranjangComponent implements AfterViewInit, OnInit {
	@Output() $event$: EventEmitter<string> = new EventEmitter<string>();
	@Output() $simpan$: EventEmitter<any> = new EventEmitter<any>();

	@ViewChild(MatPaginator) C_Mat_Paginator: MatPaginator;
	@ViewChild(MatSort) C_Mat_Sort: MatSort;
	@ViewChild('filter') filter: ElementRef;
	@ViewChild('C_$NE_Img_BukuKeranjangForm') C_$NE_Img_BukuKeranjangForm: ElementRef;
	@ViewChild('C_Mat_Select_NoIsbn') C_Mat_Select_NoIsbn: MatSelect;

	get Buku$_(){ return this.$_ilmDatabase.data('buku') }
	get beli() { return this.bukuKeranjangForm.get('beli').value }
	get harga() { return this.bukuKeranjangForm.get('harga').value }
	get Keranjang$_(){
		const data = this.$_ilmDatabase.dataChange.keranjang.getValue();
		if ( this.level === 'konsumen' ) { return data.filter((keranjang: Keranjang) => keranjang.idKonsumen === this.keranjang.value.idKonsumen) }
		else if ( this.level === 'pegawai' ) { return data.filter((keranjang: Keranjang) => keranjang.idPegawai === this.keranjang.value.idPegawai) }
		return [] as Keranjang[];
	}
	get Konsumen$_(){ return this.$_ilmDatabase.data('konsumen') }
	get Pegawai$_(){ return this.$_ilmDatabase.data('pegawai') }
	get mq_min_width_959px(){ return this.$_cdkMediaMatcher.matchMedia('(max-width: 959px)').matches }
	get stok_max(){ try {return this.bukuKeranjangForm.get('stok').value;}catch(e){return 0} }

	private _mq;
	private _isi_ds;
	private _afterViewInit: Boolean = false;
	buku: Buku = {};
	bukuKeranjangForm: FormGroup;
	keranjangForm: FormGroup;
	displayedColumns: KeranjangProperties[] = ['judul', 'harga', 'beli', 'subtotal', 'action'];
	keranjangMatTableDataSource = new MatTableDataSource<IsiKeranjang>();
	level : 'pegawai' | 'konsumen';

	Loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	dialogRef_hapus: MatDialogRef<KonfirmasiHapusDialogComponent>;
	dialogRef_loading: MatDialogRef<LoadingComponent>;
	keranjang: BehaviorSubject<Keranjang> = new BehaviorSubject<Keranjang>({ nama: sekarang(), status: 'Dibawa' });
	// isiKeranjang: BehaviorSubject<IsiKeranjang[]> = new BehaviorSubject<IsiKeranjang[]>([]);
	constructor(
		private $_cdkMediaMatcher: MediaMatcher,
		private $_ilmConfig: ConfigService,
		private $_ilmDatabase: DatabaseService,
		private $_matDialog: MatDialog,
		private $_matSnackBar: MatSnackBar,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient
	) {
		$_ilmDatabase.pullDatas('buku')
		$_ilmDatabase.pullDatas('konsumen')
		this.Loading.subscribe((v) => {
			if ( v ) { this.dialogRef_loading = $_matDialog.open(LoadingComponent, { disableClose: true }) }
			else if ( this.dialogRef_loading ) { this.dialogRef_loading.close(); }
		})
		this._isi_ds = this.keranjang.subscribe((keranjang) => { this.keranjangMatTableDataSource!.data = keranjang.isi || [] });
		this.keranjangMatTableDataSource.sortingDataAccessor = (IsiKeranjang, prop: string) => {
			switch( prop ){
				case 'judul': return +IsiKeranjang.$buku.judul;
				case 'harga': return +IsiKeranjang.$buku.harga;
				case 'beli': return +IsiKeranjang.beli;
				case 'subtotal': return +IsiKeranjang.subtotal;
				default: return '';
			}
		}
		this.keranjangMatTableDataSource.filterPredicate = (isiKeranjang: IsiKeranjang, filter: string) => Object.values(isiKeranjang).join('').toLowerCase().indexOf(filter.toLowerCase()) != -1;
		this.keranjangForm = $_ngFormBuilder.group({
			daftarKeranjang: ['', Validators.required],
			daftarKonsumen: [''],
			noIsbn: ['', Validators.required],
			nama: ['']
		})
		this.bukuKeranjangForm = $_ngFormBuilder.group({
			beli: [0, Validators.min(1)],
			subtotal: ['0'],
			stok: ['0'],
			harga: ['0']
		})
		this.keranjang.subscribe((keranjang) => { this.keranjangForm.get('daftarKeranjang').setValue( keranjang.idKeranjang ) })
		this.keranjangForm.get('daftarKeranjang').valueChanges.subscribe((idKeranjang) => {
			if ( this.keranjang.getValue().idKeranjang !== idKeranjang ) {
				const keranjang: Keranjang[] = this.Keranjang$_.filter((keranjang: Keranjang) => keranjang.idKeranjang == idKeranjang)
				if ( keranjang[0] ) {
					this.keranjang.next( keranjang[0] );
					this.keranjangMatTableDataSource!.data = keranjang[0].isi || []
				}
			}
		});
		$_ngActivatedRoute.params.subscribe((params: any) => {
			$_ilmDatabase.pullDatas('buku', (Buku$_: Buku[]) => {
				this.bukuKeranjangSetValue(Buku$_, params.noIsbn, 'params');
				this.keranjangForm.get('noIsbn').setValue( String(params.noIsbn) )
			})
		})
		this.keranjangForm.get('noIsbn').valueChanges.subscribe((noIsbn) => {
			$_ilmDatabase.pullDatas('buku', (Buku$_: Buku[]) => { this.bukuKeranjangSetValue(Buku$_, noIsbn, 'changes') })
		})
	}
	ngAfterViewInit(){
		this._afterViewInit = true;
		this.$event$.next('AfterViewInit')
		// this.keranjangMatTableDataSource!.paginator = this.C_Mat_Paginator;
		this.keranjangMatTableDataSource!.sort = this.C_Mat_Sort;
		this.bukuKeranjangForm.get('beli').valueChanges.subscribe((val) => {
			if ( this.buku ) {
				this.bukuKeranjangForm.get('stok').setValue(this.buku.stok - val)
				this.bukuKeranjangForm.get('subtotal').setValue(val * this.harga)
			}
		})
	}
	ngOnInit() {
		this.$_ilmDatabase.pullDatas('buku')
		fromEvent(this.filter.nativeElement, 'keyup')
			.pipe(distinctUntilChanged())
			.subscribe(() => {
				// this.C_Mat_Paginator.pageIndex = 0;
				this.keranjangMatTableDataSource.filter = this.filter.nativeElement.value;
			});
		this.$event$.next('onInit');
	}
	buat(keranjang: Keranjang, cb){
		this.$_ilmDatabase.add<Keranjang>('keranjang', keranjang, (res) => {
			this.keranjang.next(res);
			cb(res)
		})
	}
	buatKeranjang(){
		const keranjang: Keranjang = { nama: this.keranjangForm.value.nama, status: 'Dibawa' };
		let idKonsumen = this.keranjang.getValue().idKonsumen;
		let idPegawai = this.keranjang.getValue().idPegawai;
		if ( idKonsumen ) { keranjang.idKonsumen = idKonsumen; }
		else if ( idPegawai ) { keranjang.idPegawai = idPegawai; }
		this.$_ilmDatabase.add('keranjang', keranjang, (res) => {
			this.$_matSnackBar.open('Berhasil Membuat Keranjang Baru: '+ res.data.nama)._dismissAfter(4000)
		});
	}
	bukuKeranjangSetValue(Buku$_: Buku[], noIsbn: string, gg: string){
		if ( noIsbn !== '' ) {
			const buku$_: Buku[] = Buku$_.filter((buku: Buku) => buku.noIsbn == noIsbn)
			this.buku = buku$_[0] ? buku$_[0] : {} ;
			this.bukuKeranjangForm.get('stok').setValue(this.buku.stok);
			this.bukuKeranjangForm.get('harga').setValue(this.buku.harga);
			this.bukuKeranjangForm.get('subtotal').setValue(this.beli * this.buku.harga);
			if ( this._afterViewInit ) { this.C_$NE_Img_BukuKeranjangForm.nativeElement.src = this.buku.gambar; }
			else { setTimeout(() => { this.C_$NE_Img_BukuKeranjangForm.nativeElement.src = this.buku.gambar; }, 4000) }
		}
	}
	cetak(){
		this.Loading.next(true);
		this.$_ngHttpClient.post(this.$_ilmConfig.baseUrl + '/api/db/file/keranjang/cetak-struk', this.keranjang.getValue())
			.subscribe(
				(res: any)=>{
					this.Loading.next(false);
					window.open(this.$_ilmConfig.baseUrl + '/pdf/struk-pembelian-buku-' + (res.data as Keranjang).idKeranjang + '.pdf')
				},(res)=>{console.log(res)}
			)
	}
	hapusDariKeranjang(noIsbn: string, judul: string){
		this.dialogRef_hapus = this.$_matDialog.open(KonfirmasiHapusDialogComponent, {disableClose: true, data: {jenis: 'Buku'}})
		this.dialogRef_hapus.componentInstance.$btn$.subscribe((res) => {
			if ( res == 'O' ) {
				const keranjang = this.keranjang.getValue()
				keranjang.isi = keranjang.isi.filter((isiKeranjang) => isiKeranjang.noIsbn != noIsbn);
				this.perbarui(keranjang)
				this.$_matSnackBar.open(`Buku '${judul}' dihapus dari keranjang.`)._dismissAfter(4000)
			}
			this.dialogRef_hapus.close();
			this.dialogRef_hapus = null;
		})
	}
	perbarui(keranjang: Keranjang){
		this.$_ilmDatabase.update<Keranjang>('keranjang', keranjang)
		this.keranjang.next(keranjang);
		this.$simpan$.next(keranjang);
	}
	perbaruiIsiKeranjang(aksi: 'tambah' | 'kurang'){
		const keranjang = this.keranjang.getValue();
		if ( !('isi' in keranjang) ) { keranjang.isi = [] }
		let $isiKeranjang: IsiKeranjang = {
			noIsbn: this.keranjangForm.value.noIsbn,
			$buku: this.buku,
			beli: this.beli,
			subtotal: this.beli * this.buku.harga
		};
		if ( keranjang.isi ) {
			keranjang.isi = keranjang.isi.map((isiKeranjang) => {
				if ( isiKeranjang.noIsbn === $isiKeranjang.noIsbn) {
					if (aksi === 'tambah') {
						isiKeranjang.beli += $isiKeranjang.beli;
						isiKeranjang.subtotal += $isiKeranjang.subtotal;
						this.$_ilmDatabase.update('buku', Object.assign( {}, this.buku, { stok: this.buku.stok - this.beli }))
					}else if ( aksi === 'kurang' ){
						isiKeranjang.beli -= $isiKeranjang.beli;
						isiKeranjang.subtotal -= $isiKeranjang.subtotal;
						this.$_ilmDatabase.update('buku', Object.assign( {}, this.buku, { stok: this.buku.stok + this.beli }))
					}
					return isiKeranjang
				}
				return isiKeranjang;
			})
		}
		if ( keranjang.isi.filter((isiKeranjang) => isiKeranjang.noIsbn === $isiKeranjang.noIsbn).length === 0 ) {
			keranjang.isi.push($isiKeranjang);
		}
		this.bukuKeranjangForm.get('beli').setValue(0)
		this.perbarui(keranjang);
	}
	_truncate(str: string, maxLength: number = 126) {
		return truncate(str, maxLength)
	}
	ubahBeliBuku(isiKeranjang: IsiKeranjang): void {
		this.keranjangForm.get('noIsbn').setValue(isiKeranjang.noIsbn)
		this.bukuKeranjangForm.get('beli').setValue(isiKeranjang.beli)
		this.buku = isiKeranjang.$buku;
	}
}
