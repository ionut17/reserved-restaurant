import { Injectable, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { Reservation, ReservationStatus, Restaurant } from "../shared/model";
import { sidemenuButtons } from "./model";
import { ManagerService } from "../shared/services/manager.service";
import { ReservationService } from "../shared/services";
import { TableManagerService } from "../shared/table-overview/table-manager.service";

@Injectable()
export class RestaurantManagerService{

	@Output() selectedItemChange: EventEmitter<boolean> = new EventEmitter();

	selectedItem: Restaurant;
	private sidemenuCloseSubscription: Subscription;

	constructor() {}

	ngOnDestroy(){
		if (this.sidemenuCloseSubscription){
			this.sidemenuCloseSubscription.unsubscribe();
		}
	}

	hasSelected():boolean{
		return typeof this.selectedItem !== 'undefined';
	}

	isSelected(item: Restaurant):boolean{
		return item && this.selectedItem
				? this.selectedItem.id === item.id
				: false;
	}

	select(item: Restaurant):void{
		if (this.isSelected(item)){
			this.deselect();
		} else{
			this.selectedItem = item;
			this.selectedItemChange.emit(true);
		}
	}

	deselect(menuInteraction:boolean = true):void{
		this.selectedItem = undefined;
		this.selectedItemChange.emit(false);
	}

}