export interface Supir {
	id?: string;
	nama?: string;
	noSIM?: string;
	noHP?: string;
	jk?: string;
	hargaSewa?: string;
	alamat?: string;
	email?: string;
	image?: string;
	_status?: 'Tersedia' | 'Dipesan' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: number;
	createdAt?: number;
	updatedAt?: number;
}
