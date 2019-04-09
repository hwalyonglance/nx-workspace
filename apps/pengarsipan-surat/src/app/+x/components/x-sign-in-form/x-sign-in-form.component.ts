import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { XAuthService } from '../../services';
import { XFormPassword } from '../../classes';

@Component({
	selector: 'x-sign-in-form',
	template: `
		<mat-card>
			<mat-card-header>
				<mat-card-title>
					{{ hakAkses }}
				</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				<form [formGroup]='signInForm' fxLayout='column'>
					<!-- <div class='login-google pointer' (click)='$OAuth$.next("google")' fxFlex='56px'> Google </div> -->
					<div fxFlex>
						<mat-form-field class='full-width'>
							<input email formControlName='email' matInput name='email' placeholder='Email' required type='email'>
							<mat-error *ngIf=' signInForm.get("email").hasError("required") ' align='start'>
								Email tidak boleh kosong
							</mat-error>
							<mat-error *ngIf=' signInForm.get("email").hasError("email") && !signInForm.get("email").hasError("required") '>
								Ini bukan alamat Email
							</mat-error>
						</mat-form-field>
					</div>
					<div fxFlex>
						<mat-form-field class='full-width'>
							<input formControlName='password' matInput name='password' placeholder='Password' required [type]='_password.type'>
							<button mat-button mat-icon-button matSuffix>
								<mat-icon (click)='_password.toggle()' [matTooltip]='_password.tooltip + " password"'>{{ _password.icon }}</mat-icon>
							</button>
						</mat-form-field>
					</div>
				</form>
			</mat-card-content>
			<mat-card-actions align='end'>
				<!-- <button (click)='$_xAuth.signOut()' mat-button> out </button> -->
				<button color='primary' (click)='submit()' [disabled]='!valid' mat-button matTooltip='Masuk'>
					Masuk
				</button>
			</mat-card-actions>
		</mat-card>
	`,
	styles: [`
		.login-google{
			border: 1px solid #95989A;
			font-size: 44px;
			text-align: center;
			user-select: none;
		}
	`],
	host: {
		class: 'x-sign-in-form'
	}
})
export class XSignInFormComponent implements OnInit {
	_password: XFormPassword = new XFormPassword()
	@Input() hakAkses: string = 'Pegawai';
	@Output() $OAuth$: EventEmitter<'google'> = new EventEmitter<'google'>();
	@Output() $submit$: EventEmitter<any> = new EventEmitter<any>();
	get value(){ return this.signInForm.value; }
	get valid(){ return this.signInForm.valid; }
	signInForm: FormGroup;
	constructor(
		private $_ngFormBuilder: FormBuilder,
		public $_xAuth: XAuthService<any>,
		private $_ngRouter: Router
	) {
		this.signInForm = $_ngFormBuilder.group({
			email: ['', [Validators.email, Validators.maxLength(32), Validators.required]],
			password: ['', [Validators.maxLength(16), Validators.required]]
		})
	}
	ngOnInit() {}
	submit(){
		this.$_ngRouter.navigate(['/disposisi'])
		localStorage.setItem('akun', JSON.stringify(this.signInForm.value))
		this.$submit$.next(this.signInForm.value)
	}
}
