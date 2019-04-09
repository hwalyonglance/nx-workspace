import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PLATFORM_ID, APP_ID, Inject, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';

import { DryModule } from './modules/_dry/dry.module';

import { Pp2RoutingModule, Pp2Components } from './pp2.routing.module';

import { PengurusModule } from './modules/pengurus/pengurus.module';
import { SayaModule } from './modules/saya/saya.module';

import { Pp2Component } from './pp2.component';
import { NavComponent_ } from './components/_nav/_nav.component';

@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'pp2' }),
		HttpClientModule,
		PengurusModule,
		SayaModule,
		Pp2RoutingModule
	],
	declarations: [
		Pp2Component,
		NavComponent_,
		...Pp2Components
	],
	bootstrap: [Pp2Component]
})
export class Pp2Module {
	constructor(
		@Inject(PLATFORM_ID) private platformId: Object,
		@Inject(APP_ID) private appId: string
	) {
		const platform = isPlatformBrowser(platformId) ? 'on the browser' : 'in the server';
	}
}
