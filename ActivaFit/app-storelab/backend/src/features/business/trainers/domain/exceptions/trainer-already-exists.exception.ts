import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class TrainerAlreadyExistsException extends DomainException {
  constructor(nombre: string) {
    super(`El entrenador '${nombre}' ya está registrado`);
  }
}
