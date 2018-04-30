import { Injectable, Output, EventEmitter } from "@angular/core";
import { Moment } from 'moment';
import * as moment from 'moment';

import { Reservation, ReservationStatus } from "../../@model";
import { SidemenuService, SidemenuButton } from "../../sidemenu";
import { sidemenuButtons } from "~/../../src/app/+reservation/model";

import { ReservationService } from "../api";
import { ManagerService } from "./manager.service";
import { TableManagerService } from "./table-manager.service";
import { ToasterService } from "../toaster.service";
import { TimeboxService } from "../../timebox/timebox.service";
import { LdatePipe } from "../../@pipes";

@Injectable()
export class ReservationManagerService extends ManagerService<Reservation>{

	constructor(sidemenuService: SidemenuService,
				private reservationService: ReservationService,
				private tableManagerService: TableManagerService,
				private timeboxService: TimeboxService,
				private toasterService: ToasterService) {
		super(sidemenuService, sidemenuButtons);
	}

	isOverdue(reservation):boolean{
		const startTime: Moment = moment.utc(reservation.startTime);
		const current: Moment =this.timeboxService.hasSelected() ? this.timeboxService.selectedItem : moment();
    return startTime.isBefore(current, 'minute');
	}

}