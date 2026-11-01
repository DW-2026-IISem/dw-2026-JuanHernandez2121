import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Plan, PlanPayload } from '../../core/models/plan.model';
import { ActivatableCrudApi } from '../../core/services/crud-api';

@Injectable({ providedIn: 'root' })
export class PlanApi extends ActivatableCrudApi<Plan, PlanPayload> {
  protected readonly endpoint = `${environment.apiUrl}/planes`;

  constructor() {
    super('planes', 'plan');
  }

  override list(): Observable<Plan[]> {
    return this.http.get<Record<string, unknown>>(this.endpoint).pipe(
      map(response => {
        const collection = Object.values(response).find(
          value => Array.isArray(value)
        );
        return (collection ?? []) as Plan[];
      })
    );
  }
}
