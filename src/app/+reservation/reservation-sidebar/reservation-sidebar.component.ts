import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { Reservation } from '../../shared/model';
import { ReservationManagerService } from '../reservation-manager.service';
import { TableManagerService } from '../../shared/table-overview/table-manager.service';

@Component({
  selector: 'rs-reservation-sidebar',
  templateUrl: './reservation-sidebar.component.html',
  styleUrls: ['./reservation-sidebar.component.scss']
})
export class ReservationSidebarComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationManagerService: ReservationManagerService,
              private tableManagerService: TableManagerService) { }

  ngOnInit() {
    let date: Date = new Date();
    date.setHours(12);
    date.setMinutes(0);
    for (var i=0;i<3;i++){
      this.reservations.push({
        id: _.uniqueId(),
        name: 'Ionut Iacob',
        people: 2,
        startTime: date,
        endTime: date
      });
    };
  }

  isSelected(reservation: Reservation):boolean{
    return this.reservationManagerService.isSelected(reservation);
  }

  selectReservation(reservation: Reservation):void{
    //Deselect any table selected
    this.tableManagerService.deselect(false);
    //Select the assigned table without the menu
    this.tableManagerService.select({id:'id1',number:1});
    //Select the reservation with the menu
    this.reservationManagerService.select(reservation);
  }

}
