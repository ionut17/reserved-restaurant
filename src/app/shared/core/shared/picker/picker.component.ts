import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Openable } from '../../../services/interfaces/index';

@Component({
  selector: 'rs-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit, Openable{

  @Output() save:Subject<any> = new Subject();
  @Output() close:Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.save.next();
  }

  onClose(){
    this.close.next();
  }

}
