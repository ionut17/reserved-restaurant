import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { ApiService } from "./api.service";
import { Client } from "../../@model";

export const clientEndpoint: string = 'clients';

@Injectable()
export class ClientService extends ApiService<Client>{

	constructor(http: HttpClient) {
		super(http, clientEndpoint);
	}

}