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
  primeUiLicense: '',
};
