/**
 * Entorno de desarrollo utilizado por ng serve y npm test.
 *
 * Angular utiliza este archivo mediante fileReplacements.
 * Mantener la misma primeUiLicense del entorno de producción.
 */
export const environment = {
  production: false,
  appName: 'ActivaFit',
  apiUrl: 'http://localhost:4000/api',
  requireAuth: true,
  primeUiLicense: '',
};
