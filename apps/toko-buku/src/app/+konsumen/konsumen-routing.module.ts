import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KonsumenAuthChildrenGuard } from './guards/konsumen-auth-children.guard';

import { KonsumenPendaftaranComponent } from './components/konsumen-pendaftaran/konsumen-pendaftaran.component';
import { KonsumenMasukComponent } from './components/konsumen-masuk/konsumen-masuk.component';
import { KonsumenPembelianComponent } from './components/konsumen-pembelian/konsumen-pembelian.component';
import { KonsumenKeranjangComponent } from './components/konsumen-keranjang/konsumen-keranjang.component';
import { KonsumenComponent } from './konsumen.component';

export const KonsumenRoutedComponents = [
	KonsumenComponent,
	KonsumenPendaftaranComponent,
	KonsumenMasukComponent,
	KonsumenPembelianComponent,
	KonsumenKeranjangComponent
]

const routes: Routes = [
	{ path: '', canActivateChild: [KonsumenAuthChildrenGuard], children: [
		{ path: '', component: KonsumenComponent, children: [
			{ path: 'masuk', component: KonsumenMasukComponent },
			{ path: 'keranjang', data: { level: 'konsumen' }, children: [
				{ path: '', component: KonsumenKeranjangComponent },
				{ path: ':noIsbn', component: KonsumenKeranjangComponent }
			] },
			{ path: 'pembelian', component: KonsumenPembelianComponent },
			{ path: 'pendaftaran', component: KonsumenPendaftaranComponent },
			{ path: '**', pathMatch: 'full', redirectTo: '/konsumen/masuk' }
		] },
	] }
];

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forChild(routes)
	],
	declarations: []
})
export class KonsumenRoutingModule { }
