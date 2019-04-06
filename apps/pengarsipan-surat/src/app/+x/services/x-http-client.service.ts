import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class XHttpClientService {
	constructor(
		private $_ngHttpClient: HttpClient
	) {
	}
	get(url: string): Observable<Object> {
		return this.$_ngHttpClient.get('https://ujikom-ng.firebaseapp.com/')
	}
}
