import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/id';

import { XFirebaseObject, XFirebaseService } from '../../../+x';

@Component({
	selector: 'cetak-surat',
	templateUrl: './cetak-surat.component.html',
	host: {
		class: 'cetak-surat'
	}
})
export class CetakSuratComponent implements OnInit {
	private _$db: XFirebaseObject = {};
	get Surat$_(){ return this._$db.surat._bsCol.getValue(); }
	surat: any = false;
	constructor(
		public $_ngActivatedRoute: ActivatedRoute,
		private $_xFirebase: XFirebaseService
	) {
		this._$db.surat = $_xFirebase.create('surat');
		$_ngActivatedRoute.params.subscribe((params) => {
			const { id, uid } = params;
			this._$db.surat._bsCol.subscribe((Surat$_) => {
				if ( id ) {
					this.surat = Surat$_.filter(surat => surat.id = id)[0] || {}
				} else if ( uid ) {
					this.surat = Surat$_.filter(surat => surat.uid = uid)[0] || {}
				}
			})
		})
	}
	ngOnInit() {}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
}
