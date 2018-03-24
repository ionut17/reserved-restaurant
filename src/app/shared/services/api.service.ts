import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Item } from '../model';

export class ApiService<T extends Item>{

	protected apiPath: string;

	constructor(private http: HttpClient, servicePath: string){
		this.apiPath = `${environment.apiEndpoint}/${environment.apiVersion}/${servicePath}`;
	}

	getAll():Observable<Array<T>>{
		return this.http.get(this.apiPath) as Observable<Array<T>>;
	}

}