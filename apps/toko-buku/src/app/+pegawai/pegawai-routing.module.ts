import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PegawaiAuthChildrenGuard } from './guards/pegawai-auth-children.guard';

import { PegawaiComponent } from './pegawai.component';
import { PegawaiKategoriComponent } from './components/pegawai-kategori/pegawai-kategori.component';
import { PegawaiBukuComponent } from './components/pegawai-buku/pegawai-buku.component';
import { PegawaiPenerbitComponent } from './components/pegawai-penerbit/pegawai-penerbit.component';
import { PegawaiPembelianComponent } from './components/pegawai-pembelian/pegawai-pembelian.component';
import { PegawaiMasukComponent } from './components/pegawai-masuk/pegawai-masuk.component';
import { PegawaiKeranjangComponent } from './components/pegawai-keranjang/pegawai-keranjang.component';
import { PegawaiPendaftaranComponent } from './components/pegawai-pendaftaran/pegawai-pendaftaran.component';

export const PegawaiRoutedComponents = [
	PegawaiComponent,
	PegawaiKategoriComponent,
	PegawaiBukuComponent,
	PegawaiPenerbitComponent,
	PegawaiPembelianComponent,
	PegawaiMasukComponent,
	PegawaiKeranjangComponent,
	PegawaiPendaftaranComponent
]

const routes: Routes = [
	{ path: '', canActivateChild: [PegawaiAuthChildrenGuard], children: [
		{ path: '', component: PegawaiComponent, children: [
			{ path: 'kategori', component: PegawaiKategoriComponent },
			{ path: 'keranjang', data: { level: 'pegawai' }, children: [
				{ path: '', component: PegawaiKeranjangComponent },
				{ path: ':noIsbn', component: PegawaiKeranjangComponent }
			] },
			{ path: 'penerbit', component: PegawaiPenerbitComponent },
			{ path: 'buku', component: PegawaiBukuComponent },
			{ path: 'pembelian', component: PegawaiPembelianComponent },
			{ path: 'masuk', component: PegawaiMasukComponent },
			{ path: 'pendaftaran', component: PegawaiPendaftaranComponent },
			{ path: '**', pathMatch: 'full', redirectTo: 'buku' }
		] }
	] }
];

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forChild(routes)
	],
	declarations: []
})
export class PegawaiRoutingModule { }
