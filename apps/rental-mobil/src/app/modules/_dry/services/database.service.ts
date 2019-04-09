import { EventEmitter, Inject, Injectable, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export type Operator = '<' | '>' | '<=' | '>=' | '==' | '===' | '!=' | '!==';

@Injectable()
export class DatabaseService<T> {
	get data(): T[] {
		let _data = this.dataChange.value;
		if (this.where) {
			for(let i in this.where){
				_data = _data.filter((data: T) => {
					let retVal;
					switch (this.where[i][1]) {
						case '<':	retVal = data[this.where[i][0]] <	this.where[i][2]; break;
						case '>':	retVal = data[this.where[i][0]] >	this.where[i][2]; break;
						case '<=':	retVal = data[this.where[i][0]] <=	this.where[i][2]; break;
						case '>=':	retVal = data[this.where[i][0]] >=	this.where[i][2]; break;
						case '==':	retVal = data[this.where[i][0]] ==	this.where[i][2]; break;
						case '===':	retVal = data[this.where[i][0]] ===	this.where[i][2]; break;
						case '!=':	retVal = data[this.where[i][0]] !=	this.where[i][2]; break;
						case '!==':	retVal = data[this.where[i][0]] !==	this.where[i][2]; break;
					}
					return retVal;
				})
			}
		}
		return _data;
	}
	private _table: string;
	get table() {
		return this._table;
	}
	set table(tableName){
		this._table = tableName
		console.log(tableName)
		this.itemCol = this.$_ngfFirestore.collection<T>(this.table);
		this.itemCol.stateChanges().subscribe((actions) => {
			const $data = [];
			actions.map((a) => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				$data.push({id, ...data})
				return {id, ...data}
			})
			this.dataChange.next($data)
			this.$data$.next($data)
			if (window) {
				localStorage[tableName] = JSON.stringify($data)
			}
		})
	}
	$data$: EventEmitter<T[]> = new EventEmitter<T[]>();
	where: any[2][];
	dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
	itemCol: AngularFirestoreCollection<T>;
	items: any;
	itemDoc: AngularFirestoreDocument<T>;
	item: Observable<T>;

	constructor(
		private $_ngfFirestore: AngularFirestore
	) {}
	create(data: T): Promise<firebase.firestore.DocumentReference> {
		return this.itemCol.add(data)
	}
	gets(): T[]{
		return this.data;
	}
	update(id: string, data: T): Promise<void> {
		return this.itemCol.doc(id).update(data)
	}
	remove(id: string): Promise<void> {
		return this.itemCol.doc(id).delete()
	}
	// clearAll(): Promise<void> {
	// 	return this.itemsRef.remove()
	// }
}
