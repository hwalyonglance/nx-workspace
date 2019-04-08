import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { DatabaseService } from '../../../+x';
import { BukuKeranjangComponent, Keranjang } from '../../../+buku';

import { KonsumenAuthChildrenService } from '../../services';

@Component({
	selector: 'konsumen-keranjang',
	template: `
		<div style='margin: 64px auto; width: 95%'>
			<buku-keranjang ($event$)='evt($event)' ($simpan$)='simpan($event)'></buku-keranjang>
		</div>
	`,
	styles: []
})
export class KonsumenKeranjangComponent implements AfterViewInit, OnInit {
	@ViewChild(BukuKeranjangComponent) C_Ilm_Buku_Keranjang: BukuKeranjangComponent;
	get Keranjang(){ return this.C_Ilm_Buku_Keranjang.keranjang.getValue() }
	get Keranjang$_(){ return this.$_ilmDatabase.data('keranjang').filter((keranjang: Keranjang) => keranjang.idKonsumen == this.Konsumen.idKonsumen) }
	get Konsumen(){ return this.$_ilmKonsumenAuthChildren.$konsumen }
	constructor(
		private $_ilmDatabase: DatabaseService,
		private $_ilmKonsumenAuthChildren: KonsumenAuthChildrenService
	) {}
	ngAfterViewInit(){}
	ngOnInit() {}
	evt(e){
		if ( e == 'AfterViewInit') {
			this.C_Ilm_Buku_Keranjang.level = 'konsumen';
			this.C_Ilm_Buku_Keranjang.keranjang.next(
				Object.assign({}, this.Keranjang, { idKonsumen: this.Konsumen.idKonsumen })
			)
			this.$_ilmDatabase.pullDatas('keranjang', (Keranjang$_: Keranjang[]) => {
				Keranjang$_ = Keranjang$_.filter((keranjang: Keranjang) => {
					return (keranjang.status == 'Dibawa')  && (Boolean(keranjang.idPegawai) == false) && (keranjang.idKonsumen == this.Konsumen.idKonsumen)
				})
				if ( Keranjang$_.length < 1 ) {
					this.$_ilmDatabase.add('keranjang', this.Keranjang, (res) => {
						this.C_Ilm_Buku_Keranjang.keranjang.next(res.data)
					})
				} else { this.C_Ilm_Buku_Keranjang.keranjang.next(Keranjang$_[0]) }
			})
		}
	}
	simpan(keranjang: Keranjang) {
		this.$_ilmDatabase.update('keranjang', keranjang, (res) => { console.log(res) })
	}
}
