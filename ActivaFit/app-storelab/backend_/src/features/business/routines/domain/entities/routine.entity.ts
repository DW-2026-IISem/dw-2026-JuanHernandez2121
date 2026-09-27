import { Status } from '../../../../../common/enums/status.enum';

export interface RoutineProps {
  id?: number;
  nombre: string;
  descripcion?: string;
  entrenadorId: number;
  clienteId: number;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Routine {
  id?: number;
  nombre: string;
  descripcion?: string;
  entrenadorId: number;
  clienteId: number;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: RoutineProps) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.entrenadorId = props.entrenadorId;
    this.clienteId = props.clienteId;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<RoutineProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Routine {
    if (!props.nombre?.trim()) {
      throw new Error('El nombre de la rutina es requerido');
    }

    if (!props.entrenadorId) {
      throw new Error('El entrenador es requerido');
    }

    if (!props.clienteId) {
      throw new Error('El cliente es requerido');
    }

    return new Routine(props);
  }

  static reconstitute(props: RoutineProps): Routine {
    return new Routine(props);
  }

  update(
    props: Partial<
      Omit<RoutineProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.nombre !== undefined) {
      if (!props.nombre.trim()) {
        throw new Error('El nombre de la rutina es requerido');
      }
      this.nombre = props.nombre;
    }

    if (props.descripcion !== undefined) {
      this.descripcion = props.descripcion;
    }

    if (props.entrenadorId !== undefined) {
      if (!props.entrenadorId) {
        throw new Error('El entrenador es requerido');
      }
      this.entrenadorId = props.entrenadorId;
    }

    if (props.clienteId !== undefined) {
      if (!props.clienteId) {
        throw new Error('El cliente es requerido');
      }
      this.clienteId = props.clienteId;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
