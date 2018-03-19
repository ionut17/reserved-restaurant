import { Injectable, ComponentRef } from '@angular/core';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { SidemenuComponent } from './shared/core/sidemenu/sidemenu.component';

@Injectable()
export class AppService {

  private overlayRef: OverlayRef;
  private sidemenuPortal: ComponentPortal<SidemenuComponent>;

  constructor(private overlay: Overlay){
    //Create overlay
    this.overlayRef = this.overlay.create({
      hasBackdrop: false
    });
    //Create sidemenu component
    this.sidemenuPortal = new ComponentPortal(SidemenuComponent);
  }

  showMenu():void{
    if (!this.hasMenu()){
      const attached: ComponentRef<SidemenuComponent> = this.overlayRef.attach(this.sidemenuPortal);
    }
  }

  hideMenu():void{
    this.overlayRef.detach();
  }

  hasMenu():boolean{
    return this.overlayRef.hasAttached();
  }

}
