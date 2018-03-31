import { Injectable } from "@angular/core";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from "../../../environments/environment";

@Injectable()
export class SocketService {

	constructor() {}

	initializeWebSocket(serviceEndpoint: string, callback: (message: Stomp.Message) => void ):Promise<Stomp.Client>{
		return new Promise((resolve, reject)=>{
			const socketPath = `${environment.socket.endpoint}/${serviceEndpoint}`;
			const socket = new SockJS(socketPath);
			const socketClient: Stomp.Client = Stomp.over(socket);
			socketClient.connect({transports: ['websocket']}, (frame: Stomp.Frame) => {
				socketClient.subscribe(`/${environment.socket.inbound}/${serviceEndpoint}`, callback);
				resolve(socketClient);
			}, (error: string)=>{
				reject(error);
			});
		});
	}

}