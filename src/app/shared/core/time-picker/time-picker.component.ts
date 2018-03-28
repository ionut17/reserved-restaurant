import { Component, OnInit, Input, Output, forwardRef, EventEmitter, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ValueAccessorBase } from '../shared';
import { Openable } from '../../services/interfaces';
import { PickerComponent } from '../shared/picker/picker.component';

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
export class TimePickerComponent extends ValueAccessorBase<Moment> implements OnInit, Openable {

  @ViewChild(PickerComponent) picker: PickerComponent;
  @Output() save: Subject<any>;
  @Output() close: Subject<any>;

  availableHours: number[] = [];
  availableMinutes: number[] = [];

  private step: 0 | 1 | 2;
  private tempHour: Moment = moment();

  get formattedTime():string{
    return this.tempHour ? this.tempHour.format('HH:mm') : "";
  }

  constructor() {
    super();
  }

  ngOnInit() {
    //Init
    this.step = 0;
    for (let i=8;i<=23;i++){
      this.availableHours.push(i);
    }
    for (let i=0;i<60;i+=15){
      this.availableMinutes.push(i);
    }
  }

  ngAfterContentInit() {
    this.save = this.picker.save;
    this.close = this.picker.close;
  }

  selectHour(hour:number):void{
    this.tempHour.hour(hour);
    this.step = 1;
  }

  isHourSelected(hour:number):boolean{
    return this.tempHour ? _.isEqual(hour, this.tempHour.hours()) : false;
  }

  selectMinute(minute:number):void{
    this.tempHour.minute(minute);
    this.step = 0;
  }

  isMinuteSelected(minute:number):boolean{
    return this.tempHour ? _.isEqual(minute, this.tempHour.minutes()) : false;
  }

  onSave(){
    this.value.hour(this.tempHour.hours());
    this.value.minute(this.tempHour.minutes());
  }

}
