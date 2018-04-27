import { Component, OnInit, Input, HostBinding, SimpleChanges } from '@angular/core';
import { Table, Reservation } from '../../@model';

@Component({
  selector: 'rs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() table: Table;

  @Input() nextReservation: Reservation;

  @Input() @HostBinding('class.is-selected') selected: boolean = false;

  @Input() @HostBinding('class.is-disabled') disabled: boolean = false;

  @Input() @HostBinding('class.is-linked') linked: boolean = false;

  tableChairs: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['table']){
      this.tableChairs = Array(this.table.capacity);
    }
  }

}
