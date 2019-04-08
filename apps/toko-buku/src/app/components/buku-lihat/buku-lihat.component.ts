import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BukuViewGridListComponent } from '../../+buku';

@Component({
	selector: 'iLm-buku-lihat',
	template: `
		<container>
			<div style='padding: 56px 24px;'>
				<buku-view-grid-list></buku-view-grid-list>
			</div>
		</container>
	`,
	styles: []
})
export class IlmBukuLihatComponent implements OnInit, AfterViewInit {
	@ViewChild(BukuViewGridListComponent) C_Buku_ViewGridList: BukuViewGridListComponent;
	constructor(
		private $_ngActivatedRoute: ActivatedRoute,
		private $_ngRouter: Router
	) {
	}
	ngAfterViewInit(){
		this.$_ngActivatedRoute.params.subscribe((params: any) => {
			this.C_Buku_ViewGridList.kategori = params.kategori;
		})
	}
	ngOnInit() {}
}
