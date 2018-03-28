import { Injectable, Component, ComponentRef } from "@angular/core";
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Openable } from "./interfaces";

@Injectable()
export class PopupService{

	private overlayRef: OverlayRef;

	constructor(private overlay:Overlay){
	}

	show(component: ComponentType<Openable>):void{
		this.overlayRef = this.overlay.create();
		const componentPortal = new ComponentPortal(component);
		const componentInstance: Openable = this.overlayRef.attach(componentPortal).instance;
		componentInstance.close.subscribe(()=>{
			this.hide();
		});
	}

	hide():void{
		this.overlayRef.dispose();
	}

}