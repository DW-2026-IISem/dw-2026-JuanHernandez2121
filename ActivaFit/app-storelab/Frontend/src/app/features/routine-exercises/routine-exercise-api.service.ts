import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoutineExercise, RoutineExercisePayload } from '../../core/models/routine-exercise.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class RoutineExerciseApi extends ActivatableCrudApi<RoutineExercise, RoutineExercisePayload> {
  protected readonly endpoint = `${environment.apiUrl}/rutina-ejercicios`;

  constructor() {
    super('routineExercises', 'routineExercise');
  }
}
