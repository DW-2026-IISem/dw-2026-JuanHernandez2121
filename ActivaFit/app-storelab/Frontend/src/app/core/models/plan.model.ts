import { Timestamps } from './api.model';

export interface Plan extends Timestamps {
  id: number;
  nombre: string;
  descripcion: string | null;
  isActive: boolean;
}

export interface PlanPayload {
  nombre: string;
  descripcion?: string | null;
  isActive?: boolean;
}
