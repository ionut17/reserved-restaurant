import { Injectable, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import * as moment from 'moment';

import { SidemenuService, SidemenuButton } from "../../sidemenu";
import { freeTableButtons, occupiedTableButtons } from "~/../../src/app/shared/table-overview/model";
import { Table, Reservation, ReservationStatus } from "../../@model";

import { ManagerService } from "./manager.service";
import { RestaurantManagerService } from "./restaurant-manager.service";
import { ReservationManagerService } from "./reservation-manager.service";
import { RestaurantService, ReservationService } from "../api";
import { TimeboxService } from "../../timebox/timebox.service";
import { ToasterService } from "../toaster.service";

@Injectable()
export class TableManagerService {

	@Output() selectedItemChange: EventEmitter<Table[]> = new EventEmitter();

	selectedItems: Table[] = [];
	private sidemenuCloseSubscription: Subscription;

	private pendingReservations: Map<string, Reservation> = new Map();
	private fulfilledReservations: Map<string, Reservation> = new Map();
	/**
	 * The reservations split by the table which they belong to
	 */
	private tableReservations: Map<string, Reservation> = new Map();
	private fulfilledReservationsTableIds: string[] = [];

	constructor(private sidemenuService: SidemenuService,
				private timeboxService: TimeboxService,
				private restaurantManagerService: RestaurantManagerService,
				private reservationService: ReservationService,
				private toasterService: ToasterService) {
		this.sidemenuService.onClose().subscribe(() => {
			this.deselectAll(false);
		});
		const self = this;
		[...freeTableButtons, ...occupiedTableButtons].forEach((button: SidemenuButton) => {
			button.clickCallback = button.clickCallback.bind(self);
		});
	}

	ngOnDestroy() {
		if (this.sidemenuCloseSubscription) {
			this.sidemenuCloseSubscription.unsubscribe();
		}
	}

	select(item: Table, menuInteraction: boolean = true): void {
		const currentButtons: SidemenuButton[] = this.isDisabled(item) ? occupiedTableButtons : freeTableButtons;
		if (this.isSelected(item)) {
			this.deselect(item, menuInteraction);
		} else {
			if (this.isDisabled(item) || this.selectedItems.length > 0 && this.isDisabled(this.selectedItems[0])){
				this.selectedItems = [];
			}
			this.selectedItems.push(item);
			this.selectedItemChange.emit(this.selectedItems);
			if (menuInteraction) this.sidemenuService.showMenu(currentButtons);
		}
	}

	hasSelected(): boolean {
		return this.selectedItems.length > 0;
	}

	isSelected(item: Table): boolean {
		return item && this.selectedItems
			? this.selectedItems.findIndex((table: Table) => table.id === item.id) > -1
			: false;
	}

	deselect(item: Table, menuInteraction: boolean = true): void {
		const index: number = this.selectedItems.findIndex((table: Table) => table.id == item.id);
		this.selectedItems.splice(index, 1);
		this.selectedItemChange.emit(this.selectedItems);
		if (menuInteraction && this.selectedItems.length == 0) this.sidemenuService.hideMenu();
	}

	deselectAll(menuInteraction: boolean = true): void {
		this.selectedItems = [];
		this.selectedItemChange.emit(this.selectedItems);
		if (menuInteraction) this.sidemenuService.hideMenu();
	}


	isDisabled(table: Table): boolean {
		return this.fulfilledReservationsTableIds.indexOf(table.id) > -1;
	}

	getPendingReservationByTable(table: Table): Reservation{
		const res: Reservation = this.tableReservations.get(table.id);
		return res && res.status === ReservationStatus.Pending ? res : undefined;
	}

	getFullfilledReservationByTable(table: Table): Reservation {
		const res: Reservation = this.tableReservations.get(table.id);
		return res && res.status === ReservationStatus.Fulfilled ? res : undefined;
	}

	updateReservations(reservations: Map<string, Reservation>) {
		this.pendingReservations = new Map();
		this.fulfilledReservations = new Map();
		this.tableReservations = new Map();
		//For each reservation
		reservations.forEach((res: Reservation) => {
			//Separating pending / fulfilled reservations to optimize queries
			switch (res.status) {
				case ReservationStatus.Pending:
					this.pendingReservations.set(res.id, res);
					this.generateTableReservations(res);
					break;
				case ReservationStatus.Fulfilled:
					this.fulfilledReservations.set(res.id, res);
					this.generateTableReservations(res);
					break;
				case ReservationStatus.Canceled:
				case ReservationStatus.Absent:
					break;
			}

		});
		//Optimization to store all the used tables ids for faster queries
		this.fulfilledReservationsTableIds = [];
		this.fulfilledReservations.forEach((entry: Reservation) => {
			if (this.isUndergoing(entry)){
				this.fulfilledReservationsTableIds.push(...entry.tables);
			}
		});
	}

	private isUndergoing(reservation: Reservation):boolean{
		const current: moment.Moment = this.timeboxService.selectedItem;
		return moment.utc(reservation.startTime).isSameOrBefore(current)
				&& reservation.endTime ? moment.utc(reservation.endTime).isSameOrAfter(current) : true;
	}

	private generateTableReservations(res: Reservation){
		//Adding reservations to table key map (only pending or fulfilled reservations)
		res.tables.forEach((tableId:string)=>{
			const previousReservation: Reservation = this.tableReservations.get(tableId);
			//If there is a reservation on the table already, take the first occurring one
			if (previousReservation){
				if (moment.utc(previousReservation.startTime).isAfter(moment.utc(res.startTime))){
					this.tableReservations.set(tableId, res);
				}
			} //Else just add it
			else{
				this.tableReservations.set(tableId, res);
			}
		});
	}

}