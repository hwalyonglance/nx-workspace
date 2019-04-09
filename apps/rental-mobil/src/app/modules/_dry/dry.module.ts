import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

import { FirebaseModule } from './firebase.module';
import { RequireModule } from './require.module';

import { _ContainerComponent } from './components/_container/_container.component';
import { _KonfirmasiHapusDialogComponent } from './components/_konfirmasi-hapus-dialog/_konfirmasi-hapus-dialog.component';
import { _NavComponent } from './components/_nav/_nav.component';
import { _SidenavComponent } from './components/_sidenav/_sidenav.component';
import { _FileImageComponent } from './components/_file-image/_file-image.component';
import { _SupirFormComponent } from './components/_supir-form/_supir-form.component';
import { _SupirViewTableComponent } from './components/_supir-view-table/_supir-view-table.component';
import { _MobilFormComponent } from './components/_mobil-form/_mobil-form.component';
import { _MobilViewTableComponent } from './components/_mobil-view-table/_mobil-view-table.component';
import { _PenggunaFormComponent } from './components/_pengguna-form/_pengguna-form.component';
import { _PenggunaViewTableComponent } from './components/_pengguna-view-table/_pengguna-view-table.component';
import { _MobilViewGridComponent } from './components/_mobil-view-grid/_mobil-view-grid.component';
import { _PengembalianFormComponent } from './components/_pengembalian-form/_pengembalian-form.component';
import { _SewaFormComponent } from './components/_sewa-form/_sewa-form.component';
import { _SewaViewTableComponent } from './components/_sewa-view-table/_sewa-view-table.component';
import { _SupirViewGridComponent } from './components/_supir-view-grid/_supir-view-grid.component';
import { _UbahComponent } from './components/_ubah/_ubah.component';

import { GridDirective } from './directives/grid.directive';

import { ConfigService } from './services/config.service';
import { DatabaseService } from './services/database.service';
import { Pp2MediaQueryService } from './services/Pp2-media-query.service';
import { Pp2Service } from './services/pp2.service';
import { UploadService } from './services/upload.service';

export const DryComponents = [
	_ContainerComponent,
	_KonfirmasiHapusDialogComponent,
	_NavComponent,
	_SidenavComponent,
	_FileImageComponent,

	_SupirFormComponent,
	_SupirViewTableComponent,

	_MobilFormComponent,
	_MobilViewTableComponent,
	_MobilViewGridComponent,

	_PengembalianFormComponent,

	_SewaFormComponent,
	_SewaViewTableComponent,
	_SupirViewGridComponent,

	_PenggunaFormComponent,
	_PenggunaViewTableComponent,

	_UbahComponent
];

export const DryDirectives = [
	GridDirective
];

export const DryServices = [
	ConfigService,
	DatabaseService,
	Pp2MediaQueryService,
	Pp2Service,
	UploadService
];

@NgModule({
	declarations: [
		...DryComponents,
		...DryDirectives
	],
	entryComponents:[
		...DryComponents
	],
	exports: [
		...RequireModule,
		...DryComponents
	],
	imports: [
		...RequireModule,
		...FirebaseModule
	],
	providers: [
		...DryServices,
	]

})
export class DryModule { }
