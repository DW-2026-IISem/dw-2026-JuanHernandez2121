import { Inject, Injectable } from '@nestjs/common';
import { TrainerNotFoundException } from '../../domain/exceptions/trainer-not-found.exception';
import {
  TRAINER_REPOSITORY,
  type ITrainerRepository,
} from '../../domain/interfaces/trainer-repository.interface';
import { TrainerMapper } from '../mappers/trainer.mapper';

@Injectable()
export class GetTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly trainerRepository: ITrainerRepository,
  ) {}

  async execute(id: number) {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new TrainerNotFoundException(id);
    }

    return TrainerMapper.toResponse(trainer);
  }
}
