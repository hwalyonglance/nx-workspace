import { Buku } from './buku.interface';

export interface IsiKeranjang{
	noIsbn?: string;
	$buku?: Buku;
	beli?: number;
	subtotal?: number;
}

export interface Keranjang{
	idKeranjang?: string;
	idKonsumen?: string;
	nama: string;
	$konsumen?: {
		idKonsumen?: string;
		foto?: string;
		nama?: string;
		kodePos?: string;
		telepon?: string;
		jenisKelamin?: string;
		email?: string;
		password?: string;
		alamat?: string;
		tanggalDaftar?: number;
	};
	idPegawai?: string;
	$pegawai?: {
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
	isi?: IsiKeranjang[];
	status: 'Dibawa' | 'Selesai';
	total?: number;
	createdAt?: number;
	updatedAt?: number;
};

export interface KeranjangDetailRow {
	detailRow: boolean;
	data: Keranjang;
}
