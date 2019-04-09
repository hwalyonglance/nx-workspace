import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const AppRoutedComponents: any[] = [
]

export const AppRoutes: Routes = [
	{ path: '', loadChildren: './+akun/akun.module#AkunModule' },
	{ path: 'cetak', loadChildren: './+cetak/cetak-routing.module#CetakRoutingModule' },
	{ path: '**', pathMatch:'full', redirectTo:'/' }
];

@NgModule({
	imports: [RouterModule.forRoot(AppRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
