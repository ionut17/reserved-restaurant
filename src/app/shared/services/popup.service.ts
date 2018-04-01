import { Injectable, Component, ComponentRef } from "@angular/core";
import { OverlayRef, Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PopupService {

	private overlayRef: OverlayRef;

	constructor(private overlay: Overlay) { }

	show(component: ComponentType<any>): any {
		this.overlayRef = this.getOverlayRef();
		const componentPortal = new ComponentPortal(component);
		const componentInstance: any = this.overlayRef.attach(componentPortal).instance;
		return componentInstance;
	}

	hide(): void {
		this.overlayRef.dispose();
	}

	private getOverlayRef(): OverlayRef {
		const ref: OverlayRef = this.overlay.create({ hasBackdrop: true });
		ref.backdropClick().subscribe(() => this.hide());
		return ref;
	}

}