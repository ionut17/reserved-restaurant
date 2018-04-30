import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';

import { Table, Reservation, ReservationStatus } from '../@model';
import { ReservationManagerService, TableManagerService } from '../@services';
import { SidemenuService } from '../sidemenu/sidemenu.service';
import { TimeboxComponent } from '../timebox/timebox.component';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rs-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  @Input() tables: Table[] = [];
  @Input() reservations: Map<string, Reservation> = new Map();

  nextReservations: Map<string, Reservation> = new Map();

  constructor(private tableManagerService: TableManagerService,
              private reservationManagerService: ReservationManagerService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tables'] && this.tables) {
      this.tables.sort((a: Table, b: Table) => a.number - b.number);
      this.updateNextReservations();
    }
    if (changes['reservations'] && this.reservations) {
      this.tableManagerService.updateReservations(this.reservations);
      this.updateNextReservations();
    }
  }

  isSelected(table: Table): boolean {
    return this.tableManagerService.isSelected(table);
  }

  isLinked(): boolean {
    return this.reservationManagerService.hasSelected();
  }

  isDisabled(table: Table): boolean {
    return this.tableManagerService.isDisabled(table);
  }

  selectTable(event: Event, table: Table): void {
    //Prevent menu hiding
    event.stopPropagation();
    event.preventDefault();
    //Set the different behaviour if a reservation is selected
    const isReservationSelected: boolean = this.reservationManagerService.hasSelected();
    switch (isReservationSelected) {
      case true:
        if (this.isDisabled(table)){
          return;
        }
        //In case of reservation selected, allow only the selection of other tables and without menu interaction
        const isLastTableSelected: boolean = this.isSelected(table) && this.tableManagerService.selectedItems.length < 2;
        if (!isLastTableSelected) {
          this.tableManagerService.select(table, false);
        }
        break;
      case false:
        this.tableManagerService.select(table);
        break;
    }
  }

  private updateNextReservations(){
    this.tables.forEach((table: Table)=>{
      const nextReservation: Reservation = this.tableManagerService.getPendingFutureReservationByTable(table);
      this.nextReservations.set(table.id, nextReservation);
    });
  }

}
