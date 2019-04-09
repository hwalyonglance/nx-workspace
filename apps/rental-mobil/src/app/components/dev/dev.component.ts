import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { _ContainerComponent, _FileImageComponent, Pp2MediaQueryService, UploadService, DatabaseService, Mobil, MobilId, Upload } from '../../modules/_dry/index';
import { NavComponent_ } from '../_nav/_nav.component';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, Action, QueryFn, AngularFirestoreModule, AngularFirestoreProvider, AssociatedReference, DocumentChangeAction, EnablePersistenceToken, FIRESTORE_PROVIDERS, Reference, _getAngularFirestore, associateQuery, combineChange, combineChanges, docChanges, fromCollectionRef, fromDocRef, fromRef, sortedChanges, validateEventsArray } from 'angularfire2/firestore';

@Component({
	selector: 'pp2-dev',
	templateUrl: 'dev.component.html',
	styleUrls: ['dev.component.scss']
})

export class DevComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	@ViewChild('fi') C_Pp2_Dry_FI: _FileImageComponent;
	daftar = ('Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmo tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum').split(' ')
	sembunyikan = false;
	currentUpload: Upload;
	selectedFiles: FileList | null;
	_database = new DatabaseService<Mobil>(this.$_ngfFirestore);
	constructor(
		public $_Pp2MQ: Pp2MediaQueryService,
		public $_ngRouter: Router,
		@Inject(DOCUMENT) public $_ngDOCUMENT,
		public $_pp2Upload: UploadService,
		public $_ngfFirestore: AngularFirestore
	) {
		this._database.table = 'mobil'
	}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
		setInterval(() => {
			this.sembunyikan = !this.sembunyikan
		}, 4000)
		this.C_Pp2_Dry_FI.change.subscribe((e) => {
			this.selectedFiles = this.C_Pp2_Dry_FI.file;
		})
	}
	ngOnInit() {}
	uploadSingle(): Upload | any {
		const file = this.selectedFiles;
		console.log(file);
		console.log(file.item(0))
		this.$_pp2Upload.currentUpload = new Upload(file.item(0));
		// let gg = this.$_pp2Upload.pushUpload(this.$_pp2Upload.currentUpload);
		// console.log(gg);
		// return gg
	}
}