import { AngularFireModule }         from 'angularfire2';
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { firebaseConfig } from '../../../environments/firebase';

export const FirebaseModule = [
	AngularFireAuthModule,
	AngularFireDatabaseModule,
	AngularFireModule.initializeApp(firebaseConfig),
	AngularFirestoreModule.enablePersistence()
];
