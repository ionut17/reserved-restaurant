import { Component, OnInit, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ValueAccessorBase } from '../shared';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { Openable } from '../../services/interfaces';

export const CUSTOM_DATETIMEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatetimePickerComponent),
  multi: true
};

@Component({
  selector: 'rs-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  providers: [CUSTOM_DATETIMEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatetimePickerComponent extends ValueAccessorBase<Moment> implements OnInit, Openable {

  @ViewChild(TimePickerComponent) timePickerComponent: TimePickerComponent;

  @Input() popupMode: boolean = false;

  @Input() saveButton: boolean = true;
  @Input() closeButton: boolean = true;
  @Output() save: Subject<Moment> = new Subject<Moment>();
  @Output() close: Subject<any> = new Subject<any>();

  constructor() {
    super();
  }

  ngOnInit() {
    this.value = moment();
  }

  onSave() {
    this.save.next(this.value);
  }

  onClose() {
    this.close.next();
  }

}
