import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ApiService } from "./api.service";
import { Restaurant, Reservation } from "../model";

const serviceEndpoint: string = 'restaurants';

@Injectable()
export class RestaurantService extends ApiService<Restaurant>{

	constructor(http: HttpClient) {
		super(http, serviceEndpoint);
	}

	getReservationsById(id:string):Observable<Array<Reservation>>{
		return this.http.get(`${this.apiPath}/${id}/reservations`, {
			params: {
				"startTime": "2018-03-23T13:29"
			}
		}) as Observable<Array<Reservation>>;
	}

}