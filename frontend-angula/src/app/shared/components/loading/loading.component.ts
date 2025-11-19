import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Cargando...</p>`,
  styles: []
})
export class LoadingComponent {}

