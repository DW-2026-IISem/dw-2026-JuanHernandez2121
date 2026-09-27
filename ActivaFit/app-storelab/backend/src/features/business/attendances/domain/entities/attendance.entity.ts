import { Status } from '../../../../../common/enums/status.enum';

export interface AttendanceProps {
  id?: number;
  nombre: string;
  descripcion?: string;
  membresiaId: number;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Attendance {
  id?: number;
  nombre: string;
  descripcion?: string;
  membresiaId: number;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: AttendanceProps) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.membresiaId = props.membresiaId;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<AttendanceProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Attendance {
    if (!props.nombre?.trim()) {
      throw new Error('El nombre de la asistencia es requerido');
    }

    if (!props.membresiaId) {
      throw new Error('La membresía de la asistencia es requerida');
    }

    return new Attendance(props);
  }

  static reconstitute(props: AttendanceProps): Attendance {
    return new Attendance(props);
  }

  update(
    props: Partial<
      Omit<AttendanceProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.nombre !== undefined) {
      if (!props.nombre.trim()) {
        throw new Error('El nombre de la asistencia es requerido');
      }
      this.nombre = props.nombre;
    }

    if (props.descripcion !== undefined) {
      this.descripcion = props.descripcion;
    }

    if (props.membresiaId !== undefined) {
      this.membresiaId = props.membresiaId;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
