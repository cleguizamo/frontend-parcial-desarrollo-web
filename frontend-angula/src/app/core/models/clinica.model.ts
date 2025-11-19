export interface Clinica {
  id?: number;
  name: string;
  address: string;
  city: string;
  phone_number?: string;
  bed_count: number;
  registration_date?: string;
}

export interface ClinicaCreateRequest {
  name: string;
  address: string;
  city: string;
  phone_number?: string;
  bed_count: number;
}

