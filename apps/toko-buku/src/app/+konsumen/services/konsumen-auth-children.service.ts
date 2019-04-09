import { Injectable } from '@angular/core';

import { Konsumen } from '../interfaces';

@Injectable()
export class KonsumenAuthChildrenService {
	$konsumen: Konsumen | null | undefined;
	constructor() {
		try{
			this.$konsumen = JSON.parse(localStorage['signInKonsumen'])
		}catch(e){
			this.$konsumen = {}
		}
	}
}
