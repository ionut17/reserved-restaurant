import { Injectable, Component, ComponentRef } from "@angular/core";
import { OverlayRef, Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';

import { Openable } from "./interfaces";

@Injectable()
export class PopupService{

	private overlayRef: OverlayRef;

	constructor(private overlay:Overlay){}

	show(component: ComponentType<Openable>):Openable{
		this.overlayRef = this.getOverlayRef();
		const componentPortal = new ComponentPortal(component);
		const componentInstance: Openable = this.overlayRef.attach(componentPortal).instance;
		merge(componentInstance.close, componentInstance.save).subscribe(()=>{
			this.hide();
		});
		return componentInstance;
	}

	hide():void{
		this.overlayRef.dispose();
	}

	private getOverlayRef():OverlayRef{
		return this.overlay.create({
			hasBackdrop: true
		});
	}

}