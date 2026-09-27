import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class MembershipNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Membresía', id);
  }
}
