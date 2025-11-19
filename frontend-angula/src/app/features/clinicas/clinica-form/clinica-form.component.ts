import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClinicaService } from '../../../core/services/clinica.service';
import { ClinicaCreateRequest } from '../../../core/models/clinica.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-clinica-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingComponent, ErrorMessageComponent],
  template: `
    <h2>Registrar Nueva Clínica</h2>
    <a routerLink="/clinicas">Volver a la Lista</a>

    <app-error-message [message]="errorMessage"></app-error-message>

    <form [formGroup]="clinicaForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nombre de la Clínica *</label>
        <input type="text" id="name" formControlName="name" />
        <span *ngIf="isFieldInvalid('name')">El nombre es requerido</span>
      </div>

      <div>
        <label for="address">Dirección *</label>
        <input type="text" id="address" formControlName="address" />
        <span *ngIf="isFieldInvalid('address')">La dirección es requerida</span>
      </div>

      <div>
        <label for="city">Ciudad *</label>
        <input type="text" id="city" formControlName="city" />
        <span *ngIf="isFieldInvalid('city')">La ciudad es requerida</span>
      </div>

      <div>
        <label for="phone_number">Teléfono</label>
        <input type="tel" id="phone_number" formControlName="phone_number" />
      </div>

      <div>
        <label for="bed_count">Número de Camas *</label>
        <input type="number" id="bed_count" formControlName="bed_count" min="1" />
        <span *ngIf="isFieldInvalid('bed_count')">El número de camas es requerido (mínimo 1)</span>
      </div>

      <button type="submit" [disabled]="clinicaForm.invalid || loading">
        <span *ngIf="!loading">Registrar Clínica</span>
        <span *ngIf="loading">Registrando...</span>
      </button>
      <a routerLink="/clinicas">Cancelar</a>
    </form>

    <app-loading *ngIf="loading"></app-loading>
  `,
  styles: []
})
export class ClinicaFormComponent implements OnInit {
  clinicaForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clinicaService: ClinicaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.clinicaForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone_number: [''],
      bed_count: ['', [Validators.required, Validators.min(1)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.clinicaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.clinicaForm.invalid) {
      this.clinicaForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const clinicaData: ClinicaCreateRequest = {
      name: this.clinicaForm.value.name,
      address: this.clinicaForm.value.address,
      city: this.clinicaForm.value.city,
      phone_number: this.clinicaForm.value.phone_number || undefined,
      bed_count: parseInt(this.clinicaForm.value.bed_count)
    };

    this.clinicaService.create(clinicaData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/clinicas']);
      },
      error: (error) => {
        console.error('Error al registrar clínica:', error);
        this.errorMessage = error.error?.message || 'Error al registrar la clínica. Por favor, intenta nuevamente.';
        this.loading = false;
      }
    });
  }
}

