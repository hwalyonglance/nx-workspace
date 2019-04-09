import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { _ContainerComponent } from '../_container/_container.component';
import { _FileImageComponent } from '../../../_dry/components/_file-image/_file-image.component';

import { ConfigService } from '../../services/config.service';
import { Pp2MediaQueryService } from '../../../_dry/services/Pp2-media-query.service';

@Component({
	selector: "pp2-dry-pengembalianForm",
	templateUrl: "_pengembalian-form.component.html",
	styles: [`
		.pp2-dry-pengembalianForm-container{
			height: 100%;
			width: 100%;
		}
	`]
})
export class _PengembalianFormComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(_ContainerComponent) C_Pp2_Dry_Container: _ContainerComponent;

	type: string;
	label: string;
	disable: boolean = false;
	pengembalianForm: FormGroup;
	constructor(
		private $_matSnackBar: MatSnackBar,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		public $_pp2Conf: ConfigService
	) {
		this.type = $_ngActivatedRoute.data['value']['type'];
	}
	ngAfterViewInit() { }
	ngOnDestroy() {}
	ngOnInit() {
		const id = this.$_ngActivatedRoute.snapshot.params['id'];
		this.pengembalianForm = this.$_ngFormBuilder.group({
			id: [''],
			kondisi: [''],
			denda: ['']
		});
		if ( id ) {
			this.$_ngHttpClient.get(this.$_pp2Conf.baseUrl + '/api/db/file/pengembalian/get/' + id)
				.subscribe((pengembalian) => {
					this.pengembalianForm.setValue({
						id: '',
						kondisi: '',
						denda: ''
					})
				})
		}
	}

	pp2OnSubmit(e: Event, val): void {
		e.preventDefault();
		try {
		} catch (e) {
			const data = new FormData();
			data.append('data', val)
			this.$_ngHttpClient.put(this.$_pp2Conf.baseUrl + '/api/db/file/pengembalian/put', data)
			// this.$_ngRouter.navigate(['su','pengembalian','lihat'])
			this.$_ngRouter.navigate([''])
			// this.$_matSnackBar.open('Akun Berhasil Didaftarkan')
			// setTimeout(() => {
			// 	this.$_matSnackBar.dismiss();
			// }, 4000)
		}
	}
}
