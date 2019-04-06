import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XModule, XModules } from '../+x';

import { CetakAkunComponent } from './components/cetak-akun/cetak-akun.component';
import { CetakAkunTabelComponent } from './components/cetak-akun-tabel/cetak-akun-tabel.component';
import { CetakSuratTabelComponent } from './components/cetak-surat-tabel/cetak-surat-tabel.component';
import { CetakSuratComponent } from './components/cetak-surat/cetak-surat.component';
import { CetakDisposisiComponent } from './components/cetak-disposisi/cetak-disposisi.component';
import { CetakDisposisiTabelComponent } from './components/cetak-disposisi-tabel/cetak-disposisi-tabel.component';
import { CetakHeaderComponent } from './components/cetak-header/cetak-header.component';

export const CetakComponents: any[] = [
	CetakAkunComponent, CetakAkunTabelComponent,
	CetakDisposisiComponent, CetakDisposisiTabelComponent,
	CetakSuratTabelComponent, CetakSuratComponent,
	CetakHeaderComponent
];

const routes: Routes = [
	{ path: 'akun', component: CetakAkunTabelComponent },
	{ path: 'akun/:uid', component: CetakAkunComponent },
	{ path: 'disposisi', component: CetakDisposisiTabelComponent },
	{ path: 'disposisi/:id', component: CetakDisposisiComponent },
	{ path: 'disposisi/uid/:uid', component: CetakDisposisiTabelComponent },
	{ path: 'disposisi/:kd/:ks/:td/:ts', component: CetakDisposisiTabelComponent },
	{ path: 'surat/', component: CetakSuratTabelComponent },
	{ path: 'surat/:id', component: CetakSuratComponent },
	{ path: 'surat/:tabel', component: CetakSuratTabelComponent },
	{ path: 'surat/:tabel/:id', component: CetakSuratComponent },
	{ path: 'surat/:tabel/uid/:uid', component: CetakSuratTabelComponent },
	{ path: 'surat/:tabel/:kd/:ks', component: CetakSuratTabelComponent },
];

@NgModule({
	declarations: [
		...CetakComponents
	],
	entryComponents: [
		...CetakComponents
	],
	exports: [
		...CetakComponents,
		RouterModule
	],
	imports: [
		CommonModule,
		...XModules,
		XModule,
		RouterModule.forChild(routes)
	],
})
export class CetakRoutingModule { }
