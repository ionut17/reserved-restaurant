import { Component, OnInit, Input } from '@angular/core';

import { Reservation } from '../../shared/model';

@Component({
  selector: 'rs-reservation-entry',
  templateUrl: './reservation-entry.component.html',
  styleUrls: ['./reservation-entry.component.scss']
})
export class ReservationEntryComponent implements OnInit {

  @Input() reservation: Reservation;

  @Input() selected: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
