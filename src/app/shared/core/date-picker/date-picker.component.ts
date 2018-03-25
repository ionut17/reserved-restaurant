import { Component, OnInit } from '@angular/core';
import { ValueAccessorBase } from '../shared';

import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rs-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends ValueAccessorBase<Moment> implements OnInit {

  minDate: Moment;

  get formattedDate():string{
    return this.value ? this.value.format('DD MMM YYYY') : "";
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.minDate = moment();
  }

  onCalendarChange(date:Moment){
    this.value = date;
  }

}
