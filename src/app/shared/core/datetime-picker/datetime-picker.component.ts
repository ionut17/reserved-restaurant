import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ValueAccessorBase } from '../shared';

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
export class DatetimePickerComponent extends ValueAccessorBase<Moment> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
