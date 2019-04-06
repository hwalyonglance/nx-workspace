import { AngularFireModule }         from '@angular/fire';
import { AngularFireAuthModule }     from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { firebaseConfig } from '../../environments/firebase';

export const FirebaseModule = [
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	AngularFireStorageModule
];
