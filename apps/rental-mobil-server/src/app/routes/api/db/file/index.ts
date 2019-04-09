import { Router } from 'express';
import { MobilRouter } from './mobil';
import { PenggunaRouter } from './pengguna';
import { SewaRouter } from './sewa';
import { SupirRouter } from './supir';

const FileIndexRouter: Router = Router();

FileIndexRouter
	.use('/mobil', MobilRouter)
	.use('/pengguna', PenggunaRouter)
	.use('/sewa', SewaRouter)
	.use('/supir', SupirRouter)

export { FileIndexRouter }
