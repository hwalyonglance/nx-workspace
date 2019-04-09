import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';


import { XKonfirmasiHapusDialogComponent } from '../components/x-konfirmasi-hapus-dialog/x-konfirmasi-hapus-dialog.component';

export class XFormAutocomplete<T> {
	dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
	get data(): T[] { return this.dataChange.getValue().slice(); }
	set data(data: T[]){ this.dataChange.next(data) }
	get valid(): Observable<number> {
		return this.filteredOptions.pipe(switchMap((d, i) => of(i)))
	}

	filteredOptions: Observable<T[]>;

	constructor(
		public control: AbstractControl, public _data: T[] = []
	){
		this.dataChange = new BehaviorSubject<T[]>(_data);
		this.filteredOptions = control.valueChanges.pipe(
			startWith(''),
			map(v => {
				return v ? this.filter(v) : this.data;
			})
		)
	}
	filter(v): T[] {
		return this.data.filter(option => {
			return Object.values(option).join('').toLowerCase().indexOf(Object.values(v).join('').toLowerCase()) != -1
		}) || [];
	}
}

export class XFormPassword {
	icon: 'visibility' | 'visibility_off'= 'visibility';
	tooltip: 'Tampilkan' | 'Sembunyikan'= 'Tampilkan';
	type: 'password' | 'text'= 'password';
	clone() {
		return new XFormPassword()
	}
	toggle () {
		this.type = this.type == 'text' ? 'password' : 'text';
		this.tooltip = this.tooltip == 'Tampilkan' ? 'Sembunyikan' : 'Tampilkan';
		this.icon = this.icon == 'visibility' ? 'visibility_off' : 'visibility';
	}
}

export class XFormDialog {
	private _$dialogRef_XKonfirmasiHapusDialog: MatDialogRef<XKonfirmasiHapusDialogComponent>
	private _$dialogRef_Form: MatDialogRef<any>;
	constructor(
		private $_matDialog: MatDialog
	){}
	hapus(data, cb){
		this._$dialogRef_XKonfirmasiHapusDialog = this.$_matDialog.open(XKonfirmasiHapusDialogComponent, {
			data,
			disableClose: true,
			width: '400px'
		})
		this._$dialogRef_XKonfirmasiHapusDialog.componentInstance
			.$on$.subscribe((res: 'O' | 'X')=> {
				cb('O')
				this._$dialogRef_XKonfirmasiHapusDialog.close()
				this._$dialogRef_XKonfirmasiHapusDialog = null
			})
	}
	buka<T=any>(FormComponent: any, config: MatDialogConfig): MatDialogRef<T> {
		this._$dialogRef_Form = this.$_matDialog.open(FormComponent, config)
		this._$dialogRef_Form.componentInstance
			.$on$.subscribe(e => {
				if ( e == 'close' ) {
					this._$dialogRef_Form.close()
					this._$dialogRef_Form = null
				}
			})
		return this._$dialogRef_Form;
	}
}
