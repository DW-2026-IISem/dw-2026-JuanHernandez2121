import { Request } from "express";
import { AppError } from "../errors/app-error";

/**
 * Identidad resuelta que los middlewares de acceso dejan en la petición.
 *
 * Se guarda en `req.auth` y la consumen:
 * - los controllers que necesitan saber quién llama;
 * - `authorize`, para consultar los permisos efectivos del usuario.
 */
export interface AuthUser {
  id: number;
  username: string;
  email?: string;
  /** Token con el que se autenticó (útil para cerrar la sesión actual). */
  tokenId?: string;
}

/**
 * Devuelve la identidad de la petición o falla con 401.
 *
 * Los controllers que utilizan JWT pueden llamar esta función para obtener
 * de forma segura el usuario autenticado.
 */
export function requireAuthUser(req: Request): AuthUser {
  if (!req.auth) {
    throw new AppError(401, "Authentication required");
  }

  return req.auth;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      /** Identidad resuelta por el middleware `authenticate`. */
      auth?: AuthUser;
    }
  }
}

export {};
