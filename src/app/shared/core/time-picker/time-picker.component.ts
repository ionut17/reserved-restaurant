import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ValueAccessorBase } from '../shared';

export const CUSTOM_TIMEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimePickerComponent),
  multi: true
};

@Component({
  selector: 'rs-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [CUSTOM_TIMEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class TimePickerComponent extends ValueAccessorBase<Moment> implements OnInit {

  availableHours: number[] = [];
  availableMinutes: number[] = [];

  private tempHour: number;
  private step: 0 | 1 | 2;

  constructor() {
    super();
  }

  ngOnInit() {
    this.step = 0;
    for (let i=8;i<=23;i++){
      this.availableHours.push(i);
    }
    for (let i=0;i<60;i+=15){
      this.availableMinutes.push(i);
    }
  }

  selectHour(hour:number):void{
    this.tempHour = hour;
    this.step = 1;
  }

  selectMinute(minute:number):void{
    this.value.hour(this.tempHour);
    this.value.minute(minute);
    this.step = 0;
  }

}
