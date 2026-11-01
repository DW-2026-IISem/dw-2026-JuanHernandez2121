import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  LoginPayload,
  RefreshPayload,
  SessionTokens,
  AuthSession,
  EffectivePermission
} from '../../../core/models/auth.model';
import { User } from '../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class SessionApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.apiUrl}/sesion`;

  login(payload: LoginPayload): Observable<SessionTokens> {
    return this.http.post<SessionTokens>(`${this.endpoint}/login`, payload);
  }

  refresh(payload: RefreshPayload): Observable<SessionTokens> {
    return this.http.post<SessionTokens>(`${this.endpoint}/refresh`, payload);
  }

  logout(payload: RefreshPayload): Observable<unknown> {
    return this.http.post(`${this.endpoint}/logout`, payload);
  }

  profile(): Observable<User> {
    return this.http.get<{ user: User }>(`${this.endpoint}/perfil`)
      .pipe(map(response => response.user));
  }

  permissions(): Observable<EffectivePermission[]> {
    return this.http.get<{ permissions: EffectivePermission[] }>(
      `${environment.apiUrl}/permisos`
    ).pipe(map(response => response.permissions));
  }
}
