import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Exercise, ExercisePayload } from '../../core/models/exercise.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class ExerciseApi extends ActivatableCrudApi<Exercise, ExercisePayload> {
  protected readonly endpoint = `${environment.apiUrl}/ejercicios`;

  constructor() {
    super('exercises', 'exercise');
  }
}
