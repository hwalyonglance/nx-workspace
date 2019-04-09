import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { includes } from 'lodash';

import { PegawaiAuthChildrenService } from '../services/pegawai-auth-children.service';

@Injectable()
export class PegawaiAuthChildrenGuard implements CanActivateChild {
	constructor(
		private $_ilmPegawaiAuthChildren: PegawaiAuthChildrenService,
		private $_matSnackbar: MatSnackBar,
		private $_ngRouter: Router
	){}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		// return true;
		if ( includes(['/pegawai/masuk', '/pegawai/pendaftaran'], state.url) || ('idPegawai' in this.$_ilmPegawaiAuthChildren.$pegawai) ) {
			return true;
		}
		this.$_matSnackbar.open('Masuk Terlebih Dahulu')._dismissAfter(4000)
		this.$_ngRouter.navigate(['pegawai', 'masuk'])
		return false;
	}
}
