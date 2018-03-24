import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './shared/core';
import { SidemenuModule, SidemenuService } from './shared/sidemenu';
import { SocketService } from './shared/services/socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    HttpClientModule,
    CoreModule,
    SidemenuModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
