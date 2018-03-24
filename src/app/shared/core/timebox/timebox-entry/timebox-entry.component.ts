import { Component, Input, SimpleChanges } from '@angular/core';

import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rs-timebox-entry',
  templateUrl: './timebox-entry.component.html',
  styleUrls: ['./timebox-entry.component.scss']
})
export class TimeboxEntryComponent {

  @Input() time: Moment;

  private format: string = "HH:mm";

  constructor() {}

  get formattedTime():string{
    return this.time.format(this.format);
  }

}
