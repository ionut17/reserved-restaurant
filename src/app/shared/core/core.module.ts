import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { AccordionComponent } from './accordion/accordion.component';
import { IconComponent } from './icon/icon.component';

const moduleComponents = [
  HeaderComponent,
  LogoComponent,
  AccordionComponent,
  IconComponent
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [moduleComponents],
  exports: [moduleComponents]
})
export class CoreModule { }
