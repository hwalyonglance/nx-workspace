import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { XAuthService } from '../../../+x';

import { HakAkses } from '../../types';

@Component({
	selector: 'sign-out',
	template: ``,
	styles: []
})
export class SignOutComponent implements OnInit {
	constructor(
		private $_matSnackBar: MatSnackBar,
		private $_ngRouter: Router,
		private $_xAuth: XAuthService<HakAkses>
	) {
		$_ngRouter.navigate(['/a/masuk']);
		$_matSnackBar.open('Anda Berhasil Keluar')._dismissAfter(4000)
		$_xAuth.signOut();
	}
	ngOnInit() {}
}
