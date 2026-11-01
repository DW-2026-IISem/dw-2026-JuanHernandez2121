import { Status, Timestamps } from './api.model';

export interface RoutineExercise extends Timestamps {
  id: number;
  rutinaId: number;
  ejercicioId: number;
  datosRelacion: string | null;
  status: Status;
}

export interface RoutineExercisePayload {
  rutinaId: number;
  ejercicioId: number;
  datosRelacion?: string | null;
  status?: Status;
}
