import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XModule, XModules } from '../+x';
import { XSuratModule } from '../+x-surat';

import { AkunRoutedComponents, AkunRoutingModule } from './akun-routing.module';

export const AkunComponents: any[] = [
	...AkunRoutedComponents
]

@NgModule({
	declarations: [...AkunComponents],
	entryComponents: [...AkunComponents],
	exports:[...AkunComponents],
	imports: [
		CommonModule,
		...XModules,
		XModule,
		XSuratModule,
		AkunRoutingModule
	]
})
export class AkunModule { }
