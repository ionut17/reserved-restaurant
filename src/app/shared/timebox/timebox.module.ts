import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { PipesModule } from '../@pipes';
import { TimeboxService } from './timebox.service';
import { TimeboxComponent } from './timebox.component';
import { TimeboxEntryComponent } from './timebox-entry/timebox-entry.component';

const moduleComponents = [
  TimeboxComponent
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    PipesModule,
    FormsModule
  ],
  declarations: [moduleComponents, TimeboxEntryComponent],
  exports: [moduleComponents],
  providers: [TimeboxService]
})
export class TimeboxModule { }
