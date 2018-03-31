import { Item } from "../item.model";
import { ReservationStatus } from "./reservation-status.enum";

export class Reservation extends Item{
	name: string;
	people: number;
	startTime: Date;
	endTime: Date;
	status: ReservationStatus;
	tables: Array<string>;
}