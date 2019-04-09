import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'sign-in-form',
	templateUrl: './sign-in-form.component.html',
	styles: []
})
export class SignInFormComponent implements OnInit {
	@Input() level: string;
	get value(){
		return this.signInForm.value;
	}
	get valid(){
		return this.signInForm.valid;
	}
	_passwordType: 'password' | 'text' = 'password';
	_passwordSuffixTooltip: 'Tampilkan' | 'Sembunyikan' = 'Tampilkan';
	_passwordVisibility: 'visibility' | 'visibility_off' = 'visibility';
	signInForm: FormGroup;
	constructor(
		$_ngFormBuilder: FormBuilder
	) {
		this.signInForm = $_ngFormBuilder.group({
			email: [''],
			password: ['']
		})
	}
	ngOnInit() {
	}
	togglePassword(){
		this._passwordType = this._passwordType == 'password' ? 'text' : 'password';
		this._passwordSuffixTooltip = this._passwordSuffixTooltip == 'Tampilkan' ? 'Sembunyikan' : 'Tampilkan';
		this._passwordVisibility = this._passwordVisibility == 'visibility' ? 'visibility_off' : 'visibility';
	}
}
