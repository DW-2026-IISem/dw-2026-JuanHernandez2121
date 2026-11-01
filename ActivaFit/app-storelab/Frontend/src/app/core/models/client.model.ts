import { Status, Timestamps } from './api.model';

/** Cliente devuelto por el backend. No incluye password. */
export interface Client extends Timestamps {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: Status;
}

/** Datos para crear o actualizar un cliente. */
export interface ClientPayload {
  name: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  password?: string;
  status?: Status;
}
