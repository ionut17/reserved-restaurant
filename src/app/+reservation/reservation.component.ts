import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Moment } from 'moment';
import * as moment from 'moment';
import * as Stomp from "stompjs";
import * as _ from "lodash";

import { Restaurant, Reservation, SocketEntityWrapper, SocketPayloadAction, ReservationExtended } from '../shared/@model';
import { SocketService, RestaurantService, reservationEndpoint, RestaurantManagerService, ToasterService } from '../shared/@services';
import { TimeboxService } from '../shared/timebox/timebox.service';
import { environment } from '../../environments/environment';
import { TableOverviewComponent } from '../shared/table-overview/table-overview.component';

const restaurantId: string = 'd3c498c1-fae8-445f-ab57-abfc7481cf93';

@Component({
  selector: 'rs-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {

  @ViewChild(TableOverviewComponent) tableOverview: TableOverviewComponent;

  restaurant: Restaurant;
  reservations: Map<string, Reservation>;
  reservationsExtended: Map<string, ReservationExtended>;

  private restaurantServiceSubscription: Subscription;
  private restaurantReservationsSubscription: Subscription;
  private intervalSubscription: Subscription;

  constructor(private restaurantService: RestaurantService,
              private restaurantManagerService: RestaurantManagerService,
              private socketService: SocketService,
              private timeboxService: TimeboxService,
              private toasterService: ToasterService) {
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
    if (this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

  private syncReservations(message: Stomp.Message) {
    const socketResponse: SocketEntityWrapper = JSON.parse(message.body) as SocketEntityWrapper;
    const reservation: ReservationExtended = socketResponse.socketEntity as ReservationExtended;
    if (reservation.restaurantId !== this.restaurant.id){
      return;
    }
    console.log(reservation);
    switch (socketResponse.action) {
      case SocketPayloadAction.Created:
        this.reservationsExtended.set(reservation.id, reservation);
        const label: string = reservation.people > 1 ? 'persoane' : 'persoana';
        this.toasterService.success(`O rezervare nouă a fost adaugată!`);
        break;
      case SocketPayloadAction.Updated:
        if (this.reservationsExtended.has(reservation.id)) {
          const now: Moment = moment();
          if (moment.utc(reservation.endTime).isAfter(now)){
            this.reservationsExtended.set(reservation.id, reservation);
          } else{
            this.reservationsExtended.delete(reservation.id);
          }
        }
        this.toasterService.success(`O rezervare a fost actualizată!`);
        break;
      case SocketPayloadAction.Deleted:
        this.reservationsExtended.delete(reservation.id);
        this.toasterService.success("O rezervare a fost ștearsă!");
        break;
    }
    this.reservationsExtended = new Map(this.reservationsExtended); //Drop old cached version
    this.reservations = this.getBaseReservationsFrom(this.reservationsExtended); //Replace normal reservations
    this.tableOverview.update(); //Force an update of the table overview
  }

  private initialize() {
    //Restaurant subscription
    this.restaurantServiceSubscription = this.restaurantService.getAll().subscribe((res: Restaurant[]) => {
      this.restaurantService.getById(res[0].id).subscribe((restaurant: Restaurant) => {
        this.restaurantManagerService.select(restaurant);
        this.initializeReservations(restaurant.id);
        this.autoInitializeReservationsUpdate(restaurant);
      });
    });
    //Initialize the socket and pass a callback function to get the message
    this.socketService.initializeWebSocket(reservationEndpoint, this.syncReservations.bind(this));
  }

  private autoInitializeReservationsUpdate(restaurant: Restaurant){
    this.intervalSubscription = Observable.interval(environment.settings.reservationsUpdateInterval).subscribe(()=>{
      this.initializeReservations(restaurant.id);
    });
  }

  private initializeReservations(restaurantId: string){
    //Reservations subscription when a time is selected (current time by default)
    this.timeboxService.selectedItemChange.subscribe(() => {
      //Dispose the old subscription
      if (this.restaurantReservationsSubscription) this.restaurantReservationsSubscription.unsubscribe();
      //Make the new subscription
      this.restaurantReservationsSubscription = this.restaurantService
        .getCurrentReservationsById(restaurantId, {
          startTime: this.timeboxService.hasSelected() ? this.timeboxService.selectedItem.toISOString() : moment().toISOString()
        }).subscribe((res: ReservationExtended[]) => {
          this.reservationsExtended = new Map();
          res.forEach((reservation: ReservationExtended) => {
            this.reservationsExtended.set(reservation.id, reservation);
          });
          this.reservations = this.getBaseReservationsFrom(this.reservationsExtended);
        });
    });
    this.timeboxService.selectedItemChange.emit();
  }

  private getBaseReservationsFrom(reservationsExtended: Map<string, ReservationExtended>):Map<string, Reservation>{
    let baseReservations: Map<string, Reservation> = new Map();
    reservationsExtended.forEach((reservation: ReservationExtended)=>{
      baseReservations.set(reservation.id, Object.assign({
        'clientId': reservation.client.id
      }, reservation));
    });
    return baseReservations;
  }

}
