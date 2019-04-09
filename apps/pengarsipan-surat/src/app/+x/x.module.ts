import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FirebaseModule } from './x-firebase.module';
import { XCdkModules, XMatModules } from './x-material.module';

import { XConfigService } from './services/x-config.service';
import { XInputComponent } from './components/x-input/x-input.component';
import { XAkunFormComponent, XAkunFormDialogComponent } from './components/x-akun-form/x-akun-form.component';
import { XAkunViewTableComponent } from './components/x-akun-view-table/x-akun-view-table.component';
import { XContainerComponent } from './components/x-container/x-container.component';
import { XFooterComponent } from './components/x-footer/x-footer.component';
import { XKonfirmasiHapusDialogComponent } from './components/x-konfirmasi-hapus-dialog/x-konfirmasi-hapus-dialog.component';
import { XLoadingComponent } from './components/x-loading/x-loading.component';
import { XSidenavComponent } from './components/x-sidenav/x-sidenav.component';
import { XTopnavComponent } from './components/x-topnav/x-topnav.component';
import { XSignInFormComponent } from './components/x-sign-in-form/x-sign-in-form.component';
import { XAuthService } from './services/x-auth.service';
import { XFirebaseService } from './services/x-firebase.service';
import { XFormToolbarComponent } from './components/x-form-toolbar/x-form-toolbar.component';
import { XMatTableComponent } from './components/x-mat-table/x-mat-table.component';
import { XMatColumnComponent } from './components/x-mat-column/x-mat-column.component';
import { XKonfirmasiSimpanDialogComponent } from './components/x-konfirmasi-simpan-dialog/x-konfirmasi-simpan-dialog.component';
import { XRoleViewTableComponent } from './components/x-role-view-table/x-role-view-table.component';
import { XRoleFormComponent, XRoleFormDialogComponent } from './components/x-role-form/x-role-form.component';
import { XHttpClientService } from './services/x-http-client.service';

export const XComponents = [
	XAkunFormComponent, XAkunFormDialogComponent,
	XAkunViewTableComponent,
	XContainerComponent,
	XFooterComponent,
	XKonfirmasiHapusDialogComponent,
	XLoadingComponent,
	XInputComponent,
	XSignInFormComponent,
	XSidenavComponent,
	XTopnavComponent,
	XFormToolbarComponent,
	XMatTableComponent,
	XMatColumnComponent,
	XKonfirmasiSimpanDialogComponent,
	XRoleFormComponent, XRoleFormDialogComponent,
	XRoleViewTableComponent
];

export const XServices: any[] = [
	XAuthService,
	XConfigService,
	XFirebaseService,
	XHttpClientService
];

export const XModules: any[] = [
	FlexLayoutModule,
	FormsModule,
	HttpClientModule,
	ReactiveFormsModule,
	...FirebaseModule,
	...XCdkModules,
	...XMatModules
]

@NgModule({
	declarations: [...XComponents],
	entryComponents:[ ...XComponents ],
	exports:[
		...XComponents
	],
	imports: [
		CommonModule,
		RouterModule,
		...XModules
	],
	providers: [...XServices]
})
export class XModule {}
