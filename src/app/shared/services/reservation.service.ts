import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { ApiService } from "./api.service";
import { Restaurant, Reservation, ReservationStatus } from "../model";
import { SocketService } from "./socket.service";
import { environment } from "../../../environments/environment";

export const reservationEndpoint: string = 'reservations';

@Injectable()
export class ReservationService extends ApiService<Reservation>{

	constructor(http: HttpClient) {
		super(http, reservationEndpoint);
	}

}