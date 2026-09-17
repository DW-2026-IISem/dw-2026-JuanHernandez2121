import { Status } from '../../../../../common/enums/status.enum';

export interface PaymentProps {
  id?: number;
  monto: number;
  fechaPago: Date;
  metodoPago: string;
  membresiaId: number;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payment {
  id?: number;
  monto: number;
  fechaPago: Date;
  metodoPago: string;
  membresiaId: number;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: PaymentProps) {
    this.id = props.id;
    this.monto = props.monto;
    this.fechaPago = props.fechaPago;
    this.metodoPago = props.metodoPago;
    this.membresiaId = props.membresiaId;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<PaymentProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Payment {
    if (props.monto <= 0) {
      throw new Error('El monto del pago debe ser mayor a cero');
    }

    if (!props.metodoPago?.trim()) {
      throw new Error('El método de pago es requerido');
    }

    if (!props.membresiaId || props.membresiaId <= 0) {
      throw new Error('La membresía es requerida');
    }

    return new Payment(props);
  }

  static reconstitute(props: PaymentProps): Payment {
    return new Payment(props);
  }

  update(
    props: Partial<
      Omit<PaymentProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.monto !== undefined) {
      if (props.monto <= 0) {
        throw new Error('El monto del pago debe ser mayor a cero');
      }

      this.monto = props.monto;
    }

    if (props.fechaPago !== undefined) {
      this.fechaPago = props.fechaPago;
    }

    if (props.metodoPago !== undefined) {
      if (!props.metodoPago.trim()) {
        throw new Error('El método de pago es requerido');
      }

      this.metodoPago = props.metodoPago;
    }

    if (props.membresiaId !== undefined) {
      if (props.membresiaId <= 0) {
        throw new Error('La membresía es requerida');
      }

      this.membresiaId = props.membresiaId;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
