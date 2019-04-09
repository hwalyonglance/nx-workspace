import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { XModule } from '../+x/x.module';
import { BukuModule } from '../+buku/buku.module';
import { PegawaiCdkModules, PegawaiMatModules } from './pegawai-material.module';
import { PegawaiRoutedComponents, PegawaiRoutingModule } from './pegawai-routing.module';

import { PegawaiAuthChildrenGuard } from './guards/pegawai-auth-children.guard';
import { PegawaiAuthChildrenService } from './services/pegawai-auth-children.service';

import { PegawaiFormComponent } from './_components/pegawai-form/pegawai-form.component';
import { PengirimanFormComponent } from './_components/pengiriman-form/pengiriman-form.component';
import { PenerbitFormComponent } from './_components/penerbit-form/penerbit-form.component';
import { PegawaiTopnavComponent } from './_components/pegawai-topnav/pegawai-topnav.component';
import { PegawaiSidenavComponent } from './_components/pegawai-sidenav/pegawai-sidenav.component';
import { KategoriFormComponent } from './_components/kategori-form/kategori-form.component';
import { KategoriViewTableComponent } from './_components/kategori-view-table/kategori-view-table.component';
import { PegawaiContainerComponent } from './_components/pegawai-container/pegawai-container.component';
import { PenerbitViewTableComponent } from './_components/penerbit-view-table/penerbit-view-table.component';
import { PegawaiMasukFormComponent } from './_components/pegawai-masuk-form/pegawai-masuk-form.component';

export const PegawaiComponents = [
	...PegawaiRoutedComponents,
	PegawaiFormComponent,
	PengirimanFormComponent,
	PenerbitFormComponent,
	PegawaiTopnavComponent,
	PegawaiSidenavComponent,
	KategoriFormComponent,
	KategoriViewTableComponent,
	PegawaiContainerComponent,
	PenerbitViewTableComponent,
	PegawaiMasukFormComponent
]

export const PegawaiGuards = [
	PegawaiAuthChildrenGuard
]

export const PegawaiServices = [
	PegawaiAuthChildrenService
]

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		PegawaiCdkModules,
		PegawaiMatModules,
		
		XModule,
		BukuModule,
		PegawaiRoutingModule
	],
	declarations: [
		...PegawaiComponents,
	],
	entryComponents: [
		...PegawaiComponents
	],
	exports: [
		...PegawaiComponents
	],
	providers: [
		...PegawaiServices,
		...PegawaiGuards
	]
})
export class PegawaiModule { }
