import { EventEmitter, Injectable } from '@angular/core';
import { Upload } from '../classes/upload.class';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

	basePath = 'uploads';
	currentUpload: Upload;
	uploadsRef: AngularFirestoreCollection<Upload>;
	uploads: any;
	$upload$: EventEmitter<Upload> = new EventEmitter<Upload>();
	selectedFiles: FileList | null;

	constructor(private $_ngfFirestore: AngularFirestore) { }

	getUploads(): Observable<Upload[]> {
		this.uploads = this.$_ngfFirestore.collection(this.basePath).snapshotChanges().map((actions) => {
			return actions.map((a) => {
				const data = a.payload.doc.data();
				const $key = a.payload.doc.id;
				return { $key, ...data };
			});
		});
		return this.uploads;
	}

	deleteUpload(upload: Upload): Promise<void> {
		return this.deleteFileData(upload.$key)
		.then( () => {
			this.deleteFileStorage(upload.name);
		})
		.catch((error) => console.log(error));
	}

	// Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
	pushUpload(): Upload {
		this.currentUpload;
		const storageRef = firebase.storage().ref();
		const uploadTask = storageRef.child(`${this.basePath}/${this.currentUpload.file.name}`).put(this.currentUpload.file);

		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
				// upload in progress
				const snap = snapshot;
				this.currentUpload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
			}, (error) => {
				// upload failed
				console.log(error);
			}, () => {
				// upload success
				if (uploadTask.snapshot.downloadURL) {
					this.currentUpload.url = uploadTask.snapshot.downloadURL;
					this.currentUpload.name = this.currentUpload.file.name;
					this.saveFileData();
					this.$upload$.next(this.currentUpload);
				} else {
					console.error('No download URL!');
				}
			},
		);
		return this.currentUpload;
	}
	// Writes the file details to the realtime $_ngfFirestore
	private saveFileData(): Promise<firebase.firestore.DocumentReference> {
		return this.$_ngfFirestore.collection(`uploads`).doc(this.currentUpload.file.type.split('/')[0]).collection(this.basePath).add(this.currentUpload);
	}
	// Writes the file details to the realtime $_ngfFirestore
	private deleteFileData(key: string): Promise<void> {
		return this.$_ngfFirestore.collection(`${this.basePath}/`).doc(key).delete();
	}
	// Firebase files must have unique names in their respective storage dir
	// So the name serves as a unique key
	private deleteFileStorage(name: string): Promise<any> {
		const storageRef = firebase.storage().ref();
		return storageRef.child(`${this.basePath}/${name}`).delete()
	}
	detectFiles($event: Event): void {
		console.log($event)
		this.selectedFiles = ($event.target as HTMLInputElement).files;
	}
}
