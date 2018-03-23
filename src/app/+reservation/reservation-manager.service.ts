import { Injectable, Output, EventEmitter } from "@angular/core";
import { Reservation } from "../shared/model";
import { SidemenuService, SidemenuButton } from "../shared/sidemenu";
import { sidemenuButtons } from "./model";

@Injectable()
export class ReservationManagerService{

	/**
	 * Emits events when the a reservation is toggled
	 * selected or deselected (boolean value means the status)
	 */
	@Output() selectedReservationChange: EventEmitter<boolean> = new EventEmitter();

	selectedReservation: Reservation;

	constructor(private sidemenuService: SidemenuService) {
		this.sidemenuService.onClose().subscribe(()=>{
			this.deselectReservation(false);
		});
		const self = this;
		sidemenuButtons.forEach((button:SidemenuButton)=>{
			button.clickCallback = button.clickCallback.bind(self);
		});
	}

	isSelected(reservation: Reservation):boolean{
		return reservation && this.selectedReservation
				? this.selectedReservation.id === reservation.id
				: false;
	}

	selectReservation(reservation: Reservation):void{
		if (this.isSelected(reservation)){
			this.deselectReservation();
		} else{
			this.selectedReservation = reservation;
			this.selectedReservationChange.emit(true);
			this.sidemenuService.showMenu(sidemenuButtons);
		}
	}

	deselectReservation(hideMenu:boolean = true):void{
		this.selectedReservation = undefined;
		this.selectedReservationChange.emit(false);
		if (hideMenu) this.sidemenuService.hideMenu();
	}

}