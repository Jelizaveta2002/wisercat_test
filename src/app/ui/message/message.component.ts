import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() text: string = '';
  @Input() type: 'info' | 'error' | 'success' = 'info';
  private timeoutId: any;

  ngOnInit(): void {
    this.manageVisibility();
  }

  ngOnChanges(): void {
    if (this.text) {
      this.manageVisibility();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  private manageVisibility(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.text) {
      this.timeoutId = setTimeout(() => {
        this.text = '';
      }, 3000);
    }
  }
}
