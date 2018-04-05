import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Table } from '../../@model';

@Component({
  selector: 'rs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() table: Table;

  @Input() @HostBinding('class.is-selected') selected: boolean = false;

  @Input() @HostBinding('class.is-disabled') disabled: boolean = false;

  @Input() @HostBinding('class.is-linked') linked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
