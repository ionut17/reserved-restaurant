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
				if (res.status === ReservationStatus.Fulfilled){
					this.toasterService.success("Masa a fost ocupată cu succes și rezervarea a fost onorată");
				} else{
					this.toasterService.error();
				}
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
				if (res.id){
					this.toasterService.success("Detaliile rezervării au fost modificate cu succes");
				} else{
					this.toasterService.error();
				}
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
				if (res.status === ReservationStatus.Absent){
					this.toasterService.success("Rezervarea a fost anulată și clientul marcat ca fiind absent");
				} else{
					this.toasterService.error();
				}
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
				if (res.status = ReservationStatus.Canceled){
					this.toasterService.success("Rezervarea a fost anulată");
				} else{
					this.toasterService.error();
				}
			});
		};
		this.sidemenuService.hideMenu();
	})
}];