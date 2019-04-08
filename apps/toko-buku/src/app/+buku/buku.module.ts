import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';

import { BukuCdkModules, BukuMatModules } from './buku-material.module';
import { XModule } from '../+x/x.module';

import { BukuViewGridListComponent } from './_components/buku-view-grid-list/buku-view-grid-list.component';
import { BukuFormComponent } from './_components/buku-form/buku-form.component';
import { BukuViewTableComponent } from './_components/buku-view-table/buku-view-table.component';
import { BukuKeranjangComponent } from './_components/buku-keranjang/buku-keranjang.component';
import { BukuPembelianViewTableComponent } from './_components/buku-pembelian-view-table/buku-pembelian-view-table.component';

export const BukuComponents = [
	BukuViewGridListComponent,
	BukuFormComponent,
	BukuViewTableComponent,
	BukuKeranjangComponent,
	BukuPembelianViewTableComponent
]

export const BukuServices = [
]

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		FlexLayoutModule,
		HttpClientModule,
		BukuCdkModules,
		BukuMatModules,
		ReactiveFormsModule,

		XModule
	],
	declarations: [...BukuComponents],
	entryComponents: [...BukuComponents],
	exports: [...BukuComponents],
	providers: [...BukuServices]
})
export class BukuModule { }
