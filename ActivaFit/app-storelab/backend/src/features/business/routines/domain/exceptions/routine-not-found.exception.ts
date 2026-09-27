import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class RoutineNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Rutina', id);
  }
}
