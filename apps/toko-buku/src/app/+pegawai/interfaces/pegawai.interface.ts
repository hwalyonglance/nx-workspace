export interface Pegawai {
	idPegawai?: string;
	foto?: string;
	nama?: string;
	telepon?: string;
	jenisKelamin?: string;
	email?: string;
	password?: string;
	akses?: 'Kasir' | 'Logistik';
	alamat?: string;
}