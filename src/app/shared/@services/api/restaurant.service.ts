import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { ApiService } from "./api.service";
import { Restaurant, Reservation, ReservationConfigHttp } from "../../@model";
import { reservationEndpoint } from "./reservation.service";

export const restaurantEndpoint: string = 'restaurants';

@Injectable()
export class RestaurantService extends ApiService<Restaurant>{

	constructor(http: HttpClient) {
		super(http, restaurantEndpoint);
	}

	getReservationsById(id: string, config: ReservationConfigHttp): Observable<Array<Reservation>> {
		return this.http.get(`${this.apiPath}/${id}/${reservationEndpoint}`, { params: { ...config } }) as Observable<Array<Reservation>>;
	}

}