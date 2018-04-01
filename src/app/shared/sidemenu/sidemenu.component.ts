import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SidemenuService } from './sidemenu.service';
import { SidemenuButton } from './model';

@Component({
  selector: 'rs-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  @Input() sidemenuButtons: SidemenuButton[] = [];

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  constructor(private sidemenuService: SidemenuService) { }

  ngOnInit() {
  }

  onClose(): void {
    this.sidemenuService.hideMenu();
  }

}
