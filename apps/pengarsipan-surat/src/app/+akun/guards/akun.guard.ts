import { Injectable } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { includes } from 'lodash';

import { AkunService } from '../services/akun.service';

import { HakAkses } from '../types';

@Injectable()
export class AkunGuard implements CanActivate {
	constructor(
		private $_ngRouter: Router,
		private $_xAkun: AkunService,
	){}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.$_xAkun.akun.pipe(switchMap(akun => {
			const ret = coerceBooleanProperty(akun);
			if ( !ret ) {
				this.$_ngRouter.navigate(['/']);
			}
			return of(coerceBooleanProperty(akun));
		}))
		// return true
	}
}
