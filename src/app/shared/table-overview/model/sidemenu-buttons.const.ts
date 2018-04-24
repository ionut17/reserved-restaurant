import { SidemenuButton } from "../../sidemenu";
import { Reservation, ReservationStatus, Table } from "../../@model";
import { Moment } from 'moment';
import * as moment from 'moment';

export const freeTableButtons: SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function () {
		if (this.hasSelected()) {
			const waiterReservation: Reservation = {
				id: null,
				clientId: this.restaurantManagerService.selectedItem.defaultClientId,
				restaurantId: this.restaurantManagerService.selectedItem.id,
				startTime: moment().toDate(),
				endTime: null,
				status: ReservationStatus.Fulfilled,
				people: 1,
				tables: this.selectedItems.map((table: Table) => table.id)
			};
			console.log(waiterReservation);
			this.reservationService.post(waiterReservation).subscribe((res) => { });
		};
		this.sidemenuService.hideMenu();
	})
}, {
	label: "Rezerva",
	icon: "plus-circle",
	clickCallback: (function () {
		this.sidemenuService.hideMenu();
	})
}];

export const occupiedTableButtons: SidemenuButton[] = [{
	label: "Finalizare",
	icon: "check-circle",
	important: true,
	clickCallback: (function () {
		if (this.hasSelected()) {
			this.selectedItems.forEach((table: Table) => {
				const reservation: any = this.getFullfilledReservationByTable(table);
				reservation.endTime = moment().toDate();
				this.reservationService.update(reservation).subscribe((res) => { });
			});
		};
		this.sidemenuService.hideMenu();
	})
}];