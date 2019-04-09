import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/id';

import { XFirebaseObject, XFirebaseService } from '../../../+x';

@Component({
	selector: 'cetak-disposisi-tabel',
	templateUrl: './cetak-disposisi-tabel.component.html',
	host: {
		class: 'cetak-disposisi-tabel'
	}
})
export class CetakDisposisiTabelComponent implements OnInit {
	private _$db: XFirebaseObject = {};
	get Akun$_(){ return this._$db.akun._bsCol.getValue(); }
	get Disposisi$_(){ return this._$db.disposisi._bsCol.getValue(); }
	get Surat$_(){ return this._$db.surat._bsCol.getValue(); }
	Data$_: any[] = [];
	constructor(
		public $_ngActivatedRoute: ActivatedRoute,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.akun = $_xFirebase.create('akun');
		this._$db.surat = $_xFirebase.create('surat');
		this._$db.disposisi = $_xFirebase.create('disposisi');
		this._$db.disposisi._bsCol.subscribe(Disposisi$_ => {
			this.Data$_ = Disposisi$_.map(disposisi => {
				const akun = this.Akun$_.filter(akun => akun.email == disposisi.akun_email)
				disposisi.$akun = akun.length > 0 ? akun[0] : {};
				const surat = this.Surat$_.filter(surat => surat.id == disposisi.surat_id)
				disposisi.$surat = surat.length > 0 ? surat[0] : {};
				return disposisi;
			});
			console.log(this.Data$_)
		})
	}
	ngOnInit() {
	}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
}
