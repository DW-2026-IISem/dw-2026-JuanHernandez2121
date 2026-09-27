import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class TrainerNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Entrenador', id);
  }
}
