import { Injectable, Output, EventEmitter } from "@angular/core";
import { Reservation } from "../shared/model";
import { AppService } from "../app.service";

@Injectable()
export class ReservationManagerService{

	/**
	 * Emits events when the a reservation is toggled
	 * selected or deselected (boolean value means the status)
	 */
	@Output() selectedReservationChange: EventEmitter<boolean> = new EventEmitter();

	selectedReservation: Reservation;

	constructor(private appService: AppService) {}

	isSelected(reservation: Reservation):boolean{
		return reservation && this.selectedReservation
				? this.selectedReservation.id === reservation.id
				: false;
	}

	selectReservation(reservation: Reservation){
		if (this.isSelected(reservation)){
			this.selectedReservation = undefined;
			this.selectedReservationChange.emit(false);
			this.appService.hideMenu();
		} else{
			this.selectedReservation = reservation;
			this.selectedReservationChange.emit(true);
			this.appService.showMenu();
		}
	}

}