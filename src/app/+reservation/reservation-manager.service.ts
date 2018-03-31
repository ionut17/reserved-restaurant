import { Injectable, Output, EventEmitter } from "@angular/core";
import { Reservation, ReservationStatus } from "../shared/model";
import { SidemenuService, SidemenuButton } from "../shared/sidemenu";
import { sidemenuButtons } from "./model";
import { ManagerService } from "../shared/services/manager.service";
import { ReservationService } from "../shared/services";

@Injectable()
export class ReservationManagerService extends ManagerService<Reservation>{

	constructor(sidemenuService: SidemenuService,
				private reservationService: ReservationService) {
		super(sidemenuService, sidemenuButtons);
	}

	updateStatus(reservation: Reservation, status: ReservationStatus){
		reservation.status = status;
		this.reservationService.update(reservation).subscribe((res)=>{
			console.log(res);
		});
	}

}