import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class AttendanceNotFoundException extends EntityNotFoundException {
  constructor(id: number) {
    super('Asistencia', id);
  }
}
