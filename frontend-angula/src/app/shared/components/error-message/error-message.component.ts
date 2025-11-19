import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `<p *ngIf="message">{{ message }}</p>`,
  styles: []
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}

