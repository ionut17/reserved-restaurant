import { Injectable, Output, EventEmitter } from "@angular/core";
import { Reservation } from "../shared/model";

@Injectable()
export class ReservationManagerService{

	/**
	 * Emits events when the a reservation is toggled
	 * selected or deselected (boolean value means the status)
	 */
	@Output() selectedReservationChange: EventEmitter<boolean> = new EventEmitter();

	selectedReservation: Reservation;

	constructor() {}

	isSelected(reservation: Reservation):boolean{
		return reservation && this.selectedReservation
				? this.selectedReservation.id === reservation.id
				: false;
	}

	selectReservation(reservation: Reservation){
		if (this.isSelected(reservation)){
			this.selectedReservation = undefined;
			this.selectedReservationChange.emit(false);
		} else{
			this.selectedReservation = reservation;
			this.selectedReservationChange.emit(true);
		}
	}

}