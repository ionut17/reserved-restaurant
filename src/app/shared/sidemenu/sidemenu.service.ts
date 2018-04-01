import { Injectable, ComponentRef } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { SidemenuButton } from './model';

@Injectable()
export class SidemenuService {

  private overlayRef: OverlayRef;
  private sidemenuPortal: ComponentPortal<SidemenuComponent>;

  private onClose$: Subject<any> = new Subject<any>();

  constructor(private overlay: Overlay) {
    //Create overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      panelClass: 'right-aligned'
    });
    //Create sidemenu component
    this.sidemenuPortal = new ComponentPortal(SidemenuComponent);
  }

  showMenu(buttons: SidemenuButton[]): void {
    if (this.hasMenu()) this.overlayRef.detach();
    const attached: ComponentRef<SidemenuComponent> = this.overlayRef.attach(this.sidemenuPortal);
    attached.instance.sidemenuButtons = buttons;
  }

  hideMenu(): void {
    this.onClose$.next();
    this.overlayRef.detach();
  }

  hasMenu(): boolean {
    return this.overlayRef.hasAttached();
  }

  onClose(): Observable<any> {
    return this.onClose$.asObservable();
  }

}
