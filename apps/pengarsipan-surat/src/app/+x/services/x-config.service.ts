import { Injectable } from '@angular/core';

@Injectable()
export class XConfigService {
	appName='Ujikom Keluar Masuk';
	url: string = 'http://localhost:3000/';
	constructor() { }
}
