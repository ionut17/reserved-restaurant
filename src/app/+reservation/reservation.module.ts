import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { CoreModule } from '../shared/core';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CoreModule
  ],
  declarations: [ReservationComponent, ReservationListComponent]
})
export class ReservationModule { }
