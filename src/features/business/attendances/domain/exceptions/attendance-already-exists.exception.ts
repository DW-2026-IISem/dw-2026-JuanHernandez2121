import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class AttendanceAlreadyExistsException extends DomainException {
  constructor(nombre: string) {
    super(`La asistencia '${nombre}' ya está registrada`);
  }
}
