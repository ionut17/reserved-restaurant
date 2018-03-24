import { Injectable } from "@angular/core";
import { Socket } from 'ng-socket-io';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class SocketService {

	// private serverUrl = 'http://localhost:8080/reservations'
	private serverUrl = 'http://rs-api:8080/reservations';
	private title = 'WebSockets chat';
	private stompClient;

	constructor() {
		let ws = new SockJS(this.serverUrl);
		this.stompClient = Stomp.over(ws);
		let self = this;
		console.log('trying to connect');
		this.stompClient.connect({
			transports: ['websocket']
		  }, function (frame) {
			console.log('connected');
			console.log(frame);
			// self.stompClient.subscribe("/reservations", (message) => {

			// });
		});
	}

}