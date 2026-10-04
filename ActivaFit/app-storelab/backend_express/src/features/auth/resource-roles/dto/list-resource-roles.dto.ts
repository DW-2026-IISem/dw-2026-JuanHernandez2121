/**
 * Filtros de `GET /api/concesiones-rol`.
 *
 * Permiten consultar los permisos de un rol
 * o los roles que conceden un recurso.
 */
export interface ListResourceRolesDto {
  role_id?: number;
  resource_id?: number;
}
