import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class PlanAlreadyExistsException extends DomainException {
  constructor(nombre: string) {
    super(`El plan '${nombre}' ya está registrado`);
  }
}
