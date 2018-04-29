import { Injectable, Output, EventEmitter } from "@angular/core";

import { Reservation, ReservationStatus } from "../../@model";
import { SidemenuService, SidemenuButton } from "../../sidemenu";
import { sidemenuButtons } from "~/../../src/app/+reservation/model";

import { ReservationService } from "../api";
import { ManagerService } from "./manager.service";
import { TableManagerService } from "./table-manager.service";
import { ToasterService } from "../toaster.service";

@Injectable()
export class ReservationManagerService extends ManagerService<Reservation>{

	constructor(sidemenuService: SidemenuService,
				private reservationService: ReservationService,
				private tableManagerService: TableManagerService,
				private toasterService: ToasterService) {
		super(sidemenuService, sidemenuButtons);
	}

}