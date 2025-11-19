import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Clinica, ClinicaCreateRequest } from '../models/clinica.model';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  private readonly endpoint = '/clinicas';

  constructor(private apiService: ApiService) {}

  /**
   * Obtiene todas las clínicas
   */
  getAll(): Observable<Clinica[]> {
    return this.apiService.get<Clinica[]>(this.endpoint);
  }

  /**
   * Obtiene una clínica por ID
   */
  getById(id: number): Observable<Clinica> {
    return this.apiService.get<Clinica>(`${this.endpoint}/${id}`);
  }

  /**
   * Registra una nueva clínica
   */
  create(clinica: ClinicaCreateRequest): Observable<Clinica> {
    return this.apiService.post<Clinica>(this.endpoint, clinica);
  }
}

