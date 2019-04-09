import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'input-file',
	templateUrl: './input-file.component.html',
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
	`]
})
export class InputFileComponent implements AfterViewInit, OnInit {
	@Output() change : EventEmitter<string> = new EventEmitter();
	@ViewChild('preview') private img: ElementRef;
	get label() { return this.fileExist ? 'Ubah' : 'Unggah'; }
	set image(img: string){ this.img.nativeElement.src = img; }
	fileAsDataURL: string= '';
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
				this.fileReader.readAsDataURL(this.input_file.files[0])
			}
		}
	}
	ngAfterViewInit(){}
	ngOnInit() {
		this.fileReader.onload = (fileLoadedEvent: any) => {
			let file = fileLoadedEvent.target.result
			this.img.nativeElement.src = file;
			this.fileAsDataURL = file;
			this.change.next(file)
		}
		this.fileReader.onloadend = () => {
			this.fileExist = true
		}

	}
	chooseFile() {
		this.input_file.dispatchEvent(new MouseEvent('click'))
	}

}
