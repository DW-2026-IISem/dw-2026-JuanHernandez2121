import { Inject, Injectable } from '@nestjs/common';
import { RoutineNotFoundException } from '../../domain/exceptions/routine-not-found.exception';
import {
  ROUTINE_REPOSITORY,
  type IRoutineRepository,
} from '../../domain/interfaces/routine-repository.interface';

@Injectable()
export class DeleteRoutineUseCase {
  constructor(
    @Inject(ROUTINE_REPOSITORY)
    private readonly routineRepository: IRoutineRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const routine = await this.routineRepository.findById(id);

    if (!routine) {
      throw new RoutineNotFoundException(id);
    }

    await this.routineRepository.delete(id);
  }
}
