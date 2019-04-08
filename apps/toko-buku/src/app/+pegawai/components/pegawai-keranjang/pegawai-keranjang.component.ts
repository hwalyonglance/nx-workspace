import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { DatabaseService } from '../../../+x';
import { BukuKeranjangComponent, Keranjang } from '../../../+buku';

import { PegawaiAuthChildrenService } from '../../services';

@Component({
	selector: '<pegawai-keranjang></pegawai-keranjang>',
	template: `
		<div style='margin: 64px auto; width: 95%'>
			<buku-keranjang ($event$)='evt($event)' ($simpan$)='simpan($event)'></buku-keranjang>
		</div>
	`
})
export class PegawaiKeranjangComponent implements OnInit {
	@ViewChild(BukuKeranjangComponent) C_Ilm_Buku_Keranjang: BukuKeranjangComponent;
	get Keranjang(){ return this.C_Ilm_Buku_Keranjang.keranjang.getValue() }
	get Keranjang$_(){ return this.C_Ilm_Buku_Keranjang.Keranjang$_ }
	get Pegawai(){ return this.$_ilmPegawaiAuthChildren.$pegawai }
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_ilmPegawaiAuthChildren: PegawaiAuthChildrenService
	) {}
	ngOnInit() {}
	evt(e){
		if ( e == 'AfterViewInit') {
			this.C_Ilm_Buku_Keranjang.level = 'pegawai';
			this.C_Ilm_Buku_Keranjang.keranjang.next( Object.assign({}, this.Keranjang, { idPegawai: this.Pegawai.idPegawai }) )
			this.$_ilmDatabase.pullDatas('keranjang', (Keranjang$_: Keranjang[]) => {
				Keranjang$_ = Keranjang$_.filter((keranjang: Keranjang) => {
					return (keranjang.status == 'Dibawa') && (Boolean(keranjang.idKonsumen) == false) && (keranjang.idPegawai == this.Pegawai.idPegawai)
				})
				if ( Keranjang$_.length < 1 ) {
					this.$_ilmDatabase.add('keranjang', this.Keranjang, (res) => {
						this.C_Ilm_Buku_Keranjang.keranjang.next(res.data)
					})
				} else {
					this.C_Ilm_Buku_Keranjang.keranjang.next(Keranjang$_[0])
				}
			})
		}
	}
	simpan(keranjang: Keranjang) {
		this.$_ilmDatabase.update('keranjang', keranjang, (res) => {
		})
	}
}
