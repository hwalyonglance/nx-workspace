import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/id';

import { XFirebaseObject, XFirebaseService } from '../../../+x';

@Component({
	selector: 'cetak-surat-tabel',
	templateUrl: './cetak-surat-tabel.component.html',
	host: {
		class: 'cetak-surat-tabel'
	}
})
export class CetakSuratTabelComponent implements OnInit {
	private _$db: XFirebaseObject = {};
	get Surat$_(){ return this._$db.surat._bsCol.getValue(); }
	Surat_: any[];
	constructor(
		public $_ngActivatedRoute: ActivatedRoute,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.surat = $_xFirebase.create('surat');
		$_ngActivatedRoute.params.subscribe(params => {
			this._$db.surat._bsCol.subscribe(Surat$_ => {
				const { uid, kd, ks } = params;
				let _Surat = Surat$_;
				if ( kd && ks ) {
					// ['noAgenda', 'jenisSurat', 'tglKirim', 'pengirim', 'perihal', 'actions']
					_Surat = _Surat.filter(surat => (surat.tglKirim > kd) && (surat.tglKirim < ks) )
				} else if ( uid ) {
					_Surat = _Surat.filter(surat => surat.uid == uid )
				}
				this.Surat_ = _Surat;
			})
		})
	}
	ngOnInit() {}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
}
