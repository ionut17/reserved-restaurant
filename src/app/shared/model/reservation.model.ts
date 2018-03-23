import { Item } from "./item.model";

export class Reservation extends Item{
	name: string;
	people: number;
	startTime: Date;
	endTime: Date;
}