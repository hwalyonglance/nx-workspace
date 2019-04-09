export interface Mobil {
	nama?: string;
	platNo?: string;
	kursi?: number;
	bensin?: string;
	hargaSewa?: number;
	image?: string;
	kondisi?: string;
	_status?: 'Tersedia' | 'Dipesan' | 'Disewa';
	_disewa?: number;
	_disewaSampai?: number;
	createdAt?: number;
	updatedAt?: number;
}

export interface MobilId extends Mobil {
	id?: string;
}
