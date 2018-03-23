import { Injectable, Output, EventEmitter } from "@angular/core";
import { SidemenuService, SidemenuButton } from "../sidemenu";
import { Table, Item } from "../model";

/**
 * Abstract Manager service which provides generic selection functionality
 */
export class ManagerService<T extends Item> {

	/**
	 * Emits events when the a reservation is toggled
	 * selected or deselected (boolean value means the status)
	 */
	@Output() selectedItemChange: EventEmitter<boolean> = new EventEmitter();

	selectedItem: T;

	constructor(protected sidemenuService: SidemenuService,
				protected sidemenuButtons: SidemenuButton[]) {
		this.sidemenuService.onClose().subscribe(()=>{
			this.deselect(false);
		});
		const self = this;
		this.sidemenuButtons.forEach((button:SidemenuButton)=>{
			button.clickCallback = button.clickCallback.bind(self);
		});
	}

	hasSelected():boolean{
		return typeof this.selectedItem !== 'undefined';
	}

	isSelected(item: T):boolean{
		return item && this.selectedItem
				? this.selectedItem.id === item.id
				: false;
	}

	select(item: T, menuInteraction:boolean = true):void{
		if (this.isSelected(item)){
			this.deselect(menuInteraction);
		} else{
			this.selectedItem = item;
			this.selectedItemChange.emit(true);
			if (menuInteraction) this.sidemenuService.showMenu(this.sidemenuButtons);
		}
	}

	deselect(menuInteraction:boolean = true):void{
		this.selectedItem = undefined;
		this.selectedItemChange.emit(false);
		if (menuInteraction) this.sidemenuService.hideMenu();
	}

}