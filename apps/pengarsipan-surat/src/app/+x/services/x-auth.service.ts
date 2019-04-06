import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { XFirebase } from '../classes';
import { XFirebaseService } from './x-firebase.service';
import { Akun } from '../interfaces';

@Injectable()
export class XAuthService<HakAkses> {
	private _$db: XFirebase;
	akun$: Observable<Akun<HakAkses> | null> = of(null);
	akun_: BehaviorSubject<Akun<HakAkses> | null> = new BehaviorSubject<Akun<HakAkses> | null>(null);
	in: Observable<boolean> = of(false);
	constructor(
		private $_ngRouter: Router,
		private $_ngfAuth: AngularFireAuth,
		private $_xfirebase: XFirebaseService
	){
		this._$db = $_xfirebase.create('akun');
		this.akun_.subscribe(a => {
			if ( a ) {
				this.$_xfirebase.upsert(a.uid, a)
			}
		})
		this.akun$ = this.$_ngfAuth.authState
		.pipe(
			switchMap(akun => {
				if (akun) {
					return this._$db.doc(akun['uid']).snapshotChanges().switchMap((a) => {
						const id = a.payload.id;
						const data = a.payload.data() as Akun<HakAkses>;
						this.akun_.next({id, ...data})
						return of({id, ...data})
					})
				}else{
					return of(null);
				}
			})
		)

	}
	private _oAuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
		return this.$_ngfAuth.auth.signInWithPopup(provider)
			.then((credential) => {
				let user: Akun<HakAkses> | any = {
					uid: credential.user.uid,
					displayName: credential.user.displayName || 'Jhon Doe',
					email: credential.user.email || 'noreply@example.com',
					photoURL: credential.user.photoURL || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
					role: 'Pegawai'
				};
			})
			.catch((error) => console.error(error) );
	}
	////// OAuth Methods /////
	googleLogin(): Promise<void> {
		return this._oAuthLogin(new firebase.auth.GoogleAuthProvider());
	}
	githubLogin(): Promise<void> {
		return this._oAuthLogin(new firebase.auth.GithubAuthProvider());
	}
	facebookLogin(): Promise<void> {
		return this._oAuthLogin(new firebase.auth.FacebookAuthProvider());
	}
	twitterLogin(): Promise<void> {
		return this._oAuthLogin(new firebase.auth.TwitterAuthProvider());
	}
	anonymousLogin() {
		return this.$_ngfAuth.auth.signInAnonymously()
			.then((user) => {
				console.log(user);
				return user;
			})
			.catch((error) => {
				console.error(error);
			});
	}
	emailSignUp(email: string, password: string) {
		return this.$_ngfAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				return user;
			})
			.catch((error) => console.error(error) );
	}

	emailLogin(email: string, password: string) {
		return this.$_ngfAuth.auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				return user;
			})
			.catch((error) => console.error(error) );
	}
	resetPassword(email: string) {
		const fbAuth = firebase.auth();
		return fbAuth.sendPasswordResetEmail(email)
			.catch((error) => console.error(error));
	}
	signOut() {
		this.$_ngfAuth.auth.signOut()
	}
}
