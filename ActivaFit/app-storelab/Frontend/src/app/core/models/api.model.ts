/**
 * Estados utilizados por las entidades de ActivaFit.
 * Se contemplan las variantes que utiliza el backend.
 */
export type Status = 'active' | 'inactive' | 'ACTIVE' | 'INACTIVE';

/**
 * Los valores DECIMAL de MySQL pueden llegar como número o texto.
 */
export type Money = number | string;

/**
 * Estructura de los errores de la API.
 */
export interface ApiError {
  error: string;
  detail?: string;
}

/**
 * Campos de fecha generados por Sequelize.
 */
export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Convierte un importe a número de forma segura.
 */
export function toNumber(value: Money | null | undefined): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}
