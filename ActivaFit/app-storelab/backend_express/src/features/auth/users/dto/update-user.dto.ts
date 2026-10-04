/**
 * Datos de entrada de `PUT /api/usuarios/:id` (reemplazo completo).
 *
 * Ni `password` ni `status` están aquí, a propósito:
 * - la contraseña tiene su propia operación
 *   (`PATCH /api/usuarios/:id/password`);
 * - el estado solo cambia con el borrado lógico (`/deactivate`).
 */
export interface UpdateUserDto {
  username: string;
  email: string;
  avatar?: string | null;
}
