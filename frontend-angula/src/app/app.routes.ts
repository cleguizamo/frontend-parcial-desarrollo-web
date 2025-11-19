import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ClinicaListComponent } from './features/clinicas/clinica-list/clinica-list.component';
import { ClinicaFormComponent } from './features/clinicas/clinica-form/clinica-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'clinicas',
    component: ClinicaListComponent
  },
  {
    path: 'clinicas/nueva',
    component: ClinicaFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
