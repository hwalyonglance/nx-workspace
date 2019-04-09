import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

import { BehaviorSubject, Observable } from 'rxjs';

import * as firebase from 'firebase';

import { take } from 'rxjs/operators';

export type XDatabaseOperator = '<' | '>' | '<=' | '>=' | '==' | '===' | '!=' | '!==';

export class XFirebase<T = any> {
	// get timestamp(): firebase.firestore.FieldValue { return firebase.firestore.FieldValue.serverTimestamp(); }
	get timestamp(): any { return Date.now(); }
	get id(): string { return this.$_ngfFirestore.createId() }
	_col: AngularFirestoreCollection<any>;
	// _doc: AngularFirestoreDocument<T>;
	_bsCol: BehaviorSubject<T[] | null> = new BehaviorSubject<T[] | null>([]);
	constructor(
		public $_ngfFirestore: AngularFirestore,
		public $_ngfFireStorage: AngularFireStorage,
		public path: string
	) {
		this._col = this.$_ngfFirestore.collection(path, (ref) => ref.orderBy('createdAt', 'desc'));
		this._col.valueChanges().subscribe((v: any) => { this._bsCol.next(v); })
	}
	clone(path: string): XFirebase {
		return new XFirebase(this.$_ngfFirestore, this.$_ngfFireStorage, path);
	}
	doc(path: string): AngularFirestoreDocument<T> {
		return this.$_ngfFirestore.doc(path) as AngularFirestoreDocument<T>
	}
	docs(): T[] {
		return this._bsCol.getValue().slice() as T[];
	}
	docsWhere(where: string[][]): T[] {
		return this.docs().filter((data: T) => {
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
	insert(data: T, path: string = '') {
		const _data = Object.assign(data, {
			createdAt: this.timestamp,
			updatedAt: this.timestamp
		})
		if (path == '') {
			return this._col.add(_data) as Promise<firebase.firestore.DocumentReference>;
		} else {
			return this._col.doc(path).set(_data) as Promise<void>
		}
	}
	update(path: string, data: T): Promise<void> {
		return this._col.doc(path).update(Object.assign(data, { updatedAt: this.timestamp }));
	}
	uploadFile(data: any, metadata?: firebase.storage.UploadMetadata): AngularFireUploadTask {
		return this.$_ngfFireStorage.upload(this.path +'/'+ Date.now(), data, metadata)
	}
	upsert(path: string, data: T) {
		const doc =  this._col.doc(path).snapshotChanges().pipe(take(1)).toPromise();
		return doc.then((snap): any => {
			return snap.payload.exists ? this.update(path, data) : this.insert(data, path);
		})
	}
	remove(path: string): Promise<void> {
		return this._col.doc(path).delete();
	}
}

export type XFirebaseObject = {[key: string]: XFirebase};
