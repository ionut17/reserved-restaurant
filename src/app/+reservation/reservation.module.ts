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

@NgModule({
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CoreModule,
    TableOverviewModule
  ],
  declarations: [ReservationComponent, ReservationSidebarComponent, ReservationEntryComponent, ReservationStatusbarComponent],
  providers: [ReservationManagerService]
})
export class ReservationModule { }
