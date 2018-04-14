import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseFormComponent } from '../shared/base-form.component';

export const TEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
};

@Component({
  selector: 'rs-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [TEXTAREA_VALUE_ACCESSOR]
})
export class TextareaComponent extends BaseFormComponent<string> implements OnInit {

  @Input() rows: number = 3;

  constructor() {
    super();
    this.value = '';
  }

  ngOnInit() {
  }

}
