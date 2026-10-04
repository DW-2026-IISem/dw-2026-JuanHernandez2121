import { Role, RoleI } from "../role.model";

/**
 * Respuesta HTTP de un rol.
 */
export type RoleResponseDto = RoleI;

/**
 * Mapper modelo -> DTO de respuesta.
 */
export function toRoleResponse(
  role: Role
): RoleResponseDto {
  return role.toJSON() as RoleI;
}
