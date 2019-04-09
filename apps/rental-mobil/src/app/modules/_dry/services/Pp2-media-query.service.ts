import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';

import { Pp2MediaQueryScreenConst } from '../consts/Pp2MediaQueryScreen.const';
import { Pp2MediaQueryScreen } from '../interfaces/Pp2-media-query.interface';

declare var module: any, require: any;

@Injectable()
export class Pp2MediaQueryService {
	size = {
		xs:	{min:0,		max:575},
		s:	{min:575,	max:750},
		m:	{min:750,	max:925},
		l:	{min:925,	max:1200},
		xl: {min:1200,	max:100000}
	};
	MQ: any;
	screen: Pp2MediaQueryScreen = Pp2MediaQueryScreenConst;
	constructor(
		@Inject(DOCUMENT) public $_ngDOCUMENT
	) {
		try{
			if ($_ngDOCUMENT) {
				this.MQ = {
					xs:	this.$_ngDOCUMENT.defaultView.matchMedia(`(min-width: ${this.size.xs.min}px)	and (max-width: ${this.size.xs.max}px)`),
					s:	this.$_ngDOCUMENT.defaultView.matchMedia(`(min-width: ${this.size.s.min}px)		and (max-width: ${this.size.s.max}px)`),
					m:	this.$_ngDOCUMENT.defaultView.matchMedia(`(min-width: ${this.size.m.min}px)		and (max-width: ${this.size.m.max}px)`),
					l:	this.$_ngDOCUMENT.defaultView.matchMedia(`(min-width: ${this.size.l.min}px)		and (max-width: ${this.size.l.max}px)`),
					xl: this.$_ngDOCUMENT.defaultView.matchMedia(`(min-width: ${this.size.xl.min}px)	and (max-width: ${this.size.xl.max}px)`)
				};
				setTimeout(() => {
					this.onWindowResize();
				}, 1)
				this.$_ngDOCUMENT.defaultView.onresize = (e: any) => {
					this.onWindowResize();
				}
			}
		}catch(e){}
	}
	onWindowResize(): void {
		this.screen = {
			gt: {
				xs: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.xs.max,
				s: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.s.max,
				m: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.m.max,
				l: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.l.max,
				xl: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.xl.max
			},lt: {
				s: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.s.min,
				m: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.m.min,
				l: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.l.min,
				xl: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.xl.min
			},
			gtOE: {
				xs: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.xs.min,
				s: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.s.min,
				m: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.m.min,
				l: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.l.min,
				xl: this.$_ngDOCUMENT.defaultView.innerWidth > this.size.xl.min
			},
			ltOE: {
				xs: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.xs.max,
				s: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.s.max,
				m: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.m.max,
				l: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.l.max,
				xl: this.$_ngDOCUMENT.defaultView.innerWidth < this.size.xl.max
			},
			innerHeight: this.$_ngDOCUMENT.defaultView.innerHeight,
			innerWidth: this.$_ngDOCUMENT.defaultView.innerWidth,
			outerHeight: this.$_ngDOCUMENT.defaultView.outerHeight,
			outerWidth: this.$_ngDOCUMENT.defaultView.outerWidth
		}
	}
}
