import { Injectable } from '@angular/core';
import { SessionTokens } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly ACCESS_KEY = 'activa_fit_access_token';
  private readonly REFRESH_KEY = 'activa_fit_refresh_token';

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_KEY);
  }

  saveTokens(tokens: SessionTokens): void {
    sessionStorage.setItem(this.ACCESS_KEY, tokens.access_token);
    sessionStorage.setItem(this.REFRESH_KEY, tokens.refresh_token);
  }

  clearTokens(): void {
    sessionStorage.removeItem(this.ACCESS_KEY);
    sessionStorage.removeItem(this.REFRESH_KEY);
  }

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }
}
