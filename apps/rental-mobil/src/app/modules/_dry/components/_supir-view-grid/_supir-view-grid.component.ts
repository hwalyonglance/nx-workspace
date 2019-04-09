import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SupirId } from '../../interfaces/supir.interface';

import { ConfigService } from '../../services/config.service';
import { DatabaseService } from '../../services/database.service';
import { Pp2MediaQueryService } from '../../services/Pp2-media-query.service';

@Component({
	selector: 'pp2-dry-supirViewGrid',
	templateUrl: '_supir-view-grid.component.html',
	styles: [`
		.mat-grid-tile{
			padding: 28px 0 !important;
		}
		.mat-grid-tile-content{
			padding: 56px 4px !important;
		}
	`]
})
export class _SupirViewGridComponent implements AfterViewInit, OnInit {
	@Output() $C_Mat_Sidenav_Click$ = new EventEmitter();
	get Supir$(): SupirId[] { return this.$_pp2Database.data }
	get cols(): number {
		if (this.$_pp2MQ.screen.gtOE.l)
			return 3;
		else if (this.$_pp2MQ.screen.gtOE.s)
			return 2;
		else
			return 1;
	}
	constructor(
		public $_pp2Conf: ConfigService,
		private $_pp2Database: DatabaseService<SupirId>,
		private $_pp2MQ: Pp2MediaQueryService,
		private $_ngRouter: Router
	) {
		$_pp2Database.where = [['_status', '==', 'Tersedia']]
		$_pp2Database.table = 'supir';
	}
	ngAfterViewInit() { }
	ngOnInit() { }
	pindah(ke) {
		this.$_ngRouter.navigate(['saya', 'sewa', `("s":"${ke}")`]);
	}
}
