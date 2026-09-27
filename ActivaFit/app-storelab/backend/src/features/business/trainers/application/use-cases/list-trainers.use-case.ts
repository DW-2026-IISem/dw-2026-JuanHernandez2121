import { Inject, Injectable } from '@nestjs/common';
import {
  TRAINER_REPOSITORY,
  type ITrainerRepository,
} from '../../domain/interfaces/trainer-repository.interface';
import { TrainerFilterDto } from '../dto/trainer-filter.dto';
import { TrainerMapper } from '../mappers/trainer.mapper';

@Injectable()
export class ListTrainersUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly trainerRepository: ITrainerRepository,
  ) {}

  async execute(filter: TrainerFilterDto) {
    const result = await this.trainerRepository.findAll(filter);

    return {
      items: result.items.map((trainer) => TrainerMapper.toResponse(trainer)),
      meta: result.meta,
    };
  }
}
