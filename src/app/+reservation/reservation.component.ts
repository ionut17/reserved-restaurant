import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restaurant, Reservation, SocketEntityWrapper } from '../shared/model';
import { SocketPayloadAction } from '../shared/model/socket/socket-payload-action.enum';
import { Subscription } from 'rxjs/Subscription';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as Stomp from "stompjs";

import { SocketService, RestaurantService, reservationEndpoint } from '../shared/services';
import { TimeboxService } from '../shared/timebox/timebox.service';
import { RestaurantManagerService } from './restaurant-manager.service';

const restaurantId: string = 'd3c498c1-fae8-445f-ab57-abfc7481cf93';

@Component({
  selector: 'rs-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {

  restaurant: Restaurant;
  reservations: Map<string, Reservation>;

  private restaurantServiceSubscription: Subscription;
  private restaurantReservationsSubscription: Subscription;

  constructor(private restaurantService: RestaurantService,
              private restaurantManagerService: RestaurantManagerService,
              private socketService: SocketService,
              private timeboxService: TimeboxService) {
    this.initialize();
  }

  ngOnInit() {
    this.restaurantManagerService.selectedItemChange.subscribe(() => {
      this.restaurant = this.restaurantManagerService.selectedItem;
    });
  }

  ngOnDestroy() {
    if (this.restaurantServiceSubscription) {
      this.restaurantServiceSubscription.unsubscribe();
    }
    if (this.restaurantReservationsSubscription) {
      this.restaurantReservationsSubscription.unsubscribe();
    }
  }

  private syncReservations(message: Stomp.Message) {
    const socketResponse: SocketEntityWrapper = JSON.parse(message.body) as SocketEntityWrapper;
    const reservation: Reservation = socketResponse.socketEntity as Reservation;
    switch (socketResponse.action) {
      case SocketPayloadAction.Created:
        this.reservations.set(reservation.id, reservation);
        break;
      case SocketPayloadAction.Updated:
        if (this.reservations.has(reservation.id)) {
          if (moment(reservation.endTime).isAfter(moment())){
            this.reservations.set(reservation.id, reservation);
          } else{
            this.reservations.delete(reservation.id);
          }
        }
        break;
      case SocketPayloadAction.Deleted:
        this.reservations.delete(reservation.id);
        break;
    }
    this.reservations = new Map(this.reservations); //Drop old cached version
  }

  private initialize() {
    //Restaurant subscription
    this.restaurantServiceSubscription = this.restaurantService.getAll().subscribe((res: Restaurant[]) => {
      this.restaurantService.getById(res[1].id).subscribe((res: Restaurant) => {
        this.restaurantManagerService.select(res);
        this.initializeReservations(res.id);
      });
    });
    //Initialize the socket and pass a callback function to get the message
    this.socketService.initializeWebSocket(reservationEndpoint, this.syncReservations.bind(this));
  }

  private initializeReservations(restaurantId: string){
    //Reservations subscription when a time is selected (current time by default)
    this.timeboxService.selectedItemChange.subscribe((res) => {
      //Dispose the old subscription
      if (this.restaurantReservationsSubscription) this.restaurantReservationsSubscription.unsubscribe();
      //Make the new subscription
      this.restaurantReservationsSubscription = this.restaurantService
        .getReservationsById(restaurantId, {
          startTime: this.timeboxService.hasSelected() ? this.timeboxService.selectedItem.toISOString() : moment().toISOString()
        }).subscribe((res: Reservation[]) => {
          this.reservations = new Map();
          res.forEach((reservation: Reservation) => {
            this.reservations.set(reservation.id, reservation);
          });
        });
    });
    this.timeboxService.selectedItemChange.emit();
  }

}
