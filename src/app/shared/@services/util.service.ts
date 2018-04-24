import { Injectable } from "@angular/core";
import { Moment } from "moment";
import * as moment from "moment";

@Injectable()
export class UtilService{

	localFromServerDate(date:string | Date):Moment{
		return moment.utc(date);
	}

}