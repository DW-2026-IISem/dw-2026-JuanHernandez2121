/**
 * Piezas reutilizables de OpenAPI para las tres modalidades de acceso.
 *
 * Centraliza el esquema bearerAuth y las respuestas 401/403.
 */

/**
 * Esquema de seguridad:
 * Authorization: Bearer <token>
 */
export const bearerSecurityScheme = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description:
      "Access token JWT obtenido en `POST /api/sesion/login`. Enviar como " +
      "`Authorization: Bearer <access_token>`. Vida útil corta (por defecto 15 min); " +
      "se renueva con `POST /api/sesion/refresh`.",
  },
};

/**
 * Endpoint OPEN: no requiere autenticación.
 */
export const openSecurity: unknown[] = [];

/**
 * Endpoint JWT o RBAC: requiere access token válido.
 */
export const bearerSecurity = [{ bearerAuth: [] }];

/**
 * Respuesta 401:
 * no existe una identidad válida.
 */
export const unauthorizedResponse = {
  description:
    "401 No autenticado — falta el Bearer token, el token es inválido/expiró o el usuario está inactivo",
};

/**
 * Respuesta 403:
 * el usuario está autenticado pero no tiene permiso.
 */
export const forbiddenResponse = {
  description:
    "403 Prohibido — autenticado, pero sin concesión activa para esta operación (deny by default)",
};

/**
 * Respuesta 400 cuando el :id no es un entero positivo.
 */
export const invalidIdResponse = {
  description: "400 id inválido (debe ser un entero positivo)",
};

/**
 * Respuesta 404 estándar.
 */
export const notFoundResponse = {
  description: "404 No encontrado",
};
