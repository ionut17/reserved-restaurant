import { SocketPayloadAction } from "./socket-payload-action.enum";
import { Item } from "../item.model";

export class SocketEntityWrapper {
	socketEntity: Item
	action: SocketPayloadAction
}