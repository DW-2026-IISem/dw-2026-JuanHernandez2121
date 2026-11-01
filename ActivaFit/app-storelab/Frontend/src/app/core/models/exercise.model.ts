import { Status, Timestamps } from './api.model';

export type ExerciseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Exercise extends Timestamps {
  id: number;
  nombre: string;
  descripcion: string | null;
  tipo: string;
  nivel: ExerciseLevel;
  status: Status;
}

export interface ExercisePayload {
  nombre: string;
  descripcion?: string | null;
  tipo: string;
  nivel: ExerciseLevel;
  status?: Status;
}
