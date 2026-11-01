import { Status, Timestamps } from './api.model';

export interface Membership extends Timestamps {
  id: number;
  nombre: string;
  descripcion: string | null;
  planId: number;
  clienteId: number;
  status: Status;
}

export interface MembershipPayload {
  nombre: string;
  descripcion?: string | null;
  planId: number;
  clienteId: number;
  status?: Status;
}
