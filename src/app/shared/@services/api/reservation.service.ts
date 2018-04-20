import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ApiService } from "./api.service";
import { Reservation } from "../../@model";

export const reservationEndpoint: string = 'reservations';

@Injectable()
export class ReservationService extends ApiService<Reservation>{

	constructor(http: HttpClient) {
		super(http, reservationEndpoint);
	}

}