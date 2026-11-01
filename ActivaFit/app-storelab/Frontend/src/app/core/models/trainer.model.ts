import { Timestamps } from './api.model';

export type TrainerStatus = 'ACTIVE' | 'INACTIVE';

export interface Trainer extends Timestamps {
  id: number;
  nombre: string;
  descripcion: string | null;
  status: TrainerStatus;
}

export interface TrainerPayload {
  nombre: string;
  descripcion?: string | null;
  status?: TrainerStatus;
}
