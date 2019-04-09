import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { PenggunaId } from '../../_dry/index';

@Injectable()
export class SayaChildrenGuard implements CanActivateChild {
	constructor(
		public $_ngRouter: Router,
		public $_matSnackBar: MatSnackBar
	){}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (!localStorage.masukPengguna) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss()
			}, 4000)
			this.$_ngRouter.navigate(['masuk']);
		}
		let Pengguna$: PenggunaId[];
		let MasukUser: PenggunaId;
		try{
			Pengguna$ = JSON.parse(localStorage.pengguna);
			MasukUser = JSON.parse(localStorage.masukPengguna);
		}catch(e){
			Pengguna$ = [];
			MasukUser = {};
		}
		const hasil: PenggunaId[] = Pengguna$.filter((pengguna: PenggunaId) => {
			return (pengguna.username == MasukUser.username) && (pengguna.password == MasukUser.password);
		});
		let retVal = false;
		if ( hasil.length == 1 ) {
			retVal = true;
			localStorage.ggPengguna = JSON.stringify(hasil[0]);
			localStorage.ezPengguna = 'o';
		}else{
			localStorage.ezPengguna = 'x';
		}
		return retVal;
	}
}
