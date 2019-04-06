import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/id';

import { XFirebaseObject, XFirebaseService } from '../../../+x';

@Component({
	selector: 'cetak-akun',
	templateUrl: './cetak-akun.component.html',
	host: {
		class: 'cetak-akun'
	}
})
export class CetakAkunComponent implements OnInit {
	constructor(
		public $_ngActivatedRoute: ActivatedRoute,
		private $_xFirebase: XFirebaseService
	) {
		$_ngActivatedRoute.params.subscribe((params) => {
			console.log('params: ', params);
		})
		$_ngActivatedRoute.paramMap.subscribe((paramMap) => {
			console.log('paramMap: ', paramMap);
		})
	}
	ngOnInit() {}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
}
