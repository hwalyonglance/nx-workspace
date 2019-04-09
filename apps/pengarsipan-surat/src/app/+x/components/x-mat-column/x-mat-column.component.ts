/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { MatColumnDef, MatTable, MatSortHeader } from '@angular/material';

@Component({
	selector: 'x-mat-column',
	template: `
		<ng-container matColumnDef>
			<mat-header-cell *matHeaderCellDef mat-sort-header> {{label || name}} </mat-header-cell>
			<mat-cell *matCellDef="let data"> {{getData(data)}} </mat-cell>
		</ng-container>
	`,
	styles: [],
	host:{
		class: 'x-mat-column cdk-visually-hidden',
		'[attr.ariaHidden]': 'true'
	}
})
export class XMatColumnComponent<T> implements OnDestroy, OnInit {
	@Input()
	get name(): string { return this._name; }
	set name(name: string) {
		this._name = name;
		this.columnDef.name = name;
	}
	_name: string;
	@Input() label: string;
	@Input() dataAccessor: ((data: T, name: string) => string);
	@Input() align: 'before' | 'after' = 'before';
	@Input()
	get sortable(): boolean { return this._sortable; }
	set sortable(sortable: boolean) { this._sortable = coerceBooleanProperty(sortable); }
	_sortable: boolean;
	@ViewChild(MatColumnDef) columnDef: MatColumnDef;
	@ViewChild(MatSortHeader) sortHeader: MatSortHeader;
	constructor(
		@Optional() public table: MatTable<any>
	) {}
	ngOnInit() {
		if (this.table) {
			this.table.addColumnDef(this.columnDef);
		}
	}
	ngOnDestroy() {
		if (this.table) {
			this.table.removeColumnDef(this.columnDef);
		}
	}
	getData(data: T): any {
		return this.dataAccessor ? this.dataAccessor(data, this.name) : (<any>data)[this.name];
	}
}
