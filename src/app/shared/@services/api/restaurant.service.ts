import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { ApiService } from "./api.service";
import { Restaurant, Reservation, ReservationStatus, ReservationConfigHttp } from "../../@model";
import { SocketService } from "../socket/socket.service";
import { environment } from "../../../../environments/environment";
import { ReservationService, reservationEndpoint } from "./reservation.service";

export const restaurantEndpoint: string = 'restaurants';

@Injectable()
export class RestaurantService extends ApiService<Restaurant>{

	private socketClient: Stomp.Client;

	constructor(http: HttpClient,
				private reservationService: ReservationService) {
		super(http, restaurantEndpoint);
	}

	getReservationsById(id: string, config: ReservationConfigHttp): Observable<Array<Reservation>> {
		return this.http.get(`${this.apiPath}/${id}/${reservationEndpoint}`, { params: { ...config } }) as Observable<Array<Reservation>>;
	}

}