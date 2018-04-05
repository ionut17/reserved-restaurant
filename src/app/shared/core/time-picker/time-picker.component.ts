import { Component, OnInit, Input, Output, forwardRef, EventEmitter, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Openable } from '../../@model';
import { ValueAccessorBase } from '../shared';
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

  @Input() saveButton: boolean = true;
  @Input() closeButton: boolean = true;
  @Output() save: Subject<Moment> = new Subject<Moment>();
  @Output() close: Subject<any> = new Subject<any>();

  availableHours: number[] = [];
  availableMinutes: number[] = [];

  private step: 0 | 1 | 2;
  private tempHour: Moment = moment();

  get formattedTime(): string {
    return this.tempHour ? this.tempHour.format('HH:mm') : "";
  }

  constructor() {
    super();
  }

  ngOnInit() {
    //Init
    this.step = 0;
    for (let i = 8; i <= 23; i++) {
      this.availableHours.push(i);
    }
    for (let i = 0; i < 60; i += 15) {
      this.availableMinutes.push(i);
    }
    if (!this.value) this.value = moment();
  }

  ngAfterContentInit() {
    this.picker.save.subscribe(() => this.onSave());
    this.picker.close.subscribe(() => this.onClose());
  }

  selectHour(hour: number): void {
    this.tempHour.hour(hour)
    if (!this.saveButton) this.value.hour(hour);
    this.step = 1;
  }

  isHourSelected(hour: number): boolean {
    return this.tempHour ? _.isEqual(hour, this.tempHour.hours()) : false;
  }

  selectMinute(minute: number): void {
    this.tempHour.minute(minute);
    if (!this.saveButton) this.value.minute(minute);
    this.step = 0;
  }

  isMinuteSelected(minute: number): boolean {
    return this.tempHour ? _.isEqual(minute, this.tempHour.minutes()) : false;
  }

  onSave() {
    this.value.hour(this.tempHour.hours());
    this.value.minute(this.tempHour.minutes());
    this.save.next(this.value);
  }

  onClose() {
    this.close.next();
  }

}
