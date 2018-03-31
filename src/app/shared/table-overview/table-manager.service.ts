import { Injectable, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { SidemenuService, SidemenuButton } from "../sidemenu";
import { freeTableButtons, occupiedTableButtons } from "./model";
import { Table, Reservation, ReservationStatus } from "../model";
import { ManagerService } from "../services/manager.service";
import { ReservationManagerService } from "../../+reservation/reservation-manager.service";
import { ReservationService } from "../services";

@Injectable()
export class TableManagerService{

	@Output() selectedItemChange: EventEmitter<Table[]> = new EventEmitter();

	selectedItems: Table[] = [];
	private sidemenuCloseSubscription: Subscription;

	private pendingReservations: Reservation[] = [];
	private fulfilledReservations: Reservation[] = [];
	private fulfilledReservationsTableIds: string[] = [];

	constructor(private sidemenuService: SidemenuService,
				private reservationService: ReservationService) {
		this.sidemenuService.onClose().subscribe(()=>{
			this.deselectAll(false);
		});
		const self = this;
		[...freeTableButtons,...occupiedTableButtons].forEach((button:SidemenuButton)=>{
			button.clickCallback = button.clickCallback.bind(self);
		});
	}

	ngOnDestroy(){
		if (this.sidemenuCloseSubscription){
			this.sidemenuCloseSubscription.unsubscribe();
		}
	}

	select(item: Table, menuInteraction: boolean = true): void {
		const currentButtons: SidemenuButton[] = this.isDisabled(item) ? occupiedTableButtons : freeTableButtons;
		if (this.isSelected(item)) {
			this.deselect(item, menuInteraction);
		} else {
			this.selectedItems.push(item);
			this.selectedItemChange.emit(this.selectedItems);
			if (menuInteraction) this.sidemenuService.showMenu(currentButtons);
		}
	}

	isDisabled(table: Table): boolean {
		return this.fulfilledReservationsTableIds.indexOf(table.id) > -1;
	}

	hasSelected():boolean{
		return this.selectedItems.length > 0;
	}

	isSelected(item: Table):boolean{
		return item && this.selectedItems
				? this.selectedItems.findIndex((table:Table)=>table.id===item.id) > -1
				: false;
	}

	deselect(item: Table, menuInteraction:boolean = true):void{
		const index:number = this.selectedItems.findIndex((table: Table)=>table.id == item.id);
		this.selectedItems.splice(index, 1);
		this.selectedItemChange.emit(this.selectedItems);
		if (menuInteraction && this.selectedItems.length == 0) this.sidemenuService.hideMenu();
	}

	deselectAll(menuInteraction:boolean = true):void{
		this.selectedItems = [];
		this.selectedItemChange.emit(this.selectedItems);
		if (menuInteraction) this.sidemenuService.hideMenu();
	}

	getFullfilledReservationByTable(table: Table):Reservation{
		return this.fulfilledReservations.find((reservation: Reservation)=>reservation.tables.indexOf(table.id) > -1);
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