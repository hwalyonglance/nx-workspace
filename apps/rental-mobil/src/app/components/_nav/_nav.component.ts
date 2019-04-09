import { Component, isDevMode, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'pp2--nav',
	templateUrl: '_nav.component.html',
	styles: [``]
})
export class NavComponent_ implements OnInit {
	@Output() $C_Mat_Sidenav_Click$: EventEmitter<any> = new EventEmitter();
	saya;
	isDevMode = isDevMode;
	constructor(){
		try{
			this.saya = JSON.parse(localStorage.ggPengguna);
		}catch(e){
			this.saya = null;
		}
	}
	ngOnInit() {}
}
