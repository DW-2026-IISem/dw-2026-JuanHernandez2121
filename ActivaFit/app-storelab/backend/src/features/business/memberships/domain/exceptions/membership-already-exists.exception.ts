import { DomainException } from '../../../../../common/exceptions/domain.exception';

export class MembershipAlreadyExistsException extends DomainException {
  constructor(nombre: string) {
    super(`La membresía '${nombre}' ya está registrada`);
  }
}
