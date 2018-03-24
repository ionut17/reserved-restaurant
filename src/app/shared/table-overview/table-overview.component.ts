import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Table, Reservation, ReservationStatus } from '../model';
import { SidemenuService } from '../sidemenu';
import { sidemenuButtons } from './model';
import { TableManagerService } from './table-manager.service';
import { ReservationManagerService } from '../../+reservation/reservation-manager.service';

@Component({
  selector: 'rs-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  @Input() tables: Table[] = [];
  @Input() reservations: Reservation[] = [];
  private pendingReservations: Reservation[];
  private fulfilledReservations: Reservation[];
  private fulfilledReservationsTableIds: string[];

  constructor(private tableManagerService: TableManagerService,
    private reservationManagerService: ReservationManagerService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['tables'] && this.tables) {
      this.tables.sort((a: Table, b: Table) => a.number - b.number);
    }
    if (changes['reservations'] && this.reservations) {
      this.pendingReservations = [];
      this.fulfilledReservations = [];
      this.fulfilledReservationsTableIds = [];
      this.reservations.forEach((res: Reservation) => {
        switch (res.status) {
          case ReservationStatus.Pending:
            this.pendingReservations.push(res);
            break;
          case ReservationStatus.Fulfilled:
            this.fulfilledReservations.push(res);
            break;
        }
      });
      this.fulfilledReservations.forEach((entry: Reservation) => {
        this.fulfilledReservationsTableIds.push(...entry.tables);
      });
    }
  }

  isSelected(table: Table): boolean {
    return this.tableManagerService.isSelected(table);
  }

  isLinked(): boolean {
    return this.reservationManagerService.hasSelected();
  }

  isDisabled(table: Table): boolean {
    return this.fulfilledReservationsTableIds ? this.fulfilledReservationsTableIds.indexOf(table.id) > -1 : false;
  }

  selectTable(event: Event, table: Table): void {
    //Prevent menu hiding
    event.stopPropagation();
    event.preventDefault();
    //Set the different behaviour if a reservation is selected
    const isReservationSelected: boolean = this.reservationManagerService.hasSelected();
    switch (isReservationSelected) {
      case true:
        //In case of reservation selected, allow only the selection of other tables and without menu interaction
        if (!this.tableManagerService.isSelected(table)) {
          this.tableManagerService.select(table, false);
        }
        break;
      case false:
        this.tableManagerService.select(table);
        break;
    }
  }

}
