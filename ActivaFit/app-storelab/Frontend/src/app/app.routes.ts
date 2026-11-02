import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
        loadComponent: () =>
          import('./features/clients/client-list/client-list')
            .then((m) => m.ClientList),
      },
      {
        path: 'construir',
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
