import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import {
  AuthSession,
  LoginPayload,
  SessionTokens,
} from '../models/auth.model';

import { User } from '../models/user.model';
import { SessionApi } from '../../features/auth/session/session-api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionApi = inject(SessionApi);
  private readonly tokenStorage = inject(TokenStorageService);

  login(payload: LoginPayload): Observable<SessionTokens> {
    return this.sessionApi.login(payload).pipe(
      tap(tokens => this.tokenStorage.saveTokens(tokens))
    );
  }

  profile(): Observable<User> {
    return this.sessionApi.profile();
  }

  permissions() {
    return this.sessionApi.permissions();
  }

  getAccessToken(): string | null {
    return this.tokenStorage.getAccessToken();
  }

  isAuthenticated(): boolean {
    return this.tokenStorage.hasAccessToken();
  }

  logout(): Observable<unknown> {
    const refreshToken = this.tokenStorage.getRefreshToken();

    if (!refreshToken) {
      this.tokenStorage.clearTokens();
      return new Observable(subscriber => {
        subscriber.next(null);
        subscriber.complete();
      });
    }

    return this.sessionApi.logout({
      refresh_token: refreshToken,
    }).pipe(
      tap(() => this.tokenStorage.clearTokens())
    );
  }

  clearSession(): void {
    this.tokenStorage.clearTokens();
  }
}
