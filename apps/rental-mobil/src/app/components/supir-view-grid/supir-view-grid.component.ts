import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _ContainerComponent, _SupirViewGridComponent } from '../../modules/_dry/index';

@Component({
	selector: 'pp2-supirViewGrid',
	template: `
		<pp2--nav #C_Pp2__Nav></pp2--nav>
		<pp2-dry-container #C_Pp2_Dry_Container>
			<pp2-dry-supirViewGrid #C_Pp2_Dry_SupirViewGrid></pp2-dry-supirViewGrid>
		</pp2-dry-container>
	`
})
export class SupirViewGridComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Pp2_Dry_SupirViewGrid') C_Pp2_Dry_SupirViewGrid: _SupirViewGridComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
	}
	ngOnInit() {}
}
