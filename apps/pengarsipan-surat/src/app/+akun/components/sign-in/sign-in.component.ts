import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { XAuthService } from '../../../+x';

import { HakAkses } from '../../types';

@Component({
	selector: 'sign-in',
	template: `
		<x-container>
			<div style='margin: 64px auto;width: 400px;'>
				<x-sign-in-form ($submit$)='_submit($event)' [hakAkses]='level'></x-sign-in-form>
			</div>
		</x-container>
	`,
	styles: [],
	host: {
		class:'sign-in'
	}
})
export class SignInComponent implements OnInit {
	level: HakAkses = 'Pegawai';
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngRouter: Router,
		// private $_xAkun: AkunService,
		private $_xAuth: XAuthService<HakAkses>
	) {
		$_ngActivatedRoute.params.subscribe((params) => {
			this.level = params.level;
		})
	}
	ngOnInit() {}
	_submit($event){
		// this.$_xAkun.auth_['user'] = new BehaviorSubject<any>($event);
		this.$_ngRouter.navigate(['/akun']);
	}
}
