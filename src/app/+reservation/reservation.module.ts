import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationManagerService, RestaurantService, ReservationService, RestaurantManagerService } from '../shared/@services';
import { CoreModule } from '../shared/core';
import { PipesModule, LdatePipe } from '../shared/@pipes';
import { TableOverviewModule } from '../shared/table-overview/table-overview.module';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { ReservationSidebarComponent } from './reservation-sidebar/reservation-sidebar.component';
import { ReservationEntryComponent } from './reservation-entry/reservation-entry.component';
import { ReservationStatusbarComponent } from './reservation-statusbar/reservation-statusbar.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CoreModule,
    PipesModule,
    TableOverviewModule
  ],
  declarations: [ReservationComponent, ReservationSidebarComponent, ReservationEntryComponent, ReservationStatusbarComponent],
  providers: [RestaurantManagerService, ReservationManagerService, RestaurantService, ReservationService, LdatePipe]
})
export class ReservationModule { }
