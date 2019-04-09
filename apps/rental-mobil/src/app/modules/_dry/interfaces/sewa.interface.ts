import { MobilId } from './mobil.interface';
import { SupirId } from './supir.interface';
import { PenggunaId } from './pengguna.interface';

export interface Sewa {
	denda?: number;
	id_mobil?: string;
	id_pengguna?: string;
	id_supir?: string;
	kondisi?: string;
	mobil?: MobilId;
	pengguna?: PenggunaId;
	supir?: SupirId;
	tglMulai?: number;
	tglSelesai?: number;
	tglSewaMulai?: number;
	tglSewaSelesai?: number;
	totalSewaHari?: number;
	totalSewaMobil?: number;
	totalSewaSupir?: number;
	totalSewa?: number;
	createdAt?: number;
	updatedAt?: number;
}

export interface SewaId extends Sewa{
	id?: string;
}
export { MobilId, PenggunaId, SupirId }
