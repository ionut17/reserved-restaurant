import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'rs-timebox',
  templateUrl: './timebox.component.html',
  styleUrls: ['./timebox.component.scss']
})
export class TimeboxComponent implements OnInit, OnDestroy {

  private currentTime: Moment = moment();
  private intervalSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.intervalSubscription = Observable.interval(1000).subscribe(x => {
      const newDate: Moment = moment();
      if (newDate.seconds() == 0){
        this.currentTime = newDate;
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

}
