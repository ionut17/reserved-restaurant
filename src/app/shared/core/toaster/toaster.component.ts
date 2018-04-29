import { Component, Input, SimpleChanges, Output, EventEmitter, HostBinding } from "@angular/core";
import { timer } from 'rxjs/observable/timer';

import { ToasterSettings } from "../../@model";

@Component({
	'selector': 'rs-toaster',
	'templateUrl': 'toaster.component.html',
	'styleUrls': ['toaster.component.scss']
})
export class ToasterComponent{

	@Input() toaster: ToasterSettings;

	@Output() onClose: EventEmitter<any> = new EventEmitter();

	ngOnInit(){
		//Autoclose after duration elapsed (if set)
		if (this.toaster.duration > 0){
			timer(this.toaster.duration).subscribe(()=>{
				this.close();
			})
		}
	}

	close(){
		this.onClose.emit();
	}

}