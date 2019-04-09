import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
	_MobilFormComponent, _MobilViewTableComponent,
	_PengembalianFormComponent,
	_PenggunaFormComponent, _PenggunaViewTableComponent,
	_SewaFormComponent, _SewaViewTableComponent,
	_SupirFormComponent, _SupirViewTableComponent,
	_UbahComponent
} from '../_dry/index';

import { PengurusComponent } from './pengurus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MobilComponent } from './components/mobil/mobil.component';
import { PenyewaanComponent } from './components/penyewaan/penyewaan.component';
import { PenggunaComponent } from './components/pengguna/pengguna.component';
import { SupirComponent } from './components/supir/supir.component';
import { NavComponent_ } from './components/_nav/_nav.component';

import { PengurusChildrenGuard } from './guards/pengurus-children.guard';

export const PengurusComponents: any[] = [
	PengurusComponent,
	DashboardComponent,
	MobilComponent,
	PenyewaanComponent,
	PenggunaComponent,
	SupirComponent,
	NavComponent_
]

const routes: Routes = [
	{ path: 'pengurus', canActivateChild: [PengurusChildrenGuard], component: PengurusComponent, children: [
		{ path: '', component: PenyewaanComponent, data: { type: 'pengurus' } },
		{ path: 'mobil', component: MobilComponent, children: [
			{ path: 'tambah', component: _MobilFormComponent, data: {type: 'tambah'} },
			{ path: 'lihat', component: _MobilViewTableComponent },
			{ path: 'ubah', children: [
				{ path: '', component: _UbahComponent, data: {type: 'ubah', jenis: 'mobil'} },
				{ path: ':id', component: _UbahComponent, data: {type: 'ubah', jenis: 'mobil'} }
			] },
			{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/mobil/lihat' }
		] },
		{ path: 'pengembalian/?:id', component: _PengembalianFormComponent },
		{ path: 'pengguna', component: PenggunaComponent, children: [
			{ path: 'tambah', component: _PenggunaFormComponent, data: {type: 'tambah'} },
			{ path: 'lihat', component: _PenggunaViewTableComponent },
			{ path: 'ubah', children: [
				{ path: '', component: _UbahComponent, data: {type: 'ubah', jenis: 'pengguna'} },
				{ path: ':id', component: _UbahComponent, data: {type: 'ubah', jenis: 'pengguna'} }
			]  },
			{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/pengguna/lihat' }
		] },
		{ path: 'supir', component: SupirComponent, children:[
			{ path: 'tambah', component: _SupirFormComponent, data: {type: 'tambah'} },
			{ path: 'lihat', component: _SupirViewTableComponent },
			{ path: 'ubah', children: [
				{ path: '', component: _UbahComponent, data: {type: 'ubah', jenis: 'supir'} },
				{ path: ':id', component: _UbahComponent, data: {type: 'ubah', jenis: 'supir'} }
			]  },
			{ path: '**', pathMatch: 'full', redirectTo: '/pengurus/pengurus/supir/lihat' }
		] },
		{ path: '**', pathMatch: 'full', redirectTo: '/pengurus' }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PengurusRoutingModule { }
