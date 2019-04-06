import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
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
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
