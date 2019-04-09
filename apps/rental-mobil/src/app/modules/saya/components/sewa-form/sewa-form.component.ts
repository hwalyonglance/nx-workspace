import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

import { _ContainerComponent, _SewaFormComponent } from '../../../_dry/index';

@Component({
	selector: 'pp2-sewaForm',
	template: `
		<pp2-saya-nav #C_Pp2_Saya__Nav></pp2-saya-nav>
		<pp2-dry-container #C_Pp2_Dry_Container>
			<pp2-dry-sewaForm #C_Pp2_Dry_SewaForm></pp2-dry-sewaForm>
		</pp2-dry-container>
	`
})
export class SewaFormComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Saya__Nav') C_Pp2_Saya__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Pp2_Dry_SewaForm') C_Pp2_Dry_SewaForm: _SewaFormComponent;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2_Saya__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {
			this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle()
		})
	}
	ngOnInit() {}
}
