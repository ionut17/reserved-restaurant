import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { AccordionComponent } from './accordion/accordion.component';
import { IconComponent } from './icon/icon.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DatetimePickerComponent } from './datetime-picker/datetime-picker.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { PickerComponent } from './shared/picker/picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { PreloaderComponent } from './preloader/preloader.component';

const moduleComponents = [
  HeaderComponent,
  LogoComponent,
  AccordionComponent,
  IconComponent,
  TimePickerComponent,
  DatetimePickerComponent,
  DatePickerComponent,
  PreloaderComponent
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule
  ],
  declarations: [moduleComponents, PickerComponent],
  entryComponents: [DatetimePickerComponent, DatePickerComponent, TimePickerComponent],
  exports: [moduleComponents]
})
export class CoreModule { }
