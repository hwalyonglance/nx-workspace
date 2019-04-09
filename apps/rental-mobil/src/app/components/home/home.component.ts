import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { _ContainerComponent } from '../../modules/_dry/index';
import { NavComponent_ } from '../_nav/_nav.component';

@Component({
	selector: 'pp2-home',
	templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	constructor() {}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle();})
	}
	ngOnInit(){}
}
