import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { includes } from 'lodash';

import { KonsumenAuthChildrenService } from '../services/konsumen-auth-children.service';

@Injectable()
export class KonsumenAuthChildrenGuard implements CanActivateChild {
	constructor(
		private $_ilmKonsumenAuthChildren: KonsumenAuthChildrenService,
		private $_ngRouter: Router
	){}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		// return true;
		if ( includes(['/konsumen/masuk', '/konsumen/pendaftaran'], state.url) || ('idKonsumen' in this.$_ilmKonsumenAuthChildren.$konsumen) ) {
			return true;
		}
		this.$_ngRouter.navigate(['konsumen', 'masuk'])
		return false;
	}
}
