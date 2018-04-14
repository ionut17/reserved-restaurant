import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormComponent } from '../shared/base-form.component';

export const INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
};

@Component({
  selector: 'rs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR]
})
export class InputComponent extends BaseFormComponent<string> implements OnInit {

  @Input() type: 'text' | 'number' = 'text';

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
