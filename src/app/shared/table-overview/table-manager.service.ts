import { Injectable, Output, EventEmitter } from "@angular/core";
import { SidemenuService, SidemenuButton } from "../sidemenu";
import { freeTableButtons, occupiedTableButtons } from "./model";
import { Table, Reservation, ReservationStatus } from "../model";
import { ManagerService } from "../services/manager.service";
import { ReservationManagerService } from "../../+reservation/reservation-manager.service";

@Injectable()
export class TableManagerService extends ManagerService<Table>{

	private pendingReservations: Reservation[] = [];
	private fulfilledReservations: Reservation[] = [];
	private fulfilledReservationsTableIds: string[] = [];

	constructor(sidemenuService: SidemenuService,
		private reservationManagerService: ReservationManagerService) {
		super(sidemenuService, freeTableButtons);
	}

	/**
	 * Selects the table keeping track of the context (e.g. reservations)
	 * @param item
	 */
	selectInContext(table: Table) {
		const isReservationSelected: boolean = this.reservationManagerService.hasSelected();
		switch (isReservationSelected) {
			case true:
				//In case of reservation selected, allow only the selection of other tables and without menu interaction
				if (!this.isSelected(table)) {
					this.select(table, false);
				}
				break;
			case false:
				this.select(table);
				break;
		}
	}

	select(item: Table, menuInteraction: boolean = true): void {
		const currentButtons: SidemenuButton[] = this.isDisabled(item) ? occupiedTableButtons : freeTableButtons;
		if (this.isSelected(item)) {
			this.deselect(menuInteraction);
		} else {
			this.selectedItem = item;
			this.selectedItemChange.emit(true);
			if (menuInteraction) this.sidemenuService.showMenu(currentButtons);
		}
	}

	isDisabled(table: Table): boolean {
		return this.fulfilledReservationsTableIds.indexOf(table.id) > -1;
	}

	updateReservations(reservations: Reservation[]) {
		this.pendingReservations = [];
		this.fulfilledReservations = [];
		reservations.forEach((res: Reservation) => {
			switch (res.status) {
				case ReservationStatus.Pending:
					this.pendingReservations.push(res);
					break;
				case ReservationStatus.Fulfilled:
					this.fulfilledReservations.push(res);
					break;
			}
		});
		this.fulfilledReservationsTableIds = [];
		this.fulfilledReservations.forEach((entry: Reservation) => {
			this.fulfilledReservationsTableIds.push(...entry.tables);
		});
	}

}