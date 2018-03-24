import { Injectable, Output, EventEmitter } from "@angular/core";
import { SidemenuService, SidemenuButton } from "../sidemenu";
import { sidemenuButtons } from "./model";
import { Table } from "../model";
import { ManagerService } from "../services/manager.service";

@Injectable()
export class TableManagerService extends ManagerService<Table>{

	constructor(sidemenuService: SidemenuService) {
		super(sidemenuService, sidemenuButtons);
	}

	select(item: Table, menuInteraction:boolean = true):void{
		if (this.isSelected(item)){
			this.deselect(menuInteraction);
		} else{
			this.selectedItem = item;
			this.selectedItemChange.emit(true);
			if (menuInteraction) this.sidemenuService.showMenu(this.sidemenuButtons);
		}
	}

}