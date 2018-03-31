import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Table, Reservation, ReservationStatus } from '../model';
import { SidemenuService } from '../sidemenu';
import { TableManagerService } from './table-manager.service';
import { ReservationManagerService } from '../../+reservation/reservation-manager.service';
import { TimeboxComponent } from '../timebox/timebox.component';

@Component({
  selector: 'rs-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverviewComponent implements OnInit {

  @Input() tables: Table[] = [];
  @Input() reservations: Reservation[] = [];

  constructor(private tableManagerService: TableManagerService,
              private reservationManagerService: ReservationManagerService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tables'] && this.tables) {
      this.tables.sort((a: Table, b: Table) => a.number - b.number);
    }
    if (changes['reservations'] && this.reservations) {
      this.tableManagerService.updateReservations(this.reservations);
    }
  }

  isSelected(table: Table): boolean {
    return this.tableManagerService.isSelected(table);
  }

  isLinked(): boolean {
    return this.reservationManagerService.hasSelected();
  }

  isDisabled(table: Table): boolean {
    return this.tableManagerService.isDisabled(table);
  }

  selectTable(event: Event, table: Table): void {
    //Prevent menu hiding
    event.stopPropagation();
    event.preventDefault();
    //Set the different behaviour if a reservation is selected
    this.tableManagerService.select(table);
  }

}
