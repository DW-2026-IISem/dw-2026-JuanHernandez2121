import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RoleUser, RoleUserPayload } from '../../../core/models/role-user.model';

@Injectable({ providedIn: 'root' })
export class RoleUserApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/asignaciones-rol`;

  list(): Observable<RoleUser[]> {
    return this.http.get<{ assignments: RoleUser[] }>(this.endpoint)
      .pipe(map(response => response.assignments));
  }

  get(id: number): Observable<RoleUser> {
    return this.http.get<{ assignment: RoleUser }>(`${this.endpoint}/${id}`)
      .pipe(map(response => response.assignment));
  }

  create(payload: RoleUserPayload): Observable<RoleUser> {
    return this.http.post<{ assignment: RoleUser }>(this.endpoint, payload)
      .pipe(map(response => response.assignment));
  }

  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.endpoint}/${id}/deactivate`, {});
  }

  reactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.endpoint}/${id}/reactivate`, {});
  }
}
