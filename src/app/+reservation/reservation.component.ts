import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as Stomp from "stompjs";

import { Restaurant, Reservation, SocketEntityWrapper, SocketPayloadAction, ReservationFull } from '../shared/@model';
import { SocketService, RestaurantService, reservationEndpoint, RestaurantManagerService } from '../shared/@services';
import { TimeboxService } from '../shared/timebox/timebox.service';

const restaurantId: string = 'd3c498c1-fae8-445f-ab57-abfc7481cf93';

@Component({
  selector: 'rs-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {

  restaurant: Restaurant;
  reservations: Map<string, Reservation>;
  fullReservations: Map<string, ReservationFull>;

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
    const reservation: ReservationFull = socketResponse.socketEntity as ReservationFull;
    switch (socketResponse.action) {
      case SocketPayloadAction.Created:
        this.fullReservations.set(reservation.id, reservation);
        break;
      case SocketPayloadAction.Updated:
        if (this.fullReservations.has(reservation.id)) {
          if (moment(reservation.endTime).isAfter(moment())){
            this.fullReservations.set(reservation.id, reservation);
          } else{
            this.fullReservations.delete(reservation.id);
          }
        }
        break;
      case SocketPayloadAction.Deleted:
        this.fullReservations.delete(reservation.id);
        break;
    }
    this.fullReservations = new Map(this.fullReservations); //Drop old cached version
    this.reservations = this.full2BaseReservations(this.fullReservations);
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
        }).subscribe((res: ReservationFull[]) => {
          this.fullReservations = new Map();
          res.forEach((reservationFull: ReservationFull) => {
            this.fullReservations.set(reservationFull.id, reservationFull);
          });
          this.reservations = this.full2BaseReservations(this.fullReservations);
        });
    });
    this.timeboxService.selectedItemChange.emit();
  }

  private full2BaseReservations(fullReservations: Map<string, ReservationFull>):Map<string, Reservation>{
    let baseReservations: Map<string, Reservation> = new Map();
    fullReservations.forEach((reservationFull: ReservationFull)=>{
      baseReservations.set(reservationFull.id, Object.assign({
        'clientId': reservationFull.client.id
      }, reservationFull));
    });
    return baseReservations;
  }

}
