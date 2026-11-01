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
  primeUiLicense: 'eyJpZCI6ImY1MDU1MmJlLTEyYTAtNDVjNC1hOGFjLTRlNDZkYzc1YzY4ZSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTM0MjEzNDYsImV4cCI6MTgyNDk1NzM0Nn0.u4v4zs0fwHKBMamMWguOTfO0lT-yyZ-viNTwqR0N5lW7K4bLP2uoqiXsky4no65KQvp4ug1x-5LFmoCYim3SCQ',
};
