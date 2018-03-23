import { Component, OnInit } from '@angular/core';
import { Table } from '../model';
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

  tables: Table[] = [];

  constructor(private tableManagerService: TableManagerService,
              private reservationManagerService: ReservationManagerService) { }

  ngOnInit() {
    for (let i=1;i<10;i++){
      this.tables.push({
        id: `id${i}`,
        number: i,
        reservedHour: i%4==0? `0${1}:00` : undefined
      });
    }
  }

  isSelected(table: Table):boolean{
    return this.tableManagerService.isSelected(table);
  }

  isLinked():boolean{
    return this.reservationManagerService.hasSelected();
  }

  selectTable(event: Event, table: Table):void{
    //Prevent menu hiding
    event.stopPropagation();
    event.preventDefault();
    //Set the different behaviour if a reservation is selected
    const isReservationSelected: boolean = this.reservationManagerService.hasSelected();
    switch(isReservationSelected){
      case true:
        //In case of reservation selected, allow only the selection of other tables and without menu interaction
        if (!this.tableManagerService.isSelected(table)){
          this.tableManagerService.select(table, false);
        }
        break;
      case false:
        this.tableManagerService.select(table);
        break;
    }
  }

}
