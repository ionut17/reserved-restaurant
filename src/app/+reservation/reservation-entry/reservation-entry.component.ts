import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ElementRef, Renderer2, SimpleChanges } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Reservation } from '../../shared/@model';
import { LdatePipe } from '../../shared/@pipes/ldate.pipe';
import { TimeboxService } from '../../shared/timebox/timebox.service';
import { ReservationManagerService } from '../../shared/@services';

@Component({
  selector: 'rs-reservation-entry',
  templateUrl: './reservation-entry.component.html',
  styleUrls: ['./reservation-entry.component.scss']
})
export class ReservationEntryComponent implements OnInit {

  @Input() reservation: Reservation;

  @Input() @HostBinding('class.is-selected') selected: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.is-overdue') isOverdue: boolean = false;

  constructor(private reservationManagerService: ReservationManagerService,
              private hostRef: ElementRef,
              private renderer: Renderer2) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reservation']){
      this.isOverdue = this.reservationManagerService.isOverdue(this.reservation);
    }
  }

  emitSelect(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.select.emit();
  }

}
