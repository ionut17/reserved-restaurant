import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import * as _ from "lodash";

import { Reservation, ReservationStatus, Restaurant, Table } from '../../shared/model';
import { ReservationManagerService } from '../reservation-manager.service';
import { TableManagerService } from '../../shared/table-overview/table-manager.service';

@Component({
  selector: 'rs-reservation-sidebar',
  templateUrl: './reservation-sidebar.component.html',
  styleUrls: ['./reservation-sidebar.component.scss']
})
export class ReservationSidebarComponent implements OnInit {

  @Input() reservations: Reservation[] = [];
  @Input() restaurant: Restaurant;
  private internalReservations: Reservation[] = [];

  constructor(private reservationManagerService: ReservationManagerService,
              private tableManagerService: TableManagerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes["reservations"] && this.reservations){
      this.internalReservations = this.reservations.filter((entry: Reservation)=>{
        return entry.status == ReservationStatus.Pending;
      });
      this.internalReservations.sort((a:Reservation, b:Reservation)=>{
        if (a.startTime < b.startTime) return -1;
        if (a.startTime > b.startTime) return 1;
        return 0;
      });
    }
  }

  isSelected(reservation: Reservation):boolean{
    return this.reservationManagerService.isSelected(reservation);
  }

  selectReservation(reservation: Reservation):void{
    //Deselect any table selected
    this.tableManagerService.deselectAll(false);
    //Select the assigned tables without the menu
    const selectedTables: Table[] = this.restaurant.tables.filter((table:Table)=>{
      return reservation.tables.indexOf(table.id) > -1;
    });
    this.restaurant.tables.forEach((table:Table)=>{
      if (reservation.tables.indexOf(table.id) > -1){
        this.tableManagerService.select(table, false);
      }
    });
    //Select the reservation with the menu
    this.reservationManagerService.select(reservation);
  }

}
