import { Status, Timestamps } from './api.model';

export interface Trainer extends Timestamps {
  id: number;
  nombre: string;
  descripcion: string | null;
  status: Status;
}

export interface TrainerPayload {
  nombre: string;
  descripcion?: string | null;
  status?: Status;
}
