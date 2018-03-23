import { Component, OnInit, Input } from '@angular/core';
import { SidemenuService } from './sidemenu.service';
import { SidemenuButton } from './model';

@Component({
  selector: 'rs-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() sidemenuButtons: SidemenuButton[] = [];

  constructor(private sidemenuService: SidemenuService) { }

  ngOnInit() {
  }

  onClose():void{
    this.sidemenuService.hideMenu();
  }

}
