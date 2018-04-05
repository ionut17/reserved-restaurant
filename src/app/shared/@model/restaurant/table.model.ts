import { Item } from "../item.model";

export class Table extends Item {
	number: number;
	capacity: number;
	coordinates?: {
		x: number,
		y: number
	}
}