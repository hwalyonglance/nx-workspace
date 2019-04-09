export const ScreenConst = {
	xs: false,
	s: false,
	m: false,
	l: false,
	xl: false
}

export const Pp2MediaQueryScreenConst = Object.assign({
	ltOE: ScreenConst,
	gtOE: ScreenConst,
	lt: ScreenConst,
	gt: ScreenConst,
	innerHeight: 0,
	innerWidth: 0,
	outerHeight: 0,
	outerWidth: 0
}, ScreenConst);
