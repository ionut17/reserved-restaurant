import { Injectable, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { ManagerService } from "../services";
import { Moment } from "moment";

@Injectable()
export class TimeboxService{

	@Output() selectedItemChange: EventEmitter<Moment> = new EventEmitter();

	selectedItem: Moment;

	constructor() {}

	hasSelected():boolean{
		return typeof this.selectedItem !== 'undefined';
	}

	isSelected(item: Moment):boolean{
		return item && this.selectedItem
				? this.selectedItem.isSame(item)
				: false;
	}

	select(item: Moment):void{
		this.selectedItem = item;
		this.selectedItemChange.emit(item);
	}

	deselect():void{
		this.selectedItem = undefined;
		this.selectedItemChange.emit();
	}

}