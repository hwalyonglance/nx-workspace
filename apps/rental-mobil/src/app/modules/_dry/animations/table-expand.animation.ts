import { animate, transition, trigger, state, style } from '@angular/animations';

export const TableExpand = [
	trigger('detailExpand', [
		state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
		state('expanded', style({height: '*', visibility: 'visible'})),
		transition('expanded <=> collapsed', animate('2000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
	])
]
