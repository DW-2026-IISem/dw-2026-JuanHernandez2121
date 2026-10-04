/**
 * Datos de entrada de PUT /api/roles/:id.
 * status no se modifica mediante PUT.
 */
export interface UpdateRoleDto {
  name: string;
  description?: string | null;
}
