/**
 * Error controlado de aplicación.
 *
 * Permite que las capas de negocio indiquen un código HTTP concreto
 * sin depender directamente de Express.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
