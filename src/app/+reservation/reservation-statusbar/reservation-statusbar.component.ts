import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../../shared/@model';

@Component({
  selector: 'rs-reservation-statusbar',
  templateUrl: './reservation-statusbar.component.html',
  styleUrls: ['./reservation-statusbar.component.scss']
})
export class ReservationStatusbarComponent {

  @Input() restaurant: Restaurant;

}
