import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DevComponent } from './components/dev/dev.component';
import { IlmBukuLihatComponent } from './components/buku-lihat/buku-lihat.component';
import { FooComponent } from './components/foo/foo.component';
import { BarComponent } from './components/bar/bar.component';
import { BazComponent } from './components/baz/baz.component';

export const AppRoutedComponents = [
	HomeComponent,
	DevComponent,

	IlmBukuLihatComponent,
	FooComponent, BarComponent, BazComponent
]

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'dev', component: DevComponent, children: [
		{ path: 'foo', component: FooComponent },
		{ path: 'bar', component: BarComponent },
		{ path: 'baz', component: BazComponent }
	] },
	{ path: 'admin', children: [
		{ path: 'pegawai', component: DevComponent },
		{ path: '**', pathMatch: 'full', redirectTo: '/admin/pegawai' }
	] },
	{ path: 'kategori', children: [
		{ path: '', component: IlmBukuLihatComponent },
		{ path: ':kategori', component: IlmBukuLihatComponent }
	] },
	{ path: 'konsumen', loadChildren: './+konsumen/konsumen.module#KonsumenModule' },
	{ path: 'pegawai', loadChildren: './+pegawai/pegawai.module#PegawaiModule' },
	{ path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(routes)
	],
	declarations: []
})
export class AppRoutingModule { }
