import { Inject, Injectable } from '@nestjs/common';
import { TrainerNotFoundException } from '../../domain/exceptions/trainer-not-found.exception';
import {
  TRAINER_REPOSITORY,
  type ITrainerRepository,
} from '../../domain/interfaces/trainer-repository.interface';

@Injectable()
export class DeleteTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly trainerRepository: ITrainerRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new TrainerNotFoundException(id);
    }

    await this.trainerRepository.delete(id);
  }
}
