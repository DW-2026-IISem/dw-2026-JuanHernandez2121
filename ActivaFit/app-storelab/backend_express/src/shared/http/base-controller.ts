import { Request, Response } from "express";
import { AppError } from "../errors/app-error";
import { sendError } from "./error-response";

/**
 * Base de los controllers HTTP.
 *
 * Centraliza las responsabilidades HTTP comunes de los controllers.
 */
export abstract class BaseController {
  /**
   * Ejecuta el cuerpo de un handler y centraliza el manejo de errores.
   */
  protected async run(
    res: Response,
    work: () => Promise<void>
  ): Promise<void> {
    try {
      await work();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  /**
   * Lee el :id de la URL y lo valida como entero positivo.
   */
  protected paramId(req: Request): number {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;

    if (!value || !/^\d+$/.test(value) || Number(value) < 1) {
      throw new AppError(
        400,
        "Invalid id: must be a positive integer"
      );
    }

    return Number(value);
  }

  /**
   * Mapea los errores a respuestas HTTP.
   */
  protected handleError(
    res: Response,
    error: unknown
  ): void {
    sendError(res, error);
  }
}
