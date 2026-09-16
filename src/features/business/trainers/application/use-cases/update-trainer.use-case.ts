import { Inject, Injectable } from '@nestjs/common';
import { TrainerAlreadyExistsException } from '../../domain/exceptions/trainer-already-exists.exception';
import { TrainerNotFoundException } from '../../domain/exceptions/trainer-not-found.exception';
import {
  TRAINER_REPOSITORY,
  type ITrainerRepository,
} from '../../domain/interfaces/trainer-repository.interface';
import { UpdateTrainerDto } from '../dto/update-trainer.dto';
import { TrainerMapper } from '../mappers/trainer.mapper';

@Injectable()
export class UpdateTrainerUseCase {
  constructor(
    @Inject(TRAINER_REPOSITORY)
    private readonly trainerRepository: ITrainerRepository,
  ) {}

  async execute(id: number, dto: UpdateTrainerDto) {
    const trainer = await this.trainerRepository.findById(id);

    if (!trainer) {
      throw new TrainerNotFoundException(id);
    }

    if (dto.nombre && dto.nombre !== trainer.nombre) {
      const existing = await this.trainerRepository.findByNombre(dto.nombre);

      if (existing) {
        throw new TrainerAlreadyExistsException(dto.nombre);
      }
    }

    trainer.update({
      ...(dto.nombre !== undefined && { nombre: dto.nombre }),
      ...(dto.descripcion !== undefined && {
        descripcion: dto.descripcion,
      }),
    });

    const updated = await this.trainerRepository.update(trainer);

    return TrainerMapper.toResponse(updated);
  }
}
