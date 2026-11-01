import { Status, Timestamps } from './api.model';

/**
 * Cliente devuelto por el backend.
 * Nunca incluye la contraseña.
 */
export interface Client extends Timestamps {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: Status;
}

/**
 * Datos enviados al backend para crear o actualizar un cliente.
 */
export interface ClientPayload {
  name: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  password?: string;
  status?: Status;
}
