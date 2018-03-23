import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../../model';

@Component({
  selector: 'rs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() table: Table;

  constructor() { }

  ngOnInit() {
  }

}
