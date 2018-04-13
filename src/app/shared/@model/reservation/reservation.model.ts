import { Item } from "../item.model";
import { ReservationStatus } from "./reservation-status.enum";
import { Client } from "../client.model";

export class Reservation extends Item {
	name: string;
	people: number;
	client: Client;
	startTime: Date;
	endTime: Date;
	status: ReservationStatus;
	tables: Array<string>;
}