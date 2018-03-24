import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ApiService } from "./api.service";
import { Restaurant } from "../model";

const serviceEndpoint: string = 'restaurants';

@Injectable()
export class RestaurantService extends ApiService<Restaurant>{

	private restaurant: Restaurant;
	private restaurantSubject$: Subject<Restaurant> = new Subject<Restaurant>();

	constructor(http: HttpClient) {
		super(http, serviceEndpoint);
		this.getAll().subscribe((res:Array<Restaurant>)=>{
			this.restaurant = res[0];
			this.restaurantSubject$.next(this.restaurant);
		});
	}

	restaurantChange():Observable<Restaurant>{
		return this.restaurantSubject$.asObservable();
	}

}