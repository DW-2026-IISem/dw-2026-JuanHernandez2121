import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Routine, RoutinePayload } from '../../core/models/routine.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class RoutineApi extends ActivatableCrudApi<Routine, RoutinePayload> {
  protected readonly endpoint = `${environment.apiUrl}/rutinas`;

  constructor() {
    super('routines', 'routine');
  }
}
