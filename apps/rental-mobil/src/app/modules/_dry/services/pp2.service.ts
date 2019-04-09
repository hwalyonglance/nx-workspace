import { Injectable, isDevMode } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Pp2Service {
	constructor() {}
	parse(str){
		try{
			return JSON.parse(str)
		}catch(e){
			return {};
		}
	}
	stringify(obj){
		try{
			return JSON.stringify(obj)
		}catch(e){
			return '';
		}
	}
}
