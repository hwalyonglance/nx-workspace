import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material';

import { _ContainerComponent } from '../../../_dry/index';

import { NavComponent_ } from '../_nav/_nav.component';

@Component({
	selector: 'pp2-pengurus-mobil',
	styleUrls: [`mobil.component.scss`],
	template: `
		<div class='pp2-pengurus-mobil'>
			<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
			<pp2-dry-container #C_Pp2_Dry_Container>
				<mat-tab-group #C_Mat_TabGroup backgroundColor="primary" color="accent" mat-stretch-tabs>
					<mat-tab (click)='$_ngRouter.navigate(["pengurus", "mobil", "lihat"])'>
						<ng-template mat-tab-label>Lihat</ng-template>
					</mat-tab>
					<mat-tab (click)='$_ngRouter.navigate(["pengurus", "mobil", "tambah"])'>
						<ng-template mat-tab-label>Tambah</ng-template>
					</mat-tab>
					<mat-tab (click)='$_ngRouter.navigate(["pengurus", "mobil", "ubah"])'>
						<ng-template mat-tab-label>Ubah</ng-template>
					</mat-tab>
				</mat-tab-group>
				<div class='dm-container' tabindex='2'>
					<router-outlet></router-outlet>
				</div>
			</pp2-dry-container>
		</div>
	`
})
export class MobilComponent implements OnInit, AfterViewInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Mat_TabGroup') C_Mat_TabGroup: MatTabGroup;
	constructor(
		public $_ngRouter: Router
	){}
	ngAfterViewInit(){
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(()=>{
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle()
		})
		const [_, a, b, c, ...d] = this.$_ngRouter.url.split('/')
		this.C_Mat_TabGroup.selectedIndex = c === 'lihat' ? 0 : (c === 'tambah' ? 1 :2);
		this.C_Mat_TabGroup.selectedIndexChange.subscribe((i)=>{
			this.$_ngRouter.navigate(['pengurus', 'mobil', i == 0 ? 'lihat' : (i == 1 ? 'tambah' : 'ubah')])
		})
	}
	ngOnInit() {}
}
