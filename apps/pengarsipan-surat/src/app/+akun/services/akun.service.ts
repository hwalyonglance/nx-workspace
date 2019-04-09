import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Akun, XAuthService } from '../../+x';
import { HakAkses } from '../types';

@Injectable({
	providedIn:'root'
})
export class AkunService {
	_hakAkses: HakAkses[] = ['Admin', 'Petugas', 'Pegawai'];
	auth_: BehaviorSubject<Akun<HakAkses> | null> = new BehaviorSubject<Akun<HakAkses> | null>(null);
	akun: BehaviorSubject<any> = new BehaviorSubject<any>(false);
	constructor(
		private $_ngRouter: Router
	){
		try {
			this.akun.next(JSON.parse(localStorage['akun']))
		}catch (e){
			this.akun.next(false)
		}
	}
}
