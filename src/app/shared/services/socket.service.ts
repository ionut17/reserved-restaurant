import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable()
export class SocketService {

	private url = 'http://localhost:3001';
	private socket;

	constructor() {
		console.log('Init socket:', this.url);
		this.socket = io.connect(this.url);
		this.socket.on('Test', (data) => {
			console.log(data);
		});
	}

}