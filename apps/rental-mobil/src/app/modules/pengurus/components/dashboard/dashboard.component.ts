import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { NavComponent_ } from '../_nav/_nav.component';

@Component({
	selector: 'pp2-pengurus-dashboard',
	template: `
		<pp2-pengurus-nav #C_Pp2_Pengurus__Nav></pp2-pengurus-nav>
	`
})
export class DashboardComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2_Pengurus__Nav') C_Pp2_Pengurus__Nav: NavComponent_;
	constructor() {}
	ngOnInit() {}
	ngAfterViewInit(){
		this.C_Pp2_Pengurus__Nav.$C_Mat_Sidenav_Click$.subscribe(()=>{
			
		})
	}
}
