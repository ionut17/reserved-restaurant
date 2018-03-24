import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../shared/services/restaurant.service';
import { SocketService } from '../shared/services/socket.service';
import { Restaurant } from '../shared/model';

@Component({
  selector: 'rs-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private restaurantService: RestaurantService){
    this.restaurantService.restaurantChange().subscribe((res:Restaurant)=>{
      console.log(res);
      this.restaurant = res;
    });
  }

  ngOnInit() {
  }

}
