import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rs-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  @Input() expanded: boolean = false;

  @Output() toggle: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doToggle(): void {
    this.expanded = !this.expanded;
    this.toggle.emit();
  }

}
