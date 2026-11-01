import { Status, Timestamps } from './api.model';

export interface Routine extends Timestamps {
  id: number;
  nombre: string;
  descripcion: string | null;
  entrenadorId: number | null;
  clienteId: number | null;
  status: Status;
}

export interface RoutinePayload {
  nombre: string;
  descripcion?: string | null;
  entrenadorId?: number | null;
  clienteId?: number | null;
  status?: Status;
}
