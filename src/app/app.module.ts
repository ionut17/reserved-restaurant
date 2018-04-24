import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { PopupService, SocketService, UtilService } from './shared/@services';
import { CoreModule } from './shared/core';
import { SidemenuModule, SidemenuService } from './shared/sidemenu';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PipesModule } from './shared/@pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    HttpClientModule,
    MatMomentDateModule,
    NoopAnimationsModule,
    CoreModule,
    PipesModule,
    SidemenuModule
  ],
  providers: [PopupService, SocketService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
