import { Response } from "express";
import { AppError } from "../errors/app-error";

/**
 * Traduce cualquier error a una respuesta HTTP.
 *
 * Único punto del proyecto donde se decide el mapeo error -> status.
 *
 * Lo usan:
 * - BaseController.handleError
 * - authenticate
 * - authorize
 */
export function sendError(res: Response, error: unknown): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  res.status(500).json({
    error: "Internal server error",
    detail: String(error),
  });
}
