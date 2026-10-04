import { ResourceRole, ResourceRoleI } from "../resource-role.model";

/**
 * Respuesta HTTP de una concesión rol-recurso.
 *
 * Incluye un resumen del rol y del recurso.
 */
export interface ResourceRoleResponseDto extends ResourceRoleI {
  role?: {
    id: number;
    name: string;
  } | null;

  resource?: {
    id: number;
    method: string;
    path: string;
    description: string | null;
  } | null;
}

/** Mapper modelo -> DTO de respuesta. */
export function toResourceRoleResponse(
  resourceRole: ResourceRole
): ResourceRoleResponseDto {
  return resourceRole.toJSON() as ResourceRoleResponseDto;
}

/**
 * Un permiso efectivo para un usuario concreto.
 */
export interface EffectivePermissionDto {
  resource_id: number;
  method: string;
  path: string;
  description: string | null;
  role_id: number;
  role_name: string;
}
