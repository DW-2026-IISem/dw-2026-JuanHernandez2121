import { Status } from '../../../../../common/enums/status.enum';

export interface MembershipProps {
  id?: number;
  nombre: string;
  descripcion?: string;
  planId: number;
  clienteId: number;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Membership {
  id?: number;
  nombre: string;
  descripcion?: string;
  planId: number;
  clienteId: number;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: MembershipProps) {
    this.id = props.id;
    this.nombre = props.nombre;
    this.descripcion = props.descripcion;
    this.planId = props.planId;
    this.clienteId = props.clienteId;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<MembershipProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Membership {
    if (!props.nombre?.trim()) {
      throw new Error('El nombre de la membresía es requerido');
    }

    if (!props.planId) {
      throw new Error('El plan de la membresía es requerido');
    }

    if (!props.clienteId) {
      throw new Error('El cliente de la membresía es requerido');
    }

    return new Membership(props);
  }

  static reconstitute(props: MembershipProps): Membership {
    return new Membership(props);
  }

  update(
    props: Partial<
      Omit<MembershipProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.nombre !== undefined) {
      if (!props.nombre.trim()) {
        throw new Error('El nombre de la membresía es requerido');
      }
      this.nombre = props.nombre;
    }

    if (props.descripcion !== undefined) {
      this.descripcion = props.descripcion;
    }

    if (props.planId !== undefined) {
      this.planId = props.planId;
    }

    if (props.clienteId !== undefined) {
      this.clienteId = props.clienteId;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
