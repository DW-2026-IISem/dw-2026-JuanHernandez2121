import { Status } from '../../../../../common/enums/status.enum';

export interface PlanProps {
  id?: number;
  nombre: string;
  descripcion?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Plan {
  id?: number;
  nombre: string;
  descripcion?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: PlanProps) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<PlanProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Plan {
    if (!props.nombre?.trim()) {
      throw new Error('El nombre del plan es requerido');
    }

    return new Plan(props);
  }

  static reconstitute(props: PlanProps): Plan {
    return new Plan(props);
  }

  update(
    props: Partial<
      Omit<PlanProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.nombre !== undefined) {
      if (!props.nombre.trim()) {
        throw new Error('El nombre del plan es requerido');
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
