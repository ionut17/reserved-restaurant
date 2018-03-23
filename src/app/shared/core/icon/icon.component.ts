import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rs-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() name: string = '';

  @Input() size: '' | 'lg' | '2x' | '3x' | '4x' | '5x' | 'fw' = '';

  get classes(){
    const sizeClass: string = `la-${this.size}`;
    return `icon la la-${this.name} ${sizeClass}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
