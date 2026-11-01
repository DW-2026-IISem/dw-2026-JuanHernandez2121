import { Status, Timestamps } from './api.model';

/**
 * Usuario devuelto por el backend.
 * No incluye password.
 */
export interface User extends Timestamps {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  status: Status;
}

/**
 * Datos enviados para crear o actualizar un usuario.
 */
export interface UserPayload {
  username: string;
  email: string;
  password?: string;
  avatar?: string | null;
  status?: Status;
}
