import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';
import { PenggunaDaftarComponent } from './components/pengguna-daftar/pengguna-daftar.component';
import { MobilViewGridComponent } from './components/mobil-view-grid/mobil-view-grid.component';
import { MasukComponent } from './components/masuk/masuk.component';
import { SupirViewGridComponent } from './components/supir-view-grid/supir-view-grid.component';

export const Pp2Components = [
	HomeComponent,
	DevComponent,
	PenggunaDaftarComponent,
	MobilViewGridComponent,
	MasukComponent,
	SupirViewGridComponent
];

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'masuk', children:[
		{ path: 'pengguna', component: MasukComponent, data: {type: 'Pengguna'} },
		{ path: 'pengurus', component: MasukComponent, data: {type: 'Pengurus'} },
		{ path: '**', pathMatch: 'full', redirectTo: '/masuk/pengguna' }
	] },
	{ path: 'pendaftaran', children: [
		{ path: 'pengguna', component: PenggunaDaftarComponent, data: {type: 'tambah'} },
		{ path: '**', pathMatch: 'full', redirectTo: '/pendaftaran/pengguna' }
	]},
	{ path: 'dev', component: DevComponent },
	{ path: 'mobil', component: MobilViewGridComponent },
	{ path: 'supir', component: SupirViewGridComponent },
	{ path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class Pp2RoutingModule { }
