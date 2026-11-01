import { Money, Timestamps } from './api.model';

export interface Measurement extends Timestamps {
  id: number;
  clienteId: number;
  entrenadorId: number | null;
  peso: Money;
  altura: Money;
  imc: Money;
  fecha: string;
}

export interface MeasurementPayload {
  clienteId: number;
  entrenadorId?: number | null;
  peso: number;
  altura: number;
  imc: number;
  fecha: string;
}
