import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as _ from "lodash";

import { Reservation, ReservationStatus, Restaurant, Table, ReservationFull } from '../../shared/@model';
import { ReservationManagerService, TableManagerService } from '../../shared/@services';

@Component({
  selector: 'rs-reservation-sidebar',
  templateUrl: './reservation-sidebar.component.html',
  styleUrls: ['./reservation-sidebar.component.scss']
})
export class ReservationSidebarComponent implements OnInit {

  @Input() reservations: Map<string, ReservationFull> = new Map();
  @Input() restaurant: Restaurant;
  internalReservations: ReservationFull[] = [];

  constructor(private reservationManagerService: ReservationManagerService,
    private tableManagerService: TableManagerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["reservations"] && this.reservations) {
      this.internalReservations = [];
      this.reservations.forEach((reservation: ReservationFull) => {
        if (reservation.status === ReservationStatus.Pending) {
          this.internalReservations.push(reservation);
        }
      });
      this.internalReservations.sort((a: ReservationFull, b: ReservationFull) => {
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
      });
    }
  }

  isSelected(reservation: ReservationFull): boolean {
    return this.reservationManagerService.hasSelected() ? this.reservationManagerService.selectedItem.id === reservation.id : false;
  }

  selectReservation(reservation: ReservationFull): void {
    //Deselect any table selected
    this.tableManagerService.deselectAll(false);
    //Select the assigned tables without the menu
    this.restaurant.tables.forEach((table: Table) => {
      if (reservation.tables.indexOf(table.id) > -1) {
        this.tableManagerService.select(table, false);
      }
    });
    //Select the reservation with the menu
    this.reservationManagerService.select(Object.assign({
      'clientId': reservation.client.id
    }, reservation));
  }

}
