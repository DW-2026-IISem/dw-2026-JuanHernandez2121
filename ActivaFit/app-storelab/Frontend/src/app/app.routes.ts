import { Routes } from '@angular/router';

/**
 * Rutas principales de ActivaFit.
 *
 * Construir se carga de forma diferida mediante loadComponent.
 */
export const routes: Routes = [
  {
    path: 'construir',
    loadComponent: () =>
      import('./features/construir/construir').then((m) => m.Construir),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'construir',
  },
  {
    path: '**',
    redirectTo: 'construir',
  },
];
