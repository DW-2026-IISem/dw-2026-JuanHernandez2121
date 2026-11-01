import { Money, Timestamps } from './api.model';

export type PaymentReferenceType = 'MEMBRESIA';
export type PaymentStatus = 'PENDIENTE' | 'PAGADO' | 'ANULADO';

export interface Payment extends Timestamps {
  id: number;
  referenciaTipo: PaymentReferenceType;
  referenciaId: number;
  metodo: string;
  monto: Money;
  fecha: string;
  estado: PaymentStatus;
}

export interface PaymentPayload {
  referenciaTipo?: PaymentReferenceType;
  referenciaId: number;
  metodo: string;
  monto: number;
  fecha?: string;
  estado?: PaymentStatus;
}
