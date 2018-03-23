import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { SidemenuComponent } from './sidemenu.component';
import { SidemenuButtonComponent } from './sidemenu-button/sidemenu-button.component';
import { SidemenuService } from './sidemenu.service';
import { CoreModule } from '../core';

const moduleComponents = [
  SidemenuComponent,
  SidemenuButtonComponent
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents],
  providers: [SidemenuService],
  entryComponents: [SidemenuComponent]
})
export class SidemenuModule { }
