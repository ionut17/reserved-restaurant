import { Injectable, Output, EventEmitter } from "@angular/core";
import { Reservation } from "../shared/model";
import { SidemenuService, SidemenuButton } from "../shared/sidemenu";
import { sidemenuButtons } from "./model";
import { ManagerService } from "../shared/services/manager.service";

@Injectable()
export class ReservationManagerService extends ManagerService<Reservation>{

	constructor(sidemenuService: SidemenuService) {
		super(sidemenuService, sidemenuButtons);
	}

}