import { SidemenuButton } from "../../shared/sidemenu";
import { ReservationStatus, Reservation, Table } from "../../shared/@model";

export const sidemenuButtons: SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function () {
		if (this.hasSelected()) {
			const reservation: Reservation = Object.assign({}, this.selectedItem);
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
			const reservation: Reservation = Object.assign({}, this.selectedItem);
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
			const reservation: Reservation = Object.assign({}, this.selectedItem);
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
			const reservation: Reservation = Object.assign({}, this.selectedItem);
			reservation.status = ReservationStatus.Canceled;
			this.reservationService.update(reservation).subscribe((res) => {
			});
		};
		this.sidemenuService.hideMenu();
	})
}];