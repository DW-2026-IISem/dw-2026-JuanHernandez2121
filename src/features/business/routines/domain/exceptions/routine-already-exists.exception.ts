import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class RoutineAlreadyExistsException extends DomainException {
  constructor(nombre: string) {
    super(`La rutina '${nombre}' ya está registrada`);
  }
}
