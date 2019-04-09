import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import 'moment/locale/id';

@Component({
	selector: 'cetak-header',
	template: `
		<h2>
			PT KELUAR MASUK AMPLOP
			<br>
			LAPORAN <ng-content></ng-content>
			<br>
			Jalan Percobaan No. 666, Telp 0127-654321
		</h2>
		<br>
		<hr>
		<br>
		<span style='float: right'>Dicetak pada hari {{ sekarang }}</span>
		<br>
	`,
	host:{
		class: 'cetak-header'
	}
})
export class CetakHeaderComponent implements OnInit {
	get sekarang() { return this.formatWaktu(Date.now()) }
	constructor() {}
	ngOnInit() {}
	formatWaktu(waktu){
		return moment(new Date(waktu).getTime()).format('dddd, DD MMMM YYYY')
	}
}
