import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restaurant, Reservation } from '../shared/model';
import { Subscription } from 'rxjs/Subscription';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as Stomp from "stompjs";

import { SocketService, RestaurantService, reservationEndpoint } from '../shared/services';
import { TimeboxService } from '../shared/timebox/timebox.service';

const restaurantId: string = 'eed9fcec-76c5-42c1-bc03-addc2ee70fba';

@Component({
  selector: 'rs-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {

  restaurant: Restaurant;
  reservations: Reservation[];

  private restaurantServiceSubscription: Subscription;
  private restaurantReservationsSubscription: Subscription;

  constructor(private restaurantService: RestaurantService,
              private socketService: SocketService,
              private timeboxService: TimeboxService) {
    this.initialize();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.restaurantServiceSubscription) {
      this.restaurantServiceSubscription.unsubscribe();
    }
    if (this.restaurantReservationsSubscription) {
      this.restaurantReservationsSubscription.unsubscribe();
    }
  }

  private syncReservations(message: Stomp.Message) {
    console.log(message);
  }

  private initialize(){
    //Restaurant subscription
    this.restaurantServiceSubscription = this.restaurantService.getById(restaurantId).subscribe((res: Restaurant) => {
      this.restaurant = res;
    });
    //Reservations subscription when a time is selected (current time by default)
    this.timeboxService.selectedItemChange.subscribe((res)=>{
      //Dispose the old subscription
      if (this.restaurantReservationsSubscription) this.restaurantReservationsSubscription.unsubscribe();
      //Make the new subscription
      this.restaurantReservationsSubscription = this.restaurantService.getReservationsById(restaurantId, {
        startTime: this.timeboxService.hasSelected() ? this.timeboxService.selectedItem.toISOString() : moment().toISOString()
      }).subscribe((res: Reservation[]) => {
        this.reservations = res;
        console.log(res);
      });
    });
    //Initialize the socket and pass a callback function to get the message
    this.socketService.initializeWebSocket(reservationEndpoint, this.syncReservations);
  }

}
