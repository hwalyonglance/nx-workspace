import { Router } from 'express';

import { BukuRouter } from './buku';
import { KategoriRouter } from './kategori';
import { KeranjangRouter } from './keranjang';
import { KonsumenRouter } from './konsumen';
import { PegawaiRouter } from './pegawai';
import { PenerbitRouter } from './penerbit';

const FileIndexRouter: Router = Router();

FileIndexRouter
	.use('/buku', BukuRouter)
	.use('/kategori', KategoriRouter)
	.use('/keranjang', KeranjangRouter)
	.use('/konsumen', KonsumenRouter)
	.use('/pegawai', PegawaiRouter)
	.use('/penerbit', PenerbitRouter)

export { FileIndexRouter }
