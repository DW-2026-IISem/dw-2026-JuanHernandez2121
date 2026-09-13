import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class PlanNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Plan', id);
  }
}
