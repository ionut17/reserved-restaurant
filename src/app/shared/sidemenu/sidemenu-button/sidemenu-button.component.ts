import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'rs-sidemenu-button',
  templateUrl: './sidemenu-button.component.html',
  styleUrls: ['./sidemenu-button.component.scss']
})
export class SidemenuButtonComponent implements OnInit {

  @Input() icon: string = '';

  @Input() label: string = 'Label';

  @Input() @HostBinding('class.important') important: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
