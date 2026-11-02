import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { TokenStorageService } from '../services/token-storage.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TokenStorageService);
  const token = tokenStorage.getAccessToken();

  const isApiRequest = req.url.startsWith(environment.apiUrl);

  const isPublicAuthRequest =
    req.url.endsWith('/sesion/login') ||
    req.url.endsWith('/sesion/refresh');

  if (!token || !isApiRequest || isPublicAuthRequest) {
    return next(req);
  }

  const authenticatedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authenticatedRequest);
};
