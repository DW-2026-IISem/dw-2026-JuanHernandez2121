import { Status } from '../../../../../common/enums/status.enum';

export interface TrainerProps {
  id?: number;
  nombre: string;
  descripcion?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Trainer {
  id?: number;
  nombre: string;
  descripcion?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: TrainerProps) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<TrainerProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Trainer {
    if (!props.nombre?.trim()) {
      throw new Error('El nombre del entrenador es requerido');
    }

    return new Trainer(props);
  }

  static reconstitute(props: TrainerProps): Trainer {
    return new Trainer(props);
  }

  update(
    props: Partial<
      Omit<TrainerProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.nombre !== undefined) {
      if (!props.nombre.trim()) {
        throw new Error('El nombre del entrenador es requerido');
      }
      this.nombre = props.nombre;
    }

    if (props.descripcion !== undefined) {
      this.descripcion = props.descripcion;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
