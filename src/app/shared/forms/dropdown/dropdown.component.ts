import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormComponent } from '../shared/base-form.component';

export const INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
};

@Component({
  selector: 'rs-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [INPUT_VALUE_ACCESSOR]
})
export class DropdownComponent extends BaseFormComponent<string> implements OnInit {

  @Input() items: any;
  @Input() propertyValue: string;
  @Input() propertyLabel: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getValue(item: any):string{
    return this.propertyValue ? item[this.propertyValue] : '';
  }

  getLabel(item: any):string{
    return this.propertyLabel ? item[this.propertyLabel] : '';
  }

}
