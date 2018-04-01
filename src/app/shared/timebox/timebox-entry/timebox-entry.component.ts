import { Component, Input, SimpleChanges, HostBinding } from '@angular/core';

import { Moment } from 'moment';
import * as moment from 'moment';

enum TimeboxEntryType {
  Normal = <any>"normal",
  Selected = <any>"selected"
}

@Component({
  selector: 'rs-timebox-entry',
  templateUrl: './timebox-entry.component.html',
  styleUrls: ['./timebox-entry.component.scss']
})
export class TimeboxEntryComponent {

  @Input() time: Moment;

  @Input() @HostBinding('class') type: TimeboxEntryType = TimeboxEntryType.Normal;

  TimeboxEntryType: typeof TimeboxEntryType = TimeboxEntryType;
  private timeFormat: string = "HH:mm";
  private dateFormat: string = "DD MMM YYYY";

  constructor() { }

  get formattedTime(): string {
    return this.time.format(this.timeFormat);
  }

  get formattedDate(): string {
    return this.time.format(this.dateFormat);
  }

}
