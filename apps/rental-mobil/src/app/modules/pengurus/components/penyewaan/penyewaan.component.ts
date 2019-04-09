import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { _ContainerComponent } from '../../../_dry/index';

import { NavComponent_ } from '../_nav/_nav.component';

@Component({
	selector: 'pp2-pengurus-penyewaan',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
		<pp2-dry-container #C_Pp2_Dry_Container>
			<pp2-dry-sewaViewTable></pp2-dry-sewaViewTable>
		</pp2-dry-container>
	`
})
export class PenyewaanComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(()=>{
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnInit() {}
}