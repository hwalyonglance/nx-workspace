import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XModule, XModules } from '../+x';

import { SuratFormComponent, SuratFormDialogComponent } from './components/surat-form/surat-form.component';
import { SuratViewTableComponent } from './components/surat-view-table/surat-view-table.component';
import { DisposisiFormComponent, DisposisiFormDialogComponent } from './components/disposisi-form/disposisi-form.component';
import { DisposisiViewTableComponent } from './components/disposisi-view-table/disposisi-view-table.component';
import { SuratReportComponent, SuratReportDialogComponent } from './components/surat-report/surat-report.component';
import { JenisFormComponent, JenisFormDialogComponent } from './components/jenis-form/jenis-form.component';
import { JenisViewTableComponent } from './components/jenis-view-table/jenis-view-table.component';

export const XSuratComponents: any[] = [
	JenisFormComponent, JenisFormDialogComponent,
	JenisViewTableComponent,
	SuratFormComponent, SuratFormDialogComponent,
	SuratViewTableComponent,
	DisposisiFormComponent, DisposisiFormDialogComponent,
	DisposisiViewTableComponent,
	SuratReportComponent, SuratReportDialogComponent
];

@NgModule({
	declarations: [...XSuratComponents],
	entryComponents: [...XSuratComponents],
	exports: [...XSuratComponents],
	imports: [
		CommonModule,
		...XModules,
		XModule
	],
})
export class XSuratModule { }
