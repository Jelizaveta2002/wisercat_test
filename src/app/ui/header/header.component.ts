import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() weight: 'normal' | 'md' | 'semi-bl' | 'bl' = 'md';
  @Input() centered: boolean = false;

  get getFontSize(): string {
    switch (this.size) {
      case 'sm':
        return '24px';
      case 'lg':
        return '32px';
      default:
        return '28px';
    }
  }

  get getFontWeight(): string {
    switch (this.weight) {
      case 'normal':
        return '400';
      case 'semi-bl':
      case 'bl':
        return '600';
      default:
        return '500';
    }
  }
}
