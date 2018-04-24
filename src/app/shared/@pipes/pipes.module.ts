import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdatePipe } from './ldate.pipe';

const moduleComponents = [
  LdatePipe
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents]
})
export class PipesModule { }
