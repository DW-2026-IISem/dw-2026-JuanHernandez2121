import { User, UserI } from "../user.model";

/**
 * Respuesta HTTP de un usuario.
 *
 * La contraseña nunca sale de la API.
 */
export type UserResponseDto = Omit<UserI, "password">;

/**
 * Mapper modelo -> DTO de respuesta.
 *
 * Elimina password aunque el modelo haya sido cargado con el hash.
 */
export function toUserResponse(user: User): UserResponseDto {
  const { password, ...safe } = user.toJSON() as UserI & {
    password?: string;
  };

  return safe;
}
