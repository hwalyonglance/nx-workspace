import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

export interface XInputChange {
	base64: string;
	files: FileList
}

@Component({
	selector: 'x-input',
	templateUrl: './x-input.component.html',
	styles: [`
		.img-view {
			max-width: 100%;
			max-height: 100%;
		}
		.img-view img {
			max-width: 100%;
			max-height: 100%;
		}
		.img-view button {
			background-color: transparent;
			font-size: 20px;
			padding: 4px 8px;
			width: 100%;
		}
	`],
	host: {
		class: 'x-input'
	}
})
export class XInputComponent implements AfterViewInit, OnInit {
	@Input() showButton: boolean = true;
	@Output() $change$ : EventEmitter<XInputChange> = new EventEmitter<XInputChange>();
	@ViewChild('preview') private img: ElementRef;
	get label() { return this.fileExist ? 'Ubah' : 'Unggah'; }
	set image(img: string){ this.img.nativeElement.src = img; }
	base64: string= '';
	fileExist: boolean = false;
	private fileReader: FileReader = new FileReader()
	private input_file: HTMLInputElement
	constructor(
		private $_ngRenderer2: Renderer2
	) {
		this.input_file = $_ngRenderer2.createElement('input');
		this.input_file.type = 'file';
		this.input_file.onchange = (e) => {
			if ( this.input_file.files.length > 0 ) {
				this.fileReader.readAsDataURL(this.input_file.files.item(0))
			}
		}
	}
	ngAfterViewInit(){}
	ngOnInit() {
		this.fileReader.onload = (fileLoadedEvent: any) => {
			let file = fileLoadedEvent.target.result
			this.base64 = file;
			this.img.nativeElement.src = file;
		}
		this.fileReader.onloadend = () => {
			this.$change$.next({
				base64: this.base64,
				files: this.input_file.files
			})
			this.fileExist = true;
		}

	}
	chooseFile() {
		if ( this.showButton ) {
			this.input_file.dispatchEvent(new MouseEvent('click'))
		}
	}
}
