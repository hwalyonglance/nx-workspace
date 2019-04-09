import { AngularFireModule }         from '@angular/fire';
import { AngularFireAuthModule }     from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from '../../../environments/firebase';

export const FirebaseModule = [
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFirestoreModule.enablePersistence()
];
