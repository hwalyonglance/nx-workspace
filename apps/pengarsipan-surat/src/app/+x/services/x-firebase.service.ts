import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import * as firebase from 'firebase';

import { XDatabaseOperator, XFirebase } from '../classes';

@Injectable()
export class XFirebaseService {
	get timestamp(): firebase.firestore.FieldValue { return firebase.firestore.FieldValue.serverTimestamp(); }
	get id(): string { return this.$_ngfFirestore.createId() }
	_col: {[key: string]: AngularFirestoreCollection<any>} = {};
	_bsCol: {[key: string]: BehaviorSubject<any[]>} = {};
	constructor(
		public $_ngfFirestore: AngularFirestore,
		public $_ngfFireStorage: AngularFireStorage
	) {}
	addCol<T = any>(path: string): XFirebase {
		this._col[path] = this.$_ngfFirestore.collection(path);
		this._col[path].stateChanges().subscribe(actions => {
			const $data: any[] = actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return {id, ...data}
			})
			this._bsCol[path].next($data)
		})
		return new XFirebase(this.$_ngfFirestore, this.$_ngfFireStorage, path);
	}
	clone(): XFirebaseService {
		return new XFirebaseService(this.$_ngfFirestore, this.$_ngfFireStorage);
	}
	create(path: string): XFirebase {
		return new XFirebase(this.$_ngfFirestore, this.$_ngfFireStorage, path);
	}
	doc<T = any>(path: string): AngularFirestoreDocument<T> {
		return this.$_ngfFirestore.doc(path) as AngularFirestoreDocument<T>
	}
	docs<T = any>(path: string): T[] {
		return this._bsCol[path].getValue().slice() as T[];
	}
	docsWhere<T = any>(path: string, where: string[][]): T[] {
		return this.docs<T>(path).filter((data: T) => {
			for(let i in where){
				let retVal;
				switch (where[i][1]) {
					case '<':	retVal = data[where[i][0]] <	where[i][2]; break;
					case '>':	retVal = data[where[i][0]] >	where[i][2]; break;
					case '<=':	retVal = data[where[i][0]] <=	where[i][2]; break;
					case '>=':	retVal = data[where[i][0]] >=	where[i][2]; break;
					case '==':	retVal = data[where[i][0]] ==	where[i][2]; break;
					case '===':	retVal = data[where[i][0]] ===	where[i][2]; break;
					case '!=':	retVal = data[where[i][0]] !=	where[i][2]; break;
					case '!==':	retVal = data[where[i][0]] !==	where[i][2]; break;
				}
				return retVal;
			}
		})
	}
	downloadURL(path: string): Observable<any> {
		return this.$_ngfFireStorage.ref(path).getDownloadURL()
	}
	metadata(path: string): Observable<any> {
		return this.$_ngfFireStorage.ref(path).getMetadata()
	}
	insert<T = any>(data: T, path: string = '') {
		const _data = Object.assign(data, {
			createdAt: this.timestamp,
			updatedAt: this.timestamp
		})
		if (path == '') {
			return this._col[path].add(_data) as Promise<firebase.firestore.DocumentReference>;
		} else {
			return this.$_ngfFirestore.doc(path).set(_data) as Promise<void>
		}
	}
	update<T>(path: string, data: T): Promise<void> {
		return this.$_ngfFirestore.doc(path).update(Object.assign(data, { updatedAt: this.timestamp }));
	}
	uploadFile(path: string, data: any, metadata?: firebase.storage.UploadMetadata): AngularFireUploadTask {
		return this.$_ngfFireStorage.upload(path, data, metadata)
	}
	upsert<T = any>(path: string, data: T) {
		const doc =  this.$_ngfFirestore.doc(path).snapshotChanges().pipe(take(1)).toPromise();
		return doc.then((snap): any => {
			return snap.payload.exists ? this.update(path, data) : this.insert<T>(data, path);
		})
	}
	remove(path: string): Promise<void> {
		return this.$_ngfFirestore.doc(path).delete();
	}
}
