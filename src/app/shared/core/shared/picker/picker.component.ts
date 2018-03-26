import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rs-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit {

  @Output() save:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.save.emit();
  }

}
