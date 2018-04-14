import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { DropdownComponent } from './dropdown/dropdown.component';

const SharedModules = [
  InputComponent,
  TextareaComponent,
  DropdownComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...SharedModules],
  exports: [...SharedModules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomFormsModule { }
