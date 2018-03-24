import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestaurantService } from '../shared/services/restaurant.service';
import { SocketService } from '../shared/services/socket.service';
import { Restaurant, Reservation } from '../shared/model';
import { Subscription } from 'rxjs/Subscription';

const restaurantId: string = '069066a3-9bfd-4e3e-8676-53735fd27434';

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

  constructor(private restaurantService: RestaurantService){
    this.restaurantService.getById(restaurantId).subscribe((res:Restaurant)=>{
      this.restaurant = res;
    });
    this.restaurantService.getReservationsById(restaurantId).subscribe((res:Reservation[])=>{
      this.reservations = res;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.restaurantServiceSubscription){
      this.restaurantServiceSubscription.unsubscribe();
    }
    if (this.restaurantReservationsSubscription){
      this.restaurantReservationsSubscription.unsubscribe();
    }
  }

}
