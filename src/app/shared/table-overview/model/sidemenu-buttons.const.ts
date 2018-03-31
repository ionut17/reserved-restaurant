import { SidemenuButton } from "../../sidemenu";
import { ReservationDto, ReservationStatus, Table } from "../../model";
import { Moment } from 'moment';
import * as moment from 'moment';

export const freeTableButtons : SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
},{
	label: "Rezerva",
	icon: "plus-circle",
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
}];

export const occupiedTableButtons : SidemenuButton[] = [{
	label: "Finalizare",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
		if (this.hasSelected()){
			this.selectedItems.forEach((table: Table)=>{
				const reservation: any = this.getFullfilledReservationByTable(table);
				reservation.clientId = reservation.client.id;
				reservation.endTime = moment().toDate();
				this.reservationService.update(reservation).subscribe((res)=>{});
			});
		};
		this.sidemenuService.hideMenu();
	})
}];