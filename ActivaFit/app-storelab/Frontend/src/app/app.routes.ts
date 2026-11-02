import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar sesión · ActivaFit',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clientes',
      },
      {
        path: 'clientes',
        title: 'Clientes · ActivaFit',
        loadComponent: () =>
          import('./features/clients/client-list/client-list')
            .then((m) => m.ClientList),
      },
      {
        path: 'entrenadores',
        title: 'Entrenadores · ActivaFit',
        loadComponent: () =>
          import('./features/trainers/trainer-list/trainer-list')
            .then((m) => m.TrainerList),
      },
      {
        path: 'construir',
        title: 'Prototipo · ActivaFit',
        loadComponent: () =>
          import('./features/construir/construir')
            .then((m) => m.Construir),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'clientes',
  },
];
