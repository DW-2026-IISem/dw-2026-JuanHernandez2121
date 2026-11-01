/**
 * Entorno de producción (ng build).
 *
 * apiUrl termina en /api, sin barra final.
 *
 * requireAuth se utilizará en las siguientes fases
 * para controlar la autenticación de ActivaFit.
 *
 * primeUiLicense: clave Community de PrimeUI (PrimeNG 22).
 * Solicítala en https://primeui.dev
 * Requisitos: https://primeui.dev/licenses
 * Déjala vacía ('') si todavía no la tienes.
 * No subir claves comerciales al repositorio.
 */
export const environment = {
  production: true,
  appName: 'ActivaFit',
  apiUrl: 'http://localhost:4000/api',
  requireAuth: true,
  primeUiLicense: 'eyJpZCI6ImY1MDU1MmJlLTEyYTAtNDVjNC1hOGFjLTRlNDZkYzc1YzY4ZSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTM0MjEzNDYsImV4cCI6MTgyNDk1NzM0Nn0.u4v4zs0fwHKBMamMWguOTfO0lT-yyZ-viNTwqR0N5lW7K4bLP2uoqiXsky4no65KQvp4ug1x-5LFmoCYim3SCQ',
};
