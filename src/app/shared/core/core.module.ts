import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { AccordionComponent } from './accordion/accordion.component';
import { IconComponent } from './icon/icon.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { OverlayModule } from '@angular/cdk/overlay';

const moduleComponents = [
  HeaderComponent,
  LogoComponent,
  AccordionComponent,
  IconComponent,
  SidemenuComponent
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents],
  entryComponents: [SidemenuComponent]
})
export class CoreModule { }
