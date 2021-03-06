import { Injectable, Output, EventEmitter } from "@angular/core";
import { Reservation, ReservationStatus } from "../shared/model";
import { SidemenuService, SidemenuButton } from "../shared/sidemenu";
import { sidemenuButtons } from "./model";
import { ManagerService } from "../shared/services/manager.service";
import { ReservationService } from "../shared/services";
import { TableManagerService } from "../shared/table-overview/table-manager.service";

@Injectable()
export class ReservationManagerService extends ManagerService<Reservation>{

	constructor(sidemenuService: SidemenuService,
				private reservationService: ReservationService,
				private tableManagerService: TableManagerService) {
		super(sidemenuService, sidemenuButtons);
	}

}