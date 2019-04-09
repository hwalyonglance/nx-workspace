import { NgModule } from '@angular/core';

import { DryModule } from '../_dry/dry.module';
import { FirebaseModule } from '../_dry/firebase.module';

import { PengurusRoutingModule, PengurusComponents } from './pengurus.routing.module';

import { PengurusChildrenGuard } from './guards/pengurus-children.guard';

export const PengurusDirectives = [];

export const PengurusServices = [
	PengurusChildrenGuard
];

@NgModule({
	imports: [
		DryModule,
		...FirebaseModule,
		PengurusRoutingModule
	],
	exports: [
		DryModule
	],
	declarations: [
		...PengurusComponents,
		...PengurusDirectives
	],
	providers: [
		...PengurusServices
	],
})
export class PengurusModule { }
