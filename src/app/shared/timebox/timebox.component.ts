import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Moment } from 'moment';
import * as moment from 'moment';

import { TimeboxService } from './timebox.service';
import { PopupService } from '../services/popup.service';
import { TimePickerComponent } from '../core/time-picker/time-picker.component';
import { Openable } from '../services/interfaces';

@Component({
  selector: 'rs-timebox',
  templateUrl: './timebox.component.html',
  styleUrls: ['./timebox.component.scss']
})
export class TimeboxComponent implements OnInit, OnDestroy {

  private currentTime: Moment = moment();
  private selectedTime: Moment;
  private intervalSubscription: Subscription;

  constructor(private ngZone: NgZone,
              private timeboxService: TimeboxService,
              private popupService: PopupService) { }

  /**
   * Create an Observable timer which updates every second
   * It changes the current time only every minute and
   * activates the change detection system only then
   */
  ngOnInit() {
    const self = this;
    //Current time update
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
    //Selected time update
    this.timeboxService.selectedItemChange.subscribe(()=>{
      this.selectedTime = this.timeboxService.selectedItem;
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

  openTimePicker():void{
    const instance:Openable = this.popupService.show(TimePickerComponent);
    instance.save.subscribe((time:Moment)=>{
      this.timeboxService.select(time);
    });
  }

  clearSelectedTime():void{
    this.timeboxService.select(undefined);
  }

}
