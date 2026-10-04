/**
 * Coincidencia entre la ruta de una petición y un recurso almacenado.
 *
 * Un recurso se guarda como patrón (method + path con parámetros):
 *
 * GET /api/productos/:id
 *
 * Y la petición llega con el valor concreto:
 *
 * GET /api/productos/42
 *
 * Reglas:
 * - El método HTTP debe coincidir.
 * - Un parámetro :param coincide con un solo segmento.
 * - Los demás segmentos deben ser iguales.
 * - La cantidad de segmentos debe coincidir.
 */

/**
 * Normaliza una ruta:
 * - elimina query string
 * - elimina fragmentos
 * - elimina barras repetidas
 * - elimina barra final
 */
export function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0].split("#")[0];
  const single = withoutQuery.replace(/\/{2,}/g, "/");
  const trimmed = single.replace(/\/+$/, "");

  return trimmed === "" ? "/" : trimmed;
}

/**
 * Comprueba si una ruta concreta coincide con un patrón.
 *
 * Ejemplo:
 * /api/productos/:id
 * coincide con:
 * /api/productos/42
 */
export function pathMatches(pattern: string, path: string): boolean {
  const patternParts = normalizePath(pattern).split("/");
  const pathParts = normalizePath(path).split("/");

  if (patternParts.length !== pathParts.length) {
    return false;
  }

  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];

    if (p.startsWith(":")) {
      continue;
    }

    if (p !== pathParts[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Comprueba si una operación está autorizada.
 *
 * Se compara:
 *
 * (method, path)
 *
 * contra los recursos concedidos al usuario.
 *
 * Si ningún recurso coincide, se deniega el acceso.
 */
export function isOperationGranted(
  granted: ReadonlyArray<{ method: string; path: string }>,
  method: string,
  path: string
): boolean {
  const upper = method.toUpperCase();

  return granted.some(
    (resource) =>
      resource.method.toUpperCase() === upper &&
      pathMatches(resource.path, path)
  );
}
