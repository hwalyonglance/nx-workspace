import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DateAdapter, MatCheckbox, MatDatepicker, MatSnackBar, NativeDateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { MobilId, PenggunaId, SewaId, SupirId } from '../../interfaces/sewa.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';
import { Pp2Service } from '../../services/pp2.service';

@Component({
	selector: 'pp2-dry-sewaForm',
	templateUrl: '_sewa-form.component.html',
	styles: [`
		.pp2-dry-sewaForm-container{
			 height: 100%;
			 width: 100%;
		}
		.padd-15px {
			padding: 15px 0;
		}
	`]
})
export class _SewaFormComponent implements AfterViewInit, OnInit {
	@ViewChild('butuhSupir') _butuhSupir: MatCheckbox;
	@ViewChild('mulai') __mulai: MatDatepicker<Date>;
	@ViewChild('selesai') __selesai: MatDatepicker<Date>;

	private tgl_mulai_val;

	IdMobil: string;
	IdSupir: string;
	tglMulai;
	tglSelesai;

	minDate = new Date();
	get Mobil$() : MobilId[] { return this.$_pp2MobilDatabase.data };
	get Supir$() : SupirId[] { return this.$_pp2SupirDatabase.data };
	_sewa: SewaId = {};
	$_pp2MobilDatabase: DatabaseService<MobilId> = new DatabaseService<MobilId>(this.$_ngfFirestore);
	$_pp2SupirDatabase: DatabaseService<SupirId> = new DatabaseService<SupirId>(this.$_ngfFirestore);
	$_pp2SewaDatabase: DatabaseService<SewaId> = new DatabaseService<SewaId>(this.$_ngfFirestore);
	sewaForm_mobil: FormGroup;
	sewaForm_supir: FormGroup;
	sewaForm_saya: FormGroup;
	sewaForm_sewa: FormGroup;
	Saya: PenggunaId;

	get _m() { return `"m":"${this.IdMobil || ''}"`; }
	get _s() { return this.IdSupir ? `,"s":"${this.IdSupir || ''}"` : ''; }

	get Mobil(): MobilId {
		let mobil = {};
		try{ mobil=JSON.parse(this.sewaForm_mobil.value.mobil) }catch(e){mobil={}}
		return mobil;
	}
	get Supir(): SupirId {
		let supir = {};
		try{ supir=JSON.parse(this.sewaForm_mobil.value.supir) }catch(e){supir={}}
		return supir;
	}
	get tgl_mulai() { return this.sewaForm_sewa.value.tgl_mulai.valueOf(); }
	get tgl_selesai() { return this.sewaForm_sewa.value.tgl_selesai.valueOf(); }
	get tgl_selesai_minDate() { return new Date(this.tgl_mulai + 86400000) }
	get total_hari_sewa(): number {
		const HARI = (this.tgl_selesai - this.tgl_mulai) / 86400000;
		return (HARI < 0 ? 0 : HARI);
	}
	constructor(
		public $_matDateAdapter: DateAdapter<Date>,
		public $_pp2Conf: ConfigService,
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngFormBuilder: FormBuilder,
		private $_ngHttpClient: HttpClient,
		private $_ngRouter: Router,
		private $_ngfFirestore: AngularFirestore,
		private $_pp2: Pp2Service,
		private $_pp2MQ: Pp2MediaQueryService,
		private $_matSnackBar: MatSnackBar
	) {
		// $_matDialog.afterOpen.subscribe(() => {if (!doc.body.classList.contains('no-scroll')) {doc.body.classList.add('no-scroll');}});
		// $_matDialog.afterAllClosed.subscribe(() => {doc.body.classList.remove('no-scroll');});

		this.$_pp2MobilDatabase.table = 'mobil';
		this.$_pp2SupirDatabase.table = 'supir';
		this.$_pp2SewaDatabase.table = 'sewa';

		if (this.$_ngActivatedRoute.snapshot.params['id'] != undefined) {
			const id = JSON.parse(this.$_ngActivatedRoute.snapshot.params['id'].replace('(', '{').replace(')', '}'))
			try {
				this.IdMobil = id['m'] ? id['m'] : '';
				this.IdSupir = id['s'] ? id['s'] : '';
				this.tglMulai = id['tm'] ? id['tm'] : '';
				this.tglSelesai = id['ts'] ? id['ts'] : '';
			} catch (e) { alert('e: id') }
		}
		try {
			this.Saya = JSON.parse(localStorage.ggPengguna);
			this._sewa.id_pengguna = this.Saya.id;
		} catch (e) {
			this.$_matSnackBar.open('Masuk Terlebih Dahulu');
			setTimeout(() => {
				this.$_matSnackBar.dismiss();
			}, 4000);
			this.$_ngRouter.navigate(['masuk'])
		}
		$_matDateAdapter.setLocale('id-ID');
		this.init();
	}
	ngAfterViewInit() {
		if (this.IdSupir) {
			setTimeout(() => {
				this._butuhSupir.checked = true;
			}, 1000)
		}
	}
	ngOnInit(){}
	init() {
		this.sewaForm_mobil = this.$_ngFormBuilder.group({
			mobil: ['', Validators.required]
		});
		this.sewaForm_mobil.get('mobil').valueChanges.subscribe((mobil: string) => {
			if (typeof mobil == 'string') {
				const _mobil = `"m":"${JSON.parse(mobil).id || this.IdMobil}"`;
				if (this.$_ngRouter.url.indexOf('/saya/sewa') !== -1){
					this.$_ngRouter.navigate(['saya', 'sewa', `(${_mobil + this._s})`])
				}
			}
		})
		if( this.IdMobil ) {
			this.$_pp2MobilDatabase.$data$.subscribe(($Mobil: MobilId[]) => {
				let Mobil = $Mobil.filter((Mobil: MobilId) => {
					this.$_pp2MobilDatabase.$data$.unsubscribe();
					return Mobil.id == this.IdMobil
				})
				this.sewaForm_mobil.get('mobil').setValue(JSON.stringify(Mobil[0]))
			})
		}
		// -----------------------------------------------------------------
		this.sewaForm_supir = this.$_ngFormBuilder.group({
			supir: [{ value: '' }]
		});
		this.sewaForm_supir.get('supir').valueChanges.subscribe((supir: string) => {
			setTimeout(() => {
				let id;
				try { id = JSON.parse(supir).Id; }
				catch (e) { id = this.IdSupir; }
				if (this.$_ngRouter.url.indexOf('/saya/sewa') !== -1){
					this.$_ngRouter.navigate(['saya', 'sewa', `("m":"${this.Mobil.id}"${this._s})`])
				}
			}, 10)
		});
		if( this.IdSupir ) {
			this.$_pp2SupirDatabase.$data$.subscribe(($Supir: SupirId[]) => {
				let Supir = $Supir.filter((Supir: SupirId) => {
					this.$_pp2SupirDatabase.$data$.unsubscribe();
					return Supir.id == this.IdSupir
				})
				this.sewaForm_supir.get('Supir').setValue(JSON.stringify(Supir[0]))
			})
		}
		// -----------------------------------------------------------------
		this.sewaForm_saya = this.$_ngFormBuilder.group({
			gg: [''],
		});
		this.sewaForm_sewa = this.$_ngFormBuilder.group({
			tgl_mulai: ['', Validators.required],
			tgl_selesai: ['', Validators.required]
		});
	}
	tgl_keypress(e: Event) {
		e.preventDefault();
	}
	pp2SewaSubmit() {
		this._sewa = {
			id_mobil: this.Mobil.id,
			id_pengguna: this.Saya.id,
			id_supir: '',
			tglMulai: this.tgl_mulai,
			tglSelesai: this.tgl_selesai,
			totalSewaHari: this.total_hari_sewa
		};
		if (this._butuhSupir.checked) { this._sewa.id_supir = this.Supir.id }
		console.log(this._sewa)
		this.$_pp2SewaDatabase.create(this._sewa)
		this.$_matSnackBar.open('Berhasil Menyewa Mobil')

		setTimeout(() => {
			this.$_matSnackBar.dismiss()
		}, 4000)
	}
	log(e) {
		console.log(e)
	}
}
