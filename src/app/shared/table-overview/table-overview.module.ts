import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOverviewComponent } from './table-overview.component';
import { TableGroupComponent } from './table-group/table-group.component';
import { TableComponent } from './table/table.component';
import { TableManagerService } from './table-manager.service';
import { CoreModule } from '../core';
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
