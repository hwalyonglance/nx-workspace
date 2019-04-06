import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';

import { AkunGuard } from './guards';
import { AkunService } from './services';
import { AkunComponent } from './components/akun/akun.component';
import { SuratDisposisiComponent } from './components/surat-disposisi/surat-disposisi.component';
import { SuratKeluarComponent } from './components/surat-keluar/surat-keluar.component';
import { SuratMasukComponent } from './components/surat-masuk/surat-masuk.component';
import { SuratJenisComponent } from './components/surat-jenis/surat-jenis.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


export const AkunRoutedComponents: any[] = [
	AkunComponent,
	SignInComponent,
	SignOutComponent,
	SuratDisposisiComponent,
	SuratKeluarComponent,
	SuratMasukComponent,
	SuratJenisComponent,
	HomeComponent,
	DashboardComponent,
	NotFoundComponent
]

export const AkunGuards: any[] = [
	AkunGuard
]

export const AkunServices: any[] = [
	AkunService
]

export const AkunRoutes: Routes = [
	{ path: '', component: SignInComponent },
	{ path: 'akun',				canActivate: [AkunGuard],	component: AkunComponent },
	{ path: 'surat',			canActivate: [AkunGuard],	children: [
		{ path: 'keluar',		canActivate: [AkunGuard],	component: SuratKeluarComponent },
		{ path: 'jenis',		canActivate: [AkunGuard],	component: SuratJenisComponent },
		{ path: 'disposisi',	canActivate: [AkunGuard],	component: SuratDisposisiComponent },
		{ path: '**', pathMatch: 'full', redirectTo: '/surat/keluar' }
	] },
	{ path: 'keluar', component: SignOutComponent }
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(AkunRoutes)],
	declarations: [],
	providers:[...AkunServices, ...AkunGuards]
})
export class AkunRoutingModule {}
