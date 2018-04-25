import { Component, OnInit, AfterContentInit, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ValueAccessorBase } from '../shared';
import { Subject } from 'rxjs/Subject';

import { Moment } from 'moment';
import * as moment from 'moment';

import { PickerComponent } from '../shared/picker/picker.component';

export const CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'rs-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [CUSTOM_DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerComponent extends ValueAccessorBase<Moment> implements OnInit, AfterContentInit {

  @ViewChild(PickerComponent) picker: PickerComponent;

  @Input() saveButton: boolean = true;
  @Input() closeButton: boolean = true;

  @Output() save: Subject<Moment> = new Subject<Moment>();
  @Output() close: Subject<any> = new Subject<any>();

  minDate: Moment;
  tempDate: Moment = moment();

  get formattedDate(): string {
    return this.tempDate ? this.tempDate.format('DD MMM YYYY') : "";
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.minDate = moment();
    if (!this.value) this.value = moment();
  }

  ngAfterContentInit() {
    this.picker.save.subscribe(() => this.onSave());
    this.picker.close.subscribe(() => this.onClose());
  }

  onCalendarChange(date: Moment) {
    this.tempDate = date;
    if (!this.saveButton) this.onSave();
  }

  onSave() {
    this.value.year(this.tempDate.year());
    this.value.month(this.tempDate.month());
    this.value.date(this.tempDate.date());
    this.save.next(this.value);
  }

  onClose() {
    this.close.next();
  }

}
