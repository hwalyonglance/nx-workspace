import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';

interface User {
	uid: string;
	email?: string | null;
	photoURL?: string;
	displayName?: string;
}

@Injectable()
export class PengurusChildrenGuard implements CanActivateChild {
	constructor(
		public $_ngRouter: Router,
		public $_ngfAuth: AngularFireAuth,
		public $_ngfStore: AngularFirestore,
		public $_matSnackBar: MatSnackBar
		){}
	canActivateChild(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
		): boolean {
		const provider = new firebase.auth.GoogleAuthProvider();
		if (!localStorage['masukPengurus']) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss()
			}, 4000)
			this.$_ngRouter.navigate(['masuk', 'pengurus']);
		}
		let MasukPengurus;
		try{
			MasukPengurus = JSON.parse(localStorage.masukPengurus);
		}catch(e){
			MasukPengurus = {};
		}
		const retVal = MasukPengurus['username'] == 'admin' && MasukPengurus['password'] == 'admin';
		if (!retVal) {
			this.$_matSnackBar.open('Password atau Username Salah')
			setTimeout(()=>{
				this.$_matSnackBar.dismiss()
			},4000)
			this.$_ngRouter.navigate(['masuk','pengurus'])
		}

		return retVal;
	}
	private oAuthLogin(provider: firebase.auth.AuthProvider) {
		return this.$_ngfAuth.auth.signInWithPopup(provider)
		.then((credential) => {
			this.$_matSnackBar.open('Success')
			return this.updateUserData(credential.user);
		})
		.catch(console.error );
	}
	private updateUserData(user: User = {uid: Date.now().toString()}) {

		const userRef: AngularFirestoreDocument<User> = this.$_ngfStore.doc(`users/${user.uid}`);

		const data: User = {
			uid: user.uid,
			email: user.email || null,
			displayName: user.displayName || 'nameless user',
			photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
		};
		return userRef.set(data);
	}
}
