import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClinicaService } from '../../../core/services/clinica.service';
import { Clinica } from '../../../core/models/clinica.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-clinica-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent],
  template: `
    <h2>Lista de Clínicas</h2>
    <a routerLink="/clinicas/nueva">Registrar Nueva Clínica</a>

    <app-error-message [message]="errorMessage"></app-error-message>
    <app-loading *ngIf="loading"></app-loading>

    <div *ngIf="!loading && !errorMessage">
      <div *ngIf="clinicas.length === 0">
        <p>No hay clínicas registradas.</p>
        <a routerLink="/clinicas/nueva">Registrar Primera Clínica</a>
      </div>

      <div *ngFor="let clinica of clinicas">
        <h3>{{ clinica.nombre }}</h3>
        <p><strong>Dirección:</strong> {{ clinica.direccion }}</p>
        <p *ngIf="clinica.telefono"><strong>Teléfono:</strong> {{ clinica.telefono }}</p>
        <p *ngIf="clinica.email"><strong>Email:</strong> {{ clinica.email }}</p>
        <hr>
      </div>
    </div>
  `,
  styles: []
})
export class ClinicaListComponent implements OnInit {
  clinicas: Clinica[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private clinicaService: ClinicaService) {}

  ngOnInit(): void {
    this.loadClinicas();
  }

  loadClinicas(): void {
    this.loading = true;
    this.errorMessage = null;

    this.clinicaService.getAll().subscribe({
      next: (data) => {
        this.clinicas = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar clínicas:', error);
        this.errorMessage = 'Error al cargar las clínicas. Por favor, intenta nuevamente.';
        this.loading = false;
      }
    });
  }
}

