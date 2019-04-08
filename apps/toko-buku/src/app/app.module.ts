import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from '@angular/service-worker';

import { IlmCdkModules, IlmMatModules } from './app-material.module';

import { AppRoutingModule, AppRoutedComponents } from './app-routing.module';
import { XModule } from './+x/x.module';
import { BukuModule } from './+buku/buku.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { TopnavComponent } from './_components/topnav/topnav.component';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { ContainerComponent } from './_components/container/container.component';

export const App_Components = [
	TopnavComponent,
	SidenavComponent,
	ContainerComponent
]

export const Components = [
	AppComponent,
	...AppRoutedComponents,
	...App_Components
]

@NgModule({
	bootstrap: [AppComponent],
	declarations: [...Components],
	entryComponents: [...Components],
	exports: [...Components],
	imports: [
		BrowserModule.withServerTransition({appId: 'ilm'}),
		BrowserAnimationsModule,
		FlexLayoutModule,
		NoopAnimationsModule,
		IlmCdkModules,
		IlmMatModules,

		XModule,
		BukuModule,

		AppRoutingModule,
		
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
	],
	providers: []
})
export class AppModule { }
	