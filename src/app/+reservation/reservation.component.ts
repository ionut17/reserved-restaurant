import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../shared/services/restaurant.service';
import { SocketService } from '../shared/services/socket.service';
import { Restaurant, Reservation } from '../shared/model';

const restaurantId: string = '069066a3-9bfd-4e3e-8676-53735fd27434';

@Component({
  selector: 'rs-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  restaurant: Restaurant;
  reservations: Reservation[];

  constructor(private restaurantService: RestaurantService){
    this.restaurantService.getById(restaurantId).subscribe((res:Restaurant)=>{
      this.restaurant = res;
    });
    this.restaurantService.getReservationsById(restaurantId).subscribe((res:Reservation[])=>{
      console.log(res);
      this.reservations = res;
    });
  }

  ngOnInit() {
  }

}
