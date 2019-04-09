import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class ConfigService {
	get baseUrl() {
		// return window.location.hostname === 'localhost' ? 'http://localhost:4136' : 'https://pp2-rental.herokuapp.com';
		return isDevMode() ? 'http://localhost:4136' : 'http://pp2-rental.herokuapp.com';
	}
	constructor() { }
}
