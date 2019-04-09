import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { XCdkModules, XMatModules } from './x-material.module';

import { InputFileComponent } from './components/input-file/input-file.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { DatabaseService } from './services/database.service';
import { ConfigService } from './services/config.service';
import { FootComponent } from './components/foot/foot.component';
import { KonfirmasiHapusDialogComponent } from './components/konfirmasi-hapus-dialog/konfirmasi-hapus-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';

export const XComponents = [
	InputFileComponent,
	SignInFormComponent,
	FootComponent,
	KonfirmasiHapusDialogComponent,
	LoadingComponent
]

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		HttpClientModule,
		ReactiveFormsModule,
		XCdkModules,
		XMatModules
	],
	declarations: [
		...XComponents
	],
	entryComponents: [
		...XComponents
	],
	exports: [
		...XComponents
	],
	providers: [DatabaseService, ConfigService]
})
export class XModule { }
