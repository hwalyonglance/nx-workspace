import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NavComponent_ } from '../_nav/_nav.component';

import { _ContainerComponent } from '../../modules/_dry/index';

@Component({
	selector: 'pp2-masuk',
	templateUrl: './masuk.component.html'
})
export class MasukComponent implements AfterViewInit, OnInit {
	@ViewChild('C_Pp2__Nav') C_Pp2__Nav: NavComponent_;
	@ViewChild('C_Pp2_Dry_Container') C_Pp2_Dry_Container: _ContainerComponent;
	level = this.$_ngActivatedRoute.data['value']['type'];
	masukForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		private $_ngRouter: Router,
		private $_ngActivatedRoute: ActivatedRoute
	) {
		this.masukForm = $_ngFormBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	}
	ngAfterViewInit(){
		this.C_Pp2__Nav.$C_Mat_Sidenav_Click$.subscribe(() => {this.C_Pp2_Dry_Container.C_Mat_Sidenav.toggle()})
	}
	ngOnInit() {}
	onSubmit(masukForm): void {
		localStorage['masuk' + this.level] = JSON.stringify({
			username: masukForm.username,
			password: masukForm.password,
			createdAt: Date.now()
		});
		this.$_ngRouter.navigate([this.level == 'Pengguna' ? 'saya' : 'pengurus']);
	}
	onKeyPress($event: KeyboardEvent): void {
		const number = ($event.charCode >= 48) && ($event.charCode <= 57);
		const _ = ($event.charCode === 95);
		const alphabet = ($event.charCode >= 97) && ($event.charCode <= 122);
		const ALPHABET = ($event.charCode >= 65) && ($event.charCode <= 90);
		const tab = $event.keyCode === 9;
		if ( !( number || _ || alphabet || ALPHABET || tab) ) {
			$event.preventDefault();
		}
	}
	onPaste( $event: any ): void {
		setTimeout(() => {
			const val = this.masukForm.get('username').value;
			const result = val.replace(/[\s\r\n\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\<\.\>\/\?]/gi, '');
			this.masukForm.get('username').setValue(result);
		}, 1);
	}
}
