import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { Moment } from 'moment';
import * as moment from 'moment';
import { TimeboxService } from './timebox.service';

@Component({
  selector: 'rs-timebox',
  templateUrl: './timebox.component.html',
  styleUrls: ['./timebox.component.scss']
})
export class TimeboxComponent implements OnInit, OnDestroy {

  private currentTime: Moment = moment();
  private selectedTime: Moment = moment();
  private intervalSubscription: Subscription;

  constructor(private ngZone: NgZone,
              private timeboxService: TimeboxService) { }

  /**
   * Create an Observable timer which updates every second
   * It changes the current time only every minute and
   * activates the change detection system only then
   */
  ngOnInit() {
    const self = this;
    this.ngZone.runOutsideAngular(() => {
      self.intervalSubscription = Observable.interval(1000).subscribe(x => {
        const newDate: Moment = moment();
        if (newDate.seconds() == 0){
          self.ngZone.run(()=>{
            if(this.timeboxService.isSelected(self.currentTime)){
              this.timeboxService.select(newDate);
            }
            self.currentTime = newDate;
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

  openTimePicker():void{
    this.selectedTime = moment();
    this.timeboxService.select(this.selectedTime);
  }

  clearSelectedTime():void{
    this.selectedTime = undefined;
    this.timeboxService.select(this.currentTime);
  }

}
