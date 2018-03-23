import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './shared/core';
import { SidemenuModule, SidemenuService } from './shared/sidemenu';
import { SocketService } from './shared/services/socket.service';

const config: SocketIoConfig = { url: 'http://localhost:8080/reservations', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    OverlayModule,
    CoreModule,
    SidemenuModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
