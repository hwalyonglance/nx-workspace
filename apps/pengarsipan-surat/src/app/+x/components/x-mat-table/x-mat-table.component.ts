/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatColumnDef, MatHeaderRowDef, MatPaginator, MatRowDef, MatSort, MatTable, MatTableDataSource } from '@angular/material';

import { XMatColumnComponent } from '../x-mat-column/x-mat-column.component';

@Component({
	selector: 'x-mat-table',
	template: `
		<mat-table [dataSource]="dataSource" matSort xMatTableSort='matSort'>
			<mat-header-row *matHeaderRowDef="columnsToDisplay"></mat-header-row>
			<mat-row *matRowDef="let row; columns: columnsToDisplay; "></mat-row>
			<ng-content></ng-content>
		</mat-table>
		<mat-paginator color='accent' #xMatTablePaginator [length]='dataSource.data.length' [pageIndex]='0' [pageSize]='10' [pageSizeOptions]='[10, 25, 50, 100]'></mat-paginator>
	`,
	styles: [],
	host:{
		class: 'x-mat-table'
	}
})
export class XMatTableComponent<T> implements AfterContentInit, OnInit {
	/** Different ways the client can add column definitions */
	@ContentChild(MatHeaderRowDef) headerRowDef: MatHeaderRowDef;
	@ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
	@ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
	@ContentChildren(XMatColumnComponent) xMatColumns: QueryList<XMatColumnComponent<T>>;
	@Input() columnsToDisplay: string[];
	@Input() dataSource: MatTableDataSource<T>;
	@ViewChild(MatTable) table: MatTable<T>;
	@ViewChild('xMatTablePaginator') C_MatPaginator: MatPaginator;
	@ViewChild('xMatTableSort') C_MatSort: MatSort;
	constructor() {}
	ngAfterContentInit(){
		// Register the xMatColumns to the table
		this.xMatColumns.forEach(xMatColumn => this.table.addColumnDef(xMatColumn.columnDef));
		// Register the normal column defs to the table
		this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
		// Register any custom row definitions to the table
		this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
		// Register the header row definition.
		this.table.setHeaderRowDef(this.headerRowDef);
		this.dataSource.sort = this.C_MatSort;
		this.dataSource.paginator = this.C_MatPaginator;
	}
	ngOnInit() {}
}
