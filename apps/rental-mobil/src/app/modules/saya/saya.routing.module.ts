import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SayaComponent } from './saya.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent_ } from './components/_nav/_nav.component';
import { SewaFormComponent } from './components/sewa-form/sewa-form.component';

import { SayaChildrenGuard } from './guards/saya-children.guard';

export const SayaComponents: any[] = [
	SayaComponent,
	DashboardComponent,
	NavComponent_,
	SewaFormComponent
];

const routes: Routes = [
	{ path: 'saya', canActivateChild: [SayaChildrenGuard], children:[
		{ path: '', component: DashboardComponent, data:{type:'pengguna'} },
		{ path: 'sewa', children: [
			{ path: '', component: SewaFormComponent },
			{ path: ':id', component: SewaFormComponent },
			{ path: '**', pathMatch:'full', redirectTo: '/saya/sewa' }
		] },
		{ path: '**', pathMatch: 'full', redirectTo: '/saya' }
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SayaRoutingModule { }
