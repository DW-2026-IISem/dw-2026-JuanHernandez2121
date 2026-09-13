import { isValidEmail } from '../validators/client-email.validator';
import { isValidPhone } from '../validators/client-phone.validator';

export interface ClientProps {
  id?: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  telefono?: string;
  email?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Client {
  id?: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  telefono?: string;
  email?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: ClientProps) {
    this.id = props.id;
    this.tipoDocumento = props.tipoDocumento;
    this.numeroDocumento = props.numeroDocumento;
    this.nombre = props.nombre;
    this.telefono = props.telefono;
    this.email = props.email;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<ClientProps, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>,
  ): Client {
    if (!props.tipoDocumento?.trim()) {
      throw new Error('El tipo de documento es requerido');
    }

    if (!props.numeroDocumento?.trim()) {
      throw new Error('El número de documento es requerido');
    }

    if (!props.nombre?.trim()) {
      throw new Error('El nombre del cliente es requerido');
    }

    if (props.email && !isValidEmail(props.email)) {
      throw new Error('El email del cliente no es válido');
    }

    if (props.telefono && !isValidPhone(props.telefono)) {
      throw new Error('El teléfono del cliente no es válido');
    }

    return new Client(props);
  }

  static reconstitute(props: ClientProps): Client {
    return new Client(props);
  }

  update(
    props: Partial<
      Omit<ClientProps, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.tipoDocumento !== undefined) {
      if (!props.tipoDocumento.trim()) {
        throw new Error('El tipo de documento es requerido');
      }

      this.tipoDocumento = props.tipoDocumento;
    }

    if (props.numeroDocumento !== undefined) {
      if (!props.numeroDocumento.trim()) {
        throw new Error('El número de documento es requerido');
      }

      this.numeroDocumento = props.numeroDocumento;
    }

    if (props.nombre !== undefined) {
      if (!props.nombre.trim()) {
        throw new Error('El nombre del cliente es requerido');
      }

      this.nombre = props.nombre;
    }

    if (props.telefono !== undefined) {
      if (props.telefono && !isValidPhone(props.telefono)) {
        throw new Error('El teléfono del cliente no es válido');
      }

      this.telefono = props.telefono;
    }

    if (props.email !== undefined) {
      if (props.email && !isValidEmail(props.email)) {
        throw new Error('El email del cliente no es válido');
      }

      this.email = props.email;
    }
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
