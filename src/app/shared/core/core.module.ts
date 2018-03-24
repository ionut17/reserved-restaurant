import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { AccordionComponent } from './accordion/accordion.component';
import { IconComponent } from './icon/icon.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TimeboxComponent } from './timebox/timebox.component';
import { TimeboxEntryComponent } from './timebox/timebox-entry/timebox-entry.component';

const moduleComponents = [
  HeaderComponent,
  LogoComponent,
  AccordionComponent,
  IconComponent,
  TimeboxComponent
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [moduleComponents, TimeboxEntryComponent],
  exports: [moduleComponents]
})
export class CoreModule { }
