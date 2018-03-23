import { Injectable } from "@angular/core";
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

	constructor(private socket: Socket) {
		this.socket
            .fromEvent("message")
            .subscribe((res)=>{
				console.log("Connected");
				console.log(res);
			});
	}

}