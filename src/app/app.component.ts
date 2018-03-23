import { Component, HostListener } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { SidemenuService } from './shared/sidemenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private sidemenuService: SidemenuService){}

  @HostListener('document:click', ['$event']) clickedOutside($event){
    this.sidemenuService.hideMenu();
  }

}
