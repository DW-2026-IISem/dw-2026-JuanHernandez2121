import { RefreshToken, RefreshTokenI } from "../refresh-token.model";

/**
 * Respuesta HTTP de una sesión persistida (refresh token).
 *
 * token_hash se omite deliberadamente por seguridad.
 */
export type RefreshTokenResponseDto = Omit<
  RefreshTokenI,
  "token_hash"
> & {
  /**
   * Indica si el refresh token ya expiró.
   */
  is_expired: boolean;
};

/**
 * Mapper modelo -> DTO de respuesta.
 *
 * Convierte la instancia Sequelize en un objeto plano
 * y elimina token_hash.
 */
export function toRefreshTokenResponse(
  token: RefreshToken
): RefreshTokenResponseDto {
  const { token_hash, ...safe } = token.toJSON() as RefreshTokenI & {
    token_hash?: string;
  };

  return {
    ...safe,
    is_expired:
      new Date(token.expires_at).getTime() <= Date.now(),
  };
}
