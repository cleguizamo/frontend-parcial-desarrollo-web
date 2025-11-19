import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Bienvenido al Sistema de Clínicas</h2>
    <p>Gestiona el registro y visualización de clínicas.</p>
    
    <div>
      <a routerLink="/clinicas">Ver Clínicas</a>
      <a routerLink="/clinicas/nueva">Registrar Nueva Clínica</a>
    </div>
    
    <div>
      <h3>Funcionalidades</h3>
      <ul>
        <li>Ver lista de clínicas registradas</li>
        <li>Registrar nuevas clínicas</li>
      </ul>
    </div>
  `,
  styles: []
})
export class HomeComponent {}

