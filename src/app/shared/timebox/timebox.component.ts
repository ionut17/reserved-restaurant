import { Component, OnInit, OnDestroy, NgZone, ComponentRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/interval';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Openable } from '../@model';
import { PopupService } from '../@services';
import { TimeboxService } from './timebox.service';
import { DatetimePickerComponent } from '../core/datetime-picker/datetime-picker.component';

@Component({
  selector: 'rs-timebox',
  templateUrl: './timebox.component.html',
  styleUrls: ['./timebox.component.scss']
})
export class TimeboxComponent implements OnInit, OnDestroy {

  currentTime: Moment = moment();
  selectedTime: Moment;
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
    this.timeboxService.select(undefined);
    //Current time update
    this.ngZone.runOutsideAngular(() => {
      self.intervalSubscription = Observable.interval(1000).subscribe(x => {
        const newDate: Moment = moment();
        if (newDate.seconds() == 0) {
          self.ngZone.run(() => {
            self.currentTime = newDate;
          });
        }
      });
    });
    //Selected time update
    this.timeboxService.selectedItemChange.subscribe(() => {
      this.selectedTime = this.timeboxService.selectedItem;
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  openTimePicker(): void {
    const instance: Openable = this.popupService.show(DatetimePickerComponent);
    instance.close.subscribe(() => {
      this.popupService.hide();
    });
    instance.save.subscribe((time: Moment) => {
      this.timeboxService.select(time);
      this.popupService.hide();
    });
  }

  clearSelectedTime(): void {
    this.timeboxService.select(undefined);
  }

}
