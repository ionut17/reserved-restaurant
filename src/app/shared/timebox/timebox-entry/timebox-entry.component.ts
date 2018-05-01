import { Component, Input, SimpleChanges, HostBinding } from '@angular/core';

import { Moment } from 'moment';
import * as moment from 'moment';

enum TimeboxEntryType {
  Normal = <any>"normal",
  Selected = <any>"selected",
  Linked = <any>"linked"
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
  timeFormat: string = "HH:mm";
  dateFormat: string = "DD MMM YYYY";

  constructor() { }

}
