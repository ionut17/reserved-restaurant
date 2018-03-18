import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { Reservation } from '../../shared/model';
import { ReservationManagerService } from '../reservation-manager.service';

@Component({
  selector: 'rs-reservation-sidebar',
  templateUrl: './reservation-sidebar.component.html',
  styleUrls: ['./reservation-sidebar.component.scss']
})
export class ReservationSidebarComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationManagerService: ReservationManagerService) { }

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
    return reservation ? this.reservationManagerService.isSelected(reservation) : false;
  }

  selectReservation(reservation: Reservation):void{
    this.reservationManagerService.selectReservation(reservation);
  }

}
