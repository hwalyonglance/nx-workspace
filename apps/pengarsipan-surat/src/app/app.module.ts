import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { XModule, XModules } from './+x';

import { AppRoutedComponents, AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		...AppRoutedComponents
	],
	imports: [
		BrowserModule.withServerTransition({appId: 'ukm'}),
		AngularFirestoreModule.enablePersistence(),
		NoopAnimationsModule,
		XModule,
		...XModules,
		AppRoutingModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
