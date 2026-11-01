import { Status, Timestamps } from './api.model';

export interface Attendance extends Timestamps {
  id: number;
  membresiaId: number;
  fecha: string;
  observaciones: string | null;
  status: Status;
}

export interface AttendancePayload {
  membresiaId: number;
  fecha: string;
  observaciones?: string | null;
  status?: Status;
}
