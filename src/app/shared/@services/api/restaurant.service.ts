import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { ApiService } from "./api.service";
import { Restaurant, Reservation, ReservationExtended, ReservationConfigHttp } from "../../@model";
import { reservationEndpoint } from "./reservation.service";

export const restaurantEndpoint: string = 'restaurants';

@Injectable()
export class RestaurantService extends ApiService<Restaurant>{

	constructor(http: HttpClient) {
		super(http, restaurantEndpoint);
	}

	getImagePath(id: string):string{
		return `${this.apiPath}/${id}/cover`;
	}

	getReservationsById(id: string, config: ReservationConfigHttp): Observable<Array<ReservationExtended>> {
		return this.http.get(`${this.apiPath}/${id}/${reservationEndpoint}`, { params: { ...config } }) as Observable<Array<ReservationExtended>>;
	}

	getCurrentReservationsById(id: string, config: ReservationConfigHttp): Observable<Array<ReservationExtended>> {
		return this.http.get(`${this.apiPath}/${id}/${reservationEndpoint}/current`, { params: { ...config } }) as Observable<Array<ReservationExtended>>;
	}

}