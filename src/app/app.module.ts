import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Router } from '@angular/router';
import { CoreModule } from './shared/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    CoreModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
