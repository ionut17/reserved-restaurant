import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Item } from '../model';

export class ApiService<T extends Item>{

	protected apiPath: string;

	constructor(protected http: HttpClient, servicePath: string){
		this.apiPath = `${environment.apiEndpoint}/${environment.apiVersion}/${servicePath}`;
	}

	getById(id: string):Observable<T>{
		return this.http.get(`${this.apiPath}/${id}`) as Observable<T>;
	}

	getAll():Observable<Array<T>>{
		return this.http.get(this.apiPath) as Observable<Array<T>>;
	}

	post(item: T):Observable<T>{
		return this.http.post(`${this.apiPath}`, item) as Observable<T>;
	}

	update(item: T):Observable<T>{
		return this.http.put(`${this.apiPath}/${item.id}`, item) as Observable<T>;
	}
}