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

}