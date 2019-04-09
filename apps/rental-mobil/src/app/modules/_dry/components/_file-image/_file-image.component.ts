import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, OnDestroy, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'pp2-dry-fileImage',
	templateUrl: '_file-image.component.html',
	styleUrls: ['_file-image.component.scss']
})

export class _FileImageComponent implements OnDestroy, OnInit {
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	@ViewChild('preview') img;
	fileExist: boolean = false;
	i_file: HTMLInputElement;
	SIOFU: any;
	file: FileList;
	get label() {
		return this.fileExist ? 'Ganti' : 'Unggah';
	}
	constructor(
		private $_ngHttpClient: HttpClient,
		private $_ngRenderer2: Renderer2,
		private $_ngRouter: Router,
		private $_matSnackBar: MatSnackBar
	) { }
	ngOnDestroy() {
		this.SIOFU = null;
		
	}
	ngOnInit() {
		const img = this.img.nativeElement;
		this.i_file = this.$_ngRenderer2.createElement('input');
		this.i_file.type = 'file';
		this.i_file.onchange = (e) => {
			if (this.i_file.files.length > 0) {
				this.file = this.i_file.files;
				this.change.next(e)
				let fileToLoad = this.i_file.files[0]
				let fileReader = new FileReader()
				fileReader.onload = (fileLoadedEvent: any) => {
					img.src = fileLoadedEvent.target.result
				}
				fileReader.onloadend = () => {
					this.fileExist = true;
				}
				fileReader.readAsDataURL(fileToLoad);
			}
		}
	}
	chooseFile() {
		this.i_file.dispatchEvent(new MouseEvent('click'))
	}
	log(a){
		console.log(a)
	}
}
