import { Directive, ElementRef, Input } from '@angular/core';
import { Pp2MediaQueryService } from '../services/Pp2-media-query.service';

@Directive({ selector: '[grid],[grid.s],[grid.m],[grid.l],[grid.xl]' })
export class GridDirective {
	@Input('grid') grid;
	@Input('grid.s') grid_s;
	@Input('grid.m') grid_m;
	@Input('grid.l') grid_l;
	@Input('grid.xl') grid_xl;
	@Input('grid.lt.s') grid_lt_s;
	@Input('grid.lt.m') grid_lt_m;
	@Input('grid.lt.l') grid_lt_l;
	@Input('grid.lt.xl') grid_lt_xl;
	constructor(
		el: ElementRef,
		MQ: Pp2MediaQueryService
	) {
	}
}
