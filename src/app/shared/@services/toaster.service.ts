import { Injectable, Component, ComponentRef } from "@angular/core";
import { OverlayRef, Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import { ToasterComponent } from "../core/toaster/toaster.component";
import { ToasterSettings, ToasterType } from "../@model";

const DEFAULT_TOASTER_SETTINGS: ToasterSettings = {
	message: "This is a toaster",
	type: ToasterType.Success,
	icon: 'calendar',
	duration: 4000
}

@Injectable()
export class ToasterService {

	private overlayRef: OverlayRef;
	private currentSub: Subscription;

	constructor(private overlay: Overlay) {
		this.overlayRef = this.overlay.create({
			hasBackdrop: false,
			panelClass: 'toaster-overlay'
		});
	}

	success(message: string){
		this.toast({
			message: message,
			icon: 'check-circle',
			type: ToasterType.Success
		})
	}

	error(message: string = "A intervenit o eroare!"){
		this.toast({
			message: message,
			icon: 'exclamation-triangle',
			type: ToasterType.Error
		})
	}

	toast(config?: ToasterSettings): any {
		if (this.overlayRef.hasAttached()){
			this.overlayRef.detach();
		}
		const componentPortal = new ComponentPortal(ToasterComponent);
		const componentInstance: ToasterComponent = this.overlayRef.attach(componentPortal).instance;
		componentInstance.toaster = this.buildToasterSettings(config);
		this.currentSub = componentInstance.onClose.subscribe(()=>{
			this.dismiss();
		});
		return componentInstance;
	}

	dismiss(): void {
		if (this.currentSub){
			this.currentSub.unsubscribe();
		}
		this.overlayRef.detach();
	}

	private buildToasterSettings(config: ToasterSettings){
		if (!config){
			return DEFAULT_TOASTER_SETTINGS;
		}
		return Object.assign({}, DEFAULT_TOASTER_SETTINGS, config);
	}

}