export interface Pp2MediaQueryScreen extends Screen {
	ltOE?: Screen;
	gtOE?: Screen;
	lt?: Screen;
	gt?: Screen;
	innerHeight?: number,
	innerWidth?: number,
	outerHeight?: number,
	outerWidth?: number;
}

export interface Screen {
	xs?: boolean;
	s?: boolean;
	m?: boolean;
	l?: boolean;
	xl?: boolean;
}
