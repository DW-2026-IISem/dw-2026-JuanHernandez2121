import { UpdateRoleDto } from "./update-role.dto";

/**
 * Datos de entrada de PATCH /api/roles/:id.
 */
export type PatchRoleDto = Partial<UpdateRoleDto>;
