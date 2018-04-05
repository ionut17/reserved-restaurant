import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableManagerService } from '../@services';
import { TableOverviewComponent } from './table-overview.component';
import { TableGroupComponent } from './table-group/table-group.component';
import { TableComponent } from './table/table.component';
import { CoreModule } from '../core/core.module';
import { TimeboxModule } from '../timebox/timebox.module';

const moduleComponents = [
  TableOverviewComponent,
  TableGroupComponent,
  TableComponent
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TimeboxModule
  ],
  providers: [TableManagerService],
  declarations: [moduleComponents],
  exports: [moduleComponents]
})
export class TableOverviewModule { }
