import { SidemenuButton } from "../../shared/sidemenu";
import { ReservationStatus, Reservation, Table, ReservationDto } from "../../shared/@model";

export const sidemenuButtons: SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function () {
		if (this.hasSelected()) {
			const reservation: ReservationDto = this.selectedItem as ReservationDto;
			reservation.clientId = this.selectedItem.client.id;
			reservation.status = ReservationStatus.Fulfilled;
			reservation.tables = this.tableManagerService.selectedItems.map((table: Table) => table.id);
			this.reservationService.update(reservation).subscribe((res) => {
			});
		};
		this.sidemenuService.hideMenu();
	})
}, {
	label: "Modifica",
	icon: "edit",
	clickCallback: (function () {
		if (this.hasSelected()) {
			const reservation: ReservationDto = this.selectedItem as ReservationDto;
			reservation.clientId = this.selectedItem.client.id;
			reservation.tables = this.tableManagerService.selectedItems.map((table: Table) => table.id);
			this.reservationService.update(reservation).subscribe((res) => {
			});
		};
		this.sidemenuService.hideMenu();
	})
}, {
	label: "Absent",
	icon: "ban",
	clickCallback: (function () {
		if (this.hasSelected()) {
			const reservation: ReservationDto = this.selectedItem as ReservationDto;
			reservation.clientId = this.selectedItem.client.id;
			reservation.status = ReservationStatus.Absent;
			this.reservationService.update(reservation).subscribe((res) => {
			});
		};
		this.sidemenuService.hideMenu();
	})
}, {
	label: "Sterge",
	icon: "times-circle",
	clickCallback: (function () {
		if (this.hasSelected()) {
			const reservation: ReservationDto = this.selectedItem as ReservationDto;
			reservation.clientId = this.selectedItem.client.id;
			reservation.status = ReservationStatus.Canceled;
			this.reservationService.update(reservation).subscribe((res) => {
			});
		};
		this.sidemenuService.hideMenu();
	})
}];