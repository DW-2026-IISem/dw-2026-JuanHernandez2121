import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { requireAuthUser } from "../../../shared/auth/auth-user";

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  // Temporalmente delegamos la validación real del JWT
  // al middleware de autenticación que se integrará en la fase Auth.
  if (!req.auth) {
    next(new AppError(401, "Authentication required"));
    return;
  }

  next();
}

export function authorize(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  // La autorización RBAC se conectará con los permisos
  // efectivos del usuario.
  next();
}

export { requireAuthUser };
