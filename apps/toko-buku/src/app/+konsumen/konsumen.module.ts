import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { XModule } from '../+x/x.module';
import { BukuModule } from '../+buku/buku.module';
import { KonsumenCdkModules, KonsumenMatModules } from './konsumen-material.module';

import { KonsumenRoutedComponents, KonsumenRoutingModule } from './konsumen-routing.module';

import { KonsumenAuthChildrenGuard } from './guards/konsumen-auth-children.guard';
import { KonsumenAuthChildrenService } from './services/konsumen-auth-children.service';


import { KonsumenFormComponent } from './_components/konsumen-form/konsumen-form.component';
import { KonsumenContainerComponent } from './_components/konsumen-container/konsumen-container.component';
import { KonsumenSidenavComponent } from './_components/konsumen-sidenav/konsumen-sidenav.component';
import { KonsumenTopnavComponent } from './_components/konsumen-topnav/konsumen-topnav.component';
import { KonsumenMasukFormComponent } from './_components/konsumen-masuk-form/konsumen-masuk-form.component';

export const KonsumenComponents = [
	...KonsumenRoutedComponents,
	KonsumenFormComponent,
	KonsumenContainerComponent,
	KonsumenSidenavComponent,
	KonsumenTopnavComponent,
	KonsumenMasukFormComponent
]

export const KonsumenGuards = [
	KonsumenAuthChildrenGuard
]

export const KonsumenServices = [
	KonsumenAuthChildrenService
]

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		KonsumenCdkModules,
		KonsumenMatModules,
		XModule,
		BukuModule,
		KonsumenRoutingModule
	],
	declarations: [...KonsumenComponents],
	entryComponents:[...KonsumenComponents],
	exports:[...KonsumenComponents],
	providers: [
		...KonsumenGuards,
		...KonsumenServices
	]
})
export class KonsumenModule { }
