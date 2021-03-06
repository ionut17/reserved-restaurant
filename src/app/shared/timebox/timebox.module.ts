import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeboxComponent } from './timebox.component';
import { TimeboxEntryComponent } from './timebox-entry/timebox-entry.component';
import { CoreModule } from '../core';
import { TimeboxService } from './timebox.service';

const moduleComponents = [
  TimeboxComponent
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  declarations: [moduleComponents, TimeboxEntryComponent],
  exports: [moduleComponents],
  providers: [TimeboxService]
})
export class TimeboxModule { }
