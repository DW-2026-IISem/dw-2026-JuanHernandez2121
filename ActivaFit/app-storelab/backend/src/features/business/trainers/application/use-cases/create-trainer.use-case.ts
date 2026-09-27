import { Inject, Injectable } from '@nestjs/common';
import { TrainerAlreadyExistsException } from '../../domain/exceptions/trainer-already-exists.exception';
import { Trainer } from '../../domain/entities/trainer.entity';
import {
  TRAINER_REPOSITORY,
  type ITrainerRepository,
} from '../../domain/interfaces/trainer-repository.interface';
import { CreateTrainerDto } from '../dto/create-trainer.dto';
import { TrainerMapper } from '../mappers/trainer.mapper';

@Injectable()
export class CreateTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly trainerRepository: ITrainerRepository,
  ) {}

  async execute(dto: CreateTrainerDto) {
    const existing = await this.trainerRepository.findByNombre(dto.nombre);

    if (existing) {
      throw new TrainerAlreadyExistsException(dto.nombre);
    }

    const trainer = Trainer.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
    });

    const created = await this.trainerRepository.create(trainer);
    return TrainerMapper.toResponse(created);
  }
}
