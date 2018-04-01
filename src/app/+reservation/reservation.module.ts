import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { CoreModule } from '../shared/core';
import { ReservationComponent } from './reservation.component';
import { ReservationSidebarComponent } from './reservation-sidebar/reservation-sidebar.component';
import { ReservationEntryComponent } from './reservation-entry/reservation-entry.component';
import { ReservationStatusbarComponent } from './reservation-statusbar/reservation-statusbar.component';
import { ReservationManagerService } from './reservation-manager.service';
import { TableOverviewModule } from '../shared/table-overview/table-overview.module';
import { RestaurantService } from '../shared/services/restaurant.service';
import { ReservationService } from '../shared/services/reservation.service';
import { RestaurantManagerService } from './restaurant-manager.service';

@NgModule({
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CoreModule,
    TableOverviewModule
  ],
  declarations: [ReservationComponent, ReservationSidebarComponent, ReservationEntryComponent, ReservationStatusbarComponent],
  providers: [RestaurantManagerService, ReservationManagerService, RestaurantService, ReservationService]
})
export class ReservationModule { }
