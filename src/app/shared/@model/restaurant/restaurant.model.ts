import { Item } from "../item.model";
import { Table } from "./table.model";
import { WeekDay } from './week-day.enum';
import { TimeInterval } from './time-interval.model';

export class Restaurant extends Item {
	name: string;
	address: string;
	email: string;
	tables: Array<Table>;
	schedule: Map<WeekDay, TimeInterval>;
	defaultClientId: string;
}