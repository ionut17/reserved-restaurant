import { WeekDay } from './week-day.model';
import { TimeInterval } from './time-interval.model';
import { Item } from "../item.model";
import { Table } from "../table.model";

export class Restaurant extends Item{
	name: string;
	address: string;
	email: string;
	tables: Array<Table>;
	schedule: Map<WeekDay, TimeInterval>;
}