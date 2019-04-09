import * as firebase from 'firebase';

export interface Akun<HakAkses> {
	id?: string;
	uid?: string;
	provider?: string;
	photo?: {
		base64: string;
		name: string;
		URL: string;
	};
	displayName?: string;
	email?: string;
	password?: string;
	role?: HakAkses;
	createdAt?: firebase.firestore.FieldValue;
	updatedAt?: firebase.firestore.FieldValue;
}
