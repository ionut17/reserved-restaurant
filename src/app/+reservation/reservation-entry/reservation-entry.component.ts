import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Reservation } from '../../shared/model';

@Component({
  selector: 'rs-reservation-entry',
  templateUrl: './reservation-entry.component.html',
  styleUrls: ['./reservation-entry.component.scss']
})
export class ReservationEntryComponent implements OnInit {

  @Input() reservation: Reservation;

  @Input() selected: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitSelect(){
    this.select.emit();
  }

}
