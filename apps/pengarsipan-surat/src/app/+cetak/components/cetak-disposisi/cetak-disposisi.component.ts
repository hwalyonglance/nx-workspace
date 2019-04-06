import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/id';

import { XFirebaseObject, XFirebaseService } from '../../../+x';

@Component({
	selector: 'cetak-disposisi',
	templateUrl: './cetak-disposisi.component.html',
	host: {
		class: 'cetak-disposisi'
	}
})
export class CetakDisposisiComponent implements OnInit {
	private _$db: XFirebaseObject = {};
	get Akun$_(){ return this._$db.akun._bsCol.getValue(); }
	get Disposisi$_(){ return this._$db.disposisi._bsCol.getValue(); }
	get Surat$_(){ return this._$db.surat._bsCol.getValue(); }
	disposisi: any = false;
	constructor(
		public $_ngActivatedRoute: ActivatedRoute,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.akun = $_xFirebase.create('akun');
		this._$db.surat = $_xFirebase.create('surat');
		this._$db.disposisi = $_xFirebase.create('disposisi');
		$_ngActivatedRoute.params.subscribe((params) => {
			this._$db.disposisi._bsCol.subscribe(Disposisi$_ => {
				const Disposisi_ = Disposisi$_
					.map(disposisi => {
						const akun = this.Akun$_.filter(akun => akun.email == disposisi.akun_email)
						disposisi.$akun = akun.length > 0 ? akun[0] : {};
						const surat = this.Surat$_.filter(surat => surat.id == disposisi.surat_id)
						disposisi.$surat = surat.length > 0 ? surat[0] : {};
						return disposisi;
					})
				const { id, uid, kd, ks, td, ts } = params;
				if ( params['id'] ) {
					this.disposisi = Disposisi_.filter((disposisi) => disposisi.id == params['id'] )[0] || {};
				} else if ( kd && ks && td && ts ) {
					this.disposisi = Disposisi_
						.filter(disposisi => (disposisi.$surat > kd) && disposisi.$surat <ks )
						.filter(disposisi => (disposisi.$surat > td) && disposisi.$surat <ts )[0] || {};
				}
				console.log(this.disposisi)
			})
		})
	}
	ngOnInit() {}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
}
