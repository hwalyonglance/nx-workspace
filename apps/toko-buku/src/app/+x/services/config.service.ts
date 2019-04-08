import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
	baseUrl = 'http://localhost:8080';
	constructor() { }
	onKeyPress($event: KeyboardEvent): void {
		const number = ($event.keyCode >= 48) && ($event.keyCode <= 57);
		const _ = ($event.keyCode === 95);
		const alphabet = ($event.keyCode >= 97) && ($event.keyCode <= 122);
		const ALPHABET = ($event.keyCode >= 65) && ($event.keyCode <= 90);
		if (!(number || _ || alphabet || ALPHABET)) {
			$event.preventDefault();
		}
		// console.log($event.keyCode);
	}
}
