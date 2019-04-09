import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NavComponent_ } from '../_nav/_nav.component';

import { _ContainerComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-saya-dashboard',
	template: `
		<pp2-saya-nav #C_Pp2_Saya__Nav></pp2-saya-nav>
		<pp2-dry-container #C_Pp2_Dry_Container>
			<pp2-dry-sewaViewTable></pp2-dry-sewaViewTable>
		</pp2-dry-container>
	`
})
export class DashboardComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Saya__Nav') C_Pp2_Saya__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2_Saya__Nav.$C_Mat_Sidenav_Click$.subscribe(()=>{
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();
		})
	}
	ngOnInit() {}
}