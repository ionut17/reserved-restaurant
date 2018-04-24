import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Reservation } from '../../shared/@model';
import { LdatePipe } from '../../shared/@pipes/ldate.pipe';
import { TimeboxService } from '../../shared/timebox/timebox.service';

@Component({
  selector: 'rs-reservation-entry',
  templateUrl: './reservation-entry.component.html',
  styleUrls: ['./reservation-entry.component.scss']
})
export class ReservationEntryComponent implements OnInit {

  @Input() reservation: Reservation;

  @Input() @HostBinding('class.is-selected') selected: boolean = false;

  @Output() select: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.is-overdue') get isOverdue():boolean{
    if (this.timeboxService.selectedItem){
      return false;
    }
    const startTime: Moment = this.ldate.transform(this.reservation.startTime) as Moment;
    return startTime.isBefore(moment(), 'minute');
  }

  constructor(private ldate: LdatePipe,
              private timeboxService: TimeboxService,
              private hostRef: ElementRef,
              private renderer: Renderer2) { }

  ngOnInit() {
  }

  emitSelect(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.select.emit();
  }

}
