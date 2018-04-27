import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Moment } from 'moment';
import * as _ from "lodash";
import * as moment from "moment";

import { Reservation, ReservationStatus, Restaurant, Table, ReservationExtended } from '../../shared/@model';
import { ReservationManagerService, TableManagerService } from '../../shared/@services';
import { TimeboxService } from '../../shared/timebox/timebox.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'rs-reservation-sidebar',
  templateUrl: './reservation-sidebar.component.html',
  styleUrls: ['./reservation-sidebar.component.scss']
})
export class ReservationSidebarComponent implements OnInit {

  @Input() reservations: Map<string, ReservationExtended> = new Map();
  @Input() restaurant: Restaurant;
  internalReservations: ReservationExtended[] = [];

  private reservationManagerSubscription: Subscription;

  constructor(private reservationManagerService: ReservationManagerService,
              private tableManagerService: TableManagerService,
              private timeboxService: TimeboxService) { }

  ngOnInit() {
    //Subscription to deselect the custom time when a reservation is deselected
    this.reservationManagerSubscription = this.reservationManagerService.selectedItemChange.subscribe((reservation: Reservation)=>{
      if (!reservation){
        this.timeboxService.deselect();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["reservations"] && this.reservations) {
      this.internalReservations = [];
      this.reservations.forEach((reservation: ReservationExtended) => {
        if (reservation.status === ReservationStatus.Pending) {
          this.internalReservations.push(reservation);
        }
      });
      this.internalReservations.sort((a: ReservationExtended, b: ReservationExtended) => {
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.reservationManagerSubscription){
      this.reservationManagerSubscription.unsubscribe();
    }
  }

  isSelected(reservation: ReservationExtended): boolean {
    return this.reservationManagerService.hasSelected() ? this.reservationManagerService.selectedItem.id === reservation.id : false;
  }

  selectReservation(reservation: ReservationExtended): void {
    //Deselect any table selected
    this.tableManagerService.deselectAll(false);
    this.setReservationTime(reservation);
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

  /**
   * Select the reservation startTime in the timebox service so the layout is related to the hour when the reservation starts
   * */
  private setReservationTime(reservation: ReservationExtended){
    const startTime: Moment = moment.utc(reservation.startTime);
    const current: Moment = moment();
    const chosenTime: Moment = startTime.isBefore(current) ? current : startTime;
    this.timeboxService.select(chosenTime);
  }

}
