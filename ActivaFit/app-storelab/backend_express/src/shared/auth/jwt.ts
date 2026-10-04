import jwt, { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error";

/**
 * Emisión y verificación del access token de ActivaFit.
 *
 * El access token utiliza JWT firmado mediante HS256.
 * No se almacena directamente en la base de datos.
 */

const ALGORITHM = "HS256";

/**
 * Emisor y audiencia del sistema ActivaFit.
 */
export const TOKEN_ISSUER = "activa-fit-express";
export const TOKEN_AUDIENCE = "activa-fit-api";

/**
 * Vida útil del access token.
 * Por defecto: 900 segundos = 15 minutos.
 */
export const ACCESS_TOKEN_TTL_SECONDS = Number(
  process.env.JWT_ACCESS_TTL ?? 900
);

export interface AccessTokenPayload extends JwtPayload {
  sub: string;
  username: string;
  jti: string;
}

/**
 * Obtiene y valida el secreto configurado en .env.
 */
function getSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new AppError(
      500,
      "JWT_SECRET no configurado (mínimo 32 caracteres). Ver .env"
    );
  }

  return secret;
}

/**
 * Firma un access token para un usuario.
 */
export function signAccessToken(user: {
  id: number;
  username: string;
}): {
  token: string;
  expiresIn: number;
} {
  const token = jwt.sign(
    {
      username: user.username,
    },
    getSecret(),
    {
      algorithm: ALGORITHM,
      subject: String(user.id),
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
      expiresIn: ACCESS_TOKEN_TTL_SECONDS,
      jwtid: randomUUID(),
    }
  );

  return {
    token,
    expiresIn: ACCESS_TOKEN_TTL_SECONDS,
  };
}

/**
 * Verifica la firma y los claims del access token.
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  let payload: JwtPayload;

  try {
    payload = jwt.verify(token, getSecret(), {
      algorithms: [ALGORITHM],
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
      clockTolerance: 5,
    }) as JwtPayload;
  } catch {
    throw new AppError(401, "Invalid or expired access token");
  }

  /**
   * Validación explícita de sub y jti.
   */
  if (
    typeof payload.sub !== "string" ||
    !/^[1-9]\d*$/.test(payload.sub) ||
    typeof payload.jti !== "string" ||
    payload.jti.length === 0
  ) {
    throw new AppError(401, "Invalid or expired access token");
  }

  return payload as AccessTokenPayload;
}

/**
 * Extrae el JWT desde:
 *
 * Authorization: Bearer <token>
 */
export function extractBearerToken(
  header: string | undefined
): string | null {
  if (!header) {
    return null;
  }

  const [scheme, value] = header.split(" ");

  if (
    !scheme ||
    !value ||
    scheme.toLowerCase() !== "bearer"
  ) {
    return null;
  }

  return value;
}
