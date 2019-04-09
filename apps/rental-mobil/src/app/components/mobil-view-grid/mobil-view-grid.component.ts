import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _ContainerComponent, _MobilViewGridComponent } from '../../modules/_dry/index';

@Component({
	selector: 'pp2-mobilViewGrid',
	template: `
		<pp2--nav #C_Pp2__Nav></pp2--nav>
		<pp2-dry-container #C_Pp2_Dry_Container>
			<pp2-dry-mobilViewGrid #C_Pp2_Dry_MobilViewGrid></pp2-dry-mobilViewGrid>
		</pp2-dry-container>
	`
})
export class MobilViewGridComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Pp2_Dry_MobilViewGrid') C_Pp2_Dry_MobilViewGrid: _MobilViewGridComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
	}
	ngOnInit() {}
}
