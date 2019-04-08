import { Injectable } from '@angular/core';
import { Pegawai } from '../interfaces';

@Injectable()
export class PegawaiAuthChildrenService {
	$pegawai: Pegawai = {};
	constructor() {
		try{
			this.$pegawai = JSON.parse(localStorage['signInPegawai'])
		}catch(e){
			this.$pegawai = {}
		}
	}
}
