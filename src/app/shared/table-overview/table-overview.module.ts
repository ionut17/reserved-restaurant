import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOverviewComponent } from './table-overview.component';
import { TableGroupComponent } from './table-group/table-group.component';
import { TableComponent } from './table/table.component';

const moduleComponents = [
  TableOverviewComponent,
  TableGroupComponent,
  TableComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents]
})
export class TableOverviewModule { }
